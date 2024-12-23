import { getKindeUser } from "@/server-actions/user-server-action";




export default async function DashboardPage() {
    const user = await getKindeUser()

    if(!user) {
        throw new Error("User not authenticated")
    }

    return (
        <>
        <div className="text-black">Hello {user.given_name}
        <h1>{user.email}</h1>
        </div>
        </>

    ) 


}