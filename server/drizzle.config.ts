import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "ep-gentle-sky-a8i1j6hr-pooler.eastus2.azure.neon.tech",
    port: 5432,
    user: "neondb_owner",
    password: "npg_du0tZwMbVz7a",
    database: "neondb",
    ssl: "require",
  },
} satisfies Config;