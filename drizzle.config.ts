import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({path: ".env.local"});

console.log("ENV vars:", {
  url: process.env.DATABASE_URL,
  token: process.env.DATABASE_TOKEN,
});

export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_TOKEN,
  },
} satisfies Config;
