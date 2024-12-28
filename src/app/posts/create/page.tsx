import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { CreatePost } from "@/components/client/posts/CreatePost";


export default async function CreatePostPage() {
  const {getUser} = await getKindeServerSession()
  const user = await getUser();

  if (!user) {
    throw new Error("User is not logged in")
  }

  return (
    <CreatePost />
  )
}
