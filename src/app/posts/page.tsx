import { PostsPageComponent } from "@/components/client/posts/PostsPage";
import { getPosts } from "@/server-actions/post-server-action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function PostsPage() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  
  if (!user) {
    return redirect("/");
  }
  
  const postsResponse = await getPosts();
  return <PostsPageComponent posts={postsResponse.data ?? []} />;
}