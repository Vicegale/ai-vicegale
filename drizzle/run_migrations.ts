import { drizzle } from "drizzle-orm/bun-sqlite"
import { migrate } from "drizzle-orm/bun-sqlite/migrator"
import { createClient } from "@libsql/client"

const client = createClient({
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_SECRET!,
});

const db = drizzle(client);

migrate(db, { migrationsFolder: "./src/drizzle" });
