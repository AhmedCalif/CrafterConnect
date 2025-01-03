import { CreatePost } from "@/components/client/posts/CreatePost";
import { getSyncedUser } from "@/server-actions/user-server-action";


export default async function CreatePostPage() {
  const user = await getSyncedUser()

  if (user === null) {
    throw new Error("User is not logged in")
  }

  return (
    <CreatePost user={user} />
  )
}
