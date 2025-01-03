import { syncKindeUserToDatabase } from "@/server-actions/user-server-action";
import { Dashboard } from "@/components/client/dashboard/DashBoardPage";





export default async function DashboardPage() {
    const user = await syncKindeUserToDatabase()

    if(!user) {
        throw new Error("User not authenticated")
    }

    return (
       <>
       <Dashboard user={user} />
       </>

    ) 


}