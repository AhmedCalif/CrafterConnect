import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  given_name: text("given_name"),
  family_name: text("family_name"),
  picture: text("picture_url"),
  auth_id: text("auth_id").notNull().unique(),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updated_at: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  last_sign_in: integer("last_sign_in", { mode: "timestamp" }),
  organization_id: text("organization_id"),
  permissions: text("permissions"),
  roles: text("roles"),
});
