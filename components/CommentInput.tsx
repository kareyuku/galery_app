import { Button } from "./ui/button";

export default function CommentInput() {
    return <div className="flex flex-col gap-3 mb-3">
        <h1>Your comment:</h1>
        <textarea className="bg-gray-800 text-white rouned-md px-3 py-3"/>
        <Button variant={"outline"} className="w-fit border-black hover:bg-black hover:text-white">Send comment</Button>
    </div>
}