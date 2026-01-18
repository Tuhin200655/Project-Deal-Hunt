import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fpqtwoehiqdrwrlddtyk.supabase.co";
const serviceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwcXR3b2VoaXFkcndybGRkdHlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODYzNjU2OCwiZXhwIjoyMDg0MjEyNTY4fQ.qxtx6RdOAp1Dvu3v4zzwlI8_yzxPFRboOwQ_Cdha6Zo";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function setupDatabase() {
  try {
    console.log("Checking existing tables...");

    // Check if products table exists
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public");

    if (tablesError) {
      console.log("Tables check failed, proceeding with creation...");
    } else {
      console.log("Existing tables:", tables?.map((t) => t.table_name));
    }

    // Create products table
    console.log("\nCreating products table...");
    const { error: productsError } = await supabase.from("products").insert([], {
      count: "exact",
    });

    if (
      productsError?.message?.includes("does not exist") ||
      productsError?.code === "PGRST116"
    ) {
      // Table doesn't exist, create it
      const createProductsSQL = `
        CREATE TABLE IF NOT EXISTS products (
          id BIGSERIAL PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          url TEXT NOT NULL,
          name TEXT NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          currency TEXT NOT NULL DEFAULT 'USD',
          image_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(user_id, url)
        );
      `;

      const { error: sqlError } = await supabase.rpc("exec_sql", {
        query: createProductsSQL,
      });

      if (sqlError && !sqlError.message?.includes("does not exist")) {
        console.error("SQL Error:", sqlError);
      }
    }

    // Create price_history table
    console.log("Creating price_history table...");
    const createHistorySQL = `
      CREATE TABLE IF NOT EXISTS price_history (
        id BIGSERIAL PRIMARY KEY,
        product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        price DECIMAL(10, 2) NOT NULL,
        currency TEXT NOT NULL DEFAULT 'USD',
        checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    const { error: historyError } = await supabase.rpc("exec_sql", {
      query: createHistorySQL,
    });

    if (historyError && !historyError.message?.includes("does not exist")) {
      console.error("History table error:", historyError);
    }

    console.log("\n✓ Database setup complete!");
    console.log("Please:");
    console.log("1. Go to your Supabase dashboard SQL editor");
    console.log("2. Run the SQL from supabase_schema.sql");
    console.log("3. Restart your dev server");
  } catch (error) {
    console.error("Error during setup:", error);
  }
}

setupDatabase();
