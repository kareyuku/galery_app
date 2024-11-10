import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="flex justify-between py-3">
      <h1>Photo Gallery</h1>
      <Button variant={"outline"} className={"bg-"} >Sign Up</Button>
    </nav>
  );
}