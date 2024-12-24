import { getKindeUser } from "@/server-actions/user-server-action";
import { Dashboard } from "@/components/client/dashboard/DashBoardPage";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";





export default async function DashboardPage() {
    const user = await getKindeUser() as KindeUser

    if(!user) {
        throw new Error("User not authenticated")
    }

    return (
       <>
       <Dashboard user={user} />
       </>

    ) 


}