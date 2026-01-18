import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function updatePrice() {
    try {
        // Get the most recently created product
        const { data: products, error: fetchError } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1);

        if (fetchError) throw fetchError;

        if (!products || products.length === 0) {
            console.log('No products found to update.');
            return;
        }

        const product = products[0];
        const currentPrice = parseFloat(product.price);
        const newPrice = Math.ceil(currentPrice * 1.5 + 100); // Increase by 50% + 100

        console.log(`Found product: ${product.name}`);
        console.log(`Current Price: ${currentPrice}`);
        console.log(`Updating to: ${newPrice}`);

        const { error: updateError } = await supabase
            .from('products')
            .update({ price: newPrice })
            .eq('id', product.id);

        if (updateError) throw updateError;

        console.log('Price updated successfully!');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

updatePrice();
