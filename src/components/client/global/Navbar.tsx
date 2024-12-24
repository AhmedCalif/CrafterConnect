import { Icons } from "@/components/client/global/Icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NavBar() {
  return (
    <div className="max-w-2xl mx-auto flex justify-between items-center">
      <Button variant="ghost" className="flex flex-col items-center">
        <Link href={"/dashboard"}>
          <Icons.home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
      </Button>
      <Button variant="ghost" className="flex flex-col items-center">
        <Link href={"/projects"}>
          <Icons.file className="h-6 w-6" />
          <span className="text-xs">Projects</span>
        </Link>
      </Button>
      <Button variant="ghost" className="flex flex-col items-center">
        <Link href={"/community"}>
          <Icons.globe className="h-6 w-6" />
          <span className="text-xs">Community</span>
        </Link>
      </Button>
      <Button variant="ghost" className="flex flex-col items-center">
        <Link href={"/profile"}>
          <Icons.user className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Link>
      </Button>
    </div>
  );
}
