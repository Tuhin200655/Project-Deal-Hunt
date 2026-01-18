import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { scrapeProduct } from "@/lib/firecrawl";
import { sendPriceDropAlert } from "@/lib/email";

export async function POST(request) {
    try {
        const authHeader = request.headers.get("authorization");
        const cronSecret = process.env.CRON_SECRET;

        if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Use service role to bypass RLS
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_SERVICE_ROLE_KEY
        );

        const { data: products, error: productsError } = await supabase
            .from("products")
            .select("*");

        if (productsError) throw productsError;

        console.log(`Found ${products.length} products to check`);

        const results = {
            total: products.length,
            updated: 0,
            failed: 0,
            priceChanges: 0,
            alertsSent: 0,
            errors: []
        };

        for (const product of products) {
            try {
                const productData = await scrapeProduct(product.url);

                if (!productData || !productData.currentPrice) {
                    console.error(
                        `Failed to scrape price for ${product.id}:`,
                        productData
                    );
                    results.failed++;
                    results.errors.push(`Scrape failed for ${product.id}`);
                    continue;
                }

                const newPrice = parseFloat(productData.currentPrice);
                const oldPrice = parseFloat(product.price);

                await supabase
                    .from("products")
                    .update({
                        price: newPrice,
                        currency: productData.currencyCode || product.currency,
                        name: productData.productName || product.name,
                        image_url: productData.productImageUrl || product.image_url,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", product.id);

                if (oldPrice !== newPrice) {
                    await supabase.from("price_history").insert({
                        product_id: product.id,
                        price: newPrice,
                        currency: productData.currencyCode || product.currency,
                    });

                    results.priceChanges++;

                    if (newPrice < oldPrice) {
                        const {
                            data: { user },
                            error: userError
                        } = await supabase.auth.admin.getUserById(product.user_id);

                        if (userError || !user) {
                            results.errors.push(`User fetch failed for ${product.user_id}: ${userError?.message}`);
                        } else if (user?.email) {
                            const emailResult = await sendPriceDropAlert(
                                user.email,
                                product,
                                oldPrice,
                                newPrice
                            );

                            if (emailResult.success) {
                                results.alertsSent++;
                            } else {
                                results.errors.push(`Email failed for ${user.email}: ${JSON.stringify(emailResult.error)}`);
                            }
                        } else {
                            results.errors.push(`User ${product.user_id} has no email`);
                        }
                    }
                }

                results.updated++;
            } catch (error) {
                console.error(`Error processing product ${product.id}:`, error);
                results.failed++;
                results.errors.push(`Process error ${product.id}: ${error.message}`);
            }
        }

        return NextResponse.json({
            success: true,
            message: "Price check completed",
            results,
        });
    } catch (error) {
        console.error("Cron job error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({
        message: "Price check endpoint is working. Use POST to trigger.",
    });
}
