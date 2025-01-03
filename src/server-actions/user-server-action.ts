"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { sql } from "drizzle-orm";
import { users } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import type { User } from "@/types/UserTypes";

export async function getKindeUser() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("UNAUTHORIZED: No authenticated user found");
  }
  return user;
}

export async function syncKindeUserToDatabase(): Promise<User> {
  const kindeUser = await getKindeUser();
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.auth_id, kindeUser.id))
    .get();

  if (!existingUser) {
    const newUserId = crypto.randomUUID();
    await db.insert(users).values({
      id: newUserId,
      email: kindeUser.email ?? "",
      given_name: kindeUser.given_name ?? "",
      family_name: kindeUser.family_name ?? "",
      picture: kindeUser.picture ?? "",
      auth_id: kindeUser.id,
      permissions: "",
      roles: "",
      organization_id: "",
      last_sign_in: sql`CURRENT_TIMESTAMP`,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return {
      id: newUserId,
      email: kindeUser.email,
      given_name: kindeUser.given_name,
      family_name: kindeUser.family_name
    };
  }

  await db
    .update(users)
    .set({
      email: kindeUser.email ?? "",
      given_name: kindeUser.given_name ?? "",
      family_name: kindeUser.family_name ?? "",
      picture: kindeUser.picture ?? "",
      last_sign_in: sql`CURRENT_TIMESTAMP`,
      updated_at: new Date(),
    })
    .where(eq(users.auth_id, kindeUser.id));

  return {
    id: existingUser.id,
    email: kindeUser.email,
    given_name: kindeUser.given_name,
    family_name: kindeUser.family_name
  };
}


