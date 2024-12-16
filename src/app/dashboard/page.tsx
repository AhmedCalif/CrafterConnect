import { getKindeUser } from "@/server-actions/user-server-action";




export default async function DashboardPage() {
    const user = await getKindeUser()

    if(!user) {
        throw new Error("User not authenticated")
    }

    return (
        <div>Hello {user.given_name}</div>
    ) 


}