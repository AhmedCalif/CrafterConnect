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


export const media = sqliteTable("media", {
  id: text("id").primaryKey().notNull(),
  type: text("type").notNull(),
  url: text("url").notNull(),
  userId: text("user_id").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});


export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author_id: text("author_id").references(() => users.id),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  likes_count: integer("likes_count").notNull().default(0),
});

export const likes = sqliteTable("likes", {
  id: text("id").primaryKey(),
  post_id: text("post_id").references(() => posts.id),
  user_id: text("user_id").references(() => users.id),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});