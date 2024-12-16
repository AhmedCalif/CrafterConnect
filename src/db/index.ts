import {createClient} from "@libsql/client";
import {drizzle} from "drizzle-orm/libsql";
import {config} from "dotenv";

config({path: ".env.local"});

if (!process.env.DATABASE_URL || !process.env.DATABASE_TOKEN) {
  throw new Error("Database configuration missing");
}

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_TOKEN,
});

export const db = drizzle(client);