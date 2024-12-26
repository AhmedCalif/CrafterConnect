"use server";

import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq, and } from "drizzle-orm";
import type { CreatePostsInput, UpdatePostsInput } from "@/types/PostsTypes";

type ServerActionResponse<T> = {
  data?: T;
  error?: string;
};

export async function getPosts(): Promise<ServerActionResponse<typeof posts.$inferSelect[]>> {
  try {
    const getPostsFromDB = await db
      .select({
        id: posts.id,
        content: posts.content,
        author_id: posts.author_id,
        created_at: posts.created_at,
        likes_count: posts.likes_count,
        user: {
          id: users.id,
          email: users.email,
          given_name: users.given_name,
          family_name: users.family_name
        }
      })
      .from(posts)
      .leftJoin(users, eq(posts.author_id, users.id));

    if (!getPostsFromDB.length) {
      return { error: "No posts found in the database" };
    }

    const formattedPosts = getPostsFromDB.map(post => ({
      id: post.id,
      content: post.content,
      author_id: post.author_id,
      created_at: post.created_at,
      likes_count: post.likes_count
    }));

    return { data: formattedPosts };
  } catch (error) {
    console.error("Error getting posts:", error);
    return { error: "Failed to fetch posts" };
  }
}

export async function getPostsById(id: string): Promise<ServerActionResponse<typeof posts.$inferSelect>> {
  try {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const getPostsByIdFromDB = await db
      .select()
      .from(posts)
      .where(
        and(
          eq(posts.id, id),
          eq(posts.author_id, user.id)
        )
      )
      .limit(1);

    if (!getPostsByIdFromDB.length) {
      return { error: `No post found with id: ${id}` };
    }

    return { data: getPostsByIdFromDB[0] };
  } catch (error) {
    console.error(`Error getting post with id ${id}:`, error);
    return { error: "Failed to fetch post" };
  }
}

export async function createPosts({ input }: { input: CreatePostsInput }): Promise<ServerActionResponse<typeof posts.$inferSelect>> {
  try {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const [createdPost] = await db
      .insert(posts)
      .values({
        id: input.id,
        author_id: user.id,
        content: input.content,
        created_at: new Date(),
      })
      .returning();

    return { data: createdPost };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Failed to create post" };
  }
}

export async function updatePosts({ 
  id, 
  input 
}: { 
  id: string; 
  input: UpdatePostsInput 
}): Promise<ServerActionResponse<typeof posts.$inferSelect>> {
  try {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { error: "Unauthorized" };
    }
    const existingPost = await db
      .select()
      .from(posts)
      .where(
        and(
          eq(posts.id, id),
          eq(posts.author_id, user.id)
        )
      )
      .limit(1);

    if (!existingPost.length) {
      return { error: "Post not found or unauthorized to update" };
    }

    const [updatedPost] = await db
      .update(posts)
      .set({
        content: input.content,
      })
      .where(
        and(
          eq(posts.id, id),
          eq(posts.author_id, user.id)
        )
      )
      .returning();

    return { data: updatedPost };
  } catch (error) {
    console.error("Error updating post:", error);
    return { error: "Failed to update post" };
  }
}

export async function deletePosts(id: string): Promise<ServerActionResponse<{ id: string }>> {
  try {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const [deletedPost] = await db
      .delete(posts)
      .where(
        and(
          eq(posts.id, id),
          eq(posts.author_id, user.id)
        )
      )
      .returning({ id: posts.id });

    if (!deletedPost) {
      return { error: "Post not found or unauthorized to delete" };
    }

    return { data: deletedPost };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { error: "Failed to delete post" };
  }
}