import Link from "next/link";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";

import nextAuthConfig from "@/lib/nextAuth";

export default async function Navbar() {

  const session = await getServerSession(nextAuthConfig);

  return (
    <nav className="flex justify-between py-3 items-center">
      <Link href="/">
        <h1>Photo Gallery</h1>
      </Link>
      <div>
        {session
          ? <div className="flex gap-3 items-center">
            {session.user.username}
            <Link href="/api/auth/signout">
              <Button variant={"outline"} className={"border-primary hover:bg-black hover:text-white"} >Sign Out</Button>
            </Link>
          </div>
          : <Link href="/signup">
              <Button variant={"outline"} className={"border-primary hover:bg-black hover:text-white"} >Sign Up</Button>
            </Link>
        }
      </div>
    </nav>
  );
}