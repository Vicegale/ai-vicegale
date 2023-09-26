import type { Config } from "drizzle-kit";

export default {
    out: "./drizzle",
    schema: "./drizzle/schema.ts",
    driver: 'turso',
    dbCredentials: {
        url: process.env.TURSO_URL!,
        authToken: process.env.TURSO_SECRET!,
    }
} satisfies Config; 
