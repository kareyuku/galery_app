import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="flex justify-between py-3 items-center">
      <Link href="/">
        <h1>Photo Gallery</h1>
      </Link>
      <Button variant={"outline"} className={"border-primary hover:bg-black hover:text-white"} >Sign Up</Button>
    </nav>
  );
}