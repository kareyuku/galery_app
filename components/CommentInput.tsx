"use client";

import { useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import axios from "axios";

export default function CommentInput({ postId }: { postId: string }) {

    const contentRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();

        const content = contentRef.current?.value;
        if(!content) return;
        console.log(content);

        const request = await axios.post('/api/comment', {
            postId,
            content
        })

        window.location.reload();

    }

    return <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-3">
        <h1>Your comment:</h1>
        <Textarea ref={contentRef} />
        <Button type='submit' variant={"outline"} className="w-fit border-black hover:bg-black hover:text-white">Send comment</Button>
    </form>
}