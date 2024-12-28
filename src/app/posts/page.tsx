import { PostsPageComponent } from "@/components/client/posts/PostsPage";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation"




export default async function PostsPage() {
  const {getUser} = await getKindeServerSession()
  const user = await getUser()

  if(!user) {
    return redirect("/")
  }
  return (
    <PostsPageComponent />
  )
}