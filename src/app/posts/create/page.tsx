import { CreatePost } from "@/components/client/posts/CreatePost";
import { syncKindeUserToDatabase } from "@/server-actions/user-server-action";


export default async function CreatePostPage() {
  const user = await syncKindeUserToDatabase()

  if (user === null) {
    throw new Error("User is not logged in")
  }

  return (
    <CreatePost user={user} />
  )
}
