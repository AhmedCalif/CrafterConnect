"use server";

import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq, and } from "drizzle-orm";
import type { Post, CreatePostInput, UpdatePostInput} from "@/types/PostsTypes";
import { syncKindeUserToDatabase } from "@/server-actions/user-server-action";

type ServerActionResponse<T> = {
  data?: T;
  error?: string;
};

export async function getPosts(): Promise<ServerActionResponse<Post[]>> {
  try {
    const getPostsFromDB = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        author_id: posts.author_id,
        likes_count: posts.likes_count,
        created_at: posts.created_at,
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
      throw new Error("No posts in the database")
    }

    const formattedPosts: Post[] = getPostsFromDB.map((post): Post => {
      const authorName = post.user 
        ? `${post.user.given_name} ${post.user.family_name}`.trim()
        : 'Unknown User';
        
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        authorId: post.author_id ?? '',
        likesCount: post.likes_count ?? 0,
        timestamp: post.created_at,
        author: {
          name: authorName,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${authorName}`
        }
      };
    });

    return {data: formattedPosts};
  } catch (error) {
    console.error("Error getting posts:", error);
    return {error: "error getting posts"}
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

export async function createPosts({ input }: { input: CreatePostInput }): Promise<ServerActionResponse<typeof posts.$inferSelect>> {
  try {
    const user = await syncKindeUserToDatabase();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const [createdPost] = await db
      .insert(posts)
      .values({
        id: input.id,
        title: input.title,
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
  input: UpdatePostInput 
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