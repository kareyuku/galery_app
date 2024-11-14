"use client";

import { SlHeart } from "react-icons/sl";
import { Avatar, AvatarImage } from "./ui/avatar";
import { GoComment } from "react-icons/go";
import Link from "next/link";

// interface IPost {
//     id: string;
//     img: string;
//     author?: string;
//     download_url: string;
// }

interface IPost {
    posts: {
        description: string | null;
        title: string;
        id: number;
        albumId: number | null;
        userId: number;
        imageUrl: string;
    };
    users: {
        id: number;
        username: string;
        password: string;
        avatar: string | null;
        rank: string | null;
    };
}

export default function Post({ props }: { props: IPost } ) {

    console.log(props)

    const data = props.posts;
    const user = props.users;

    return <div>
        <Link href={`/post/${data.id}`} className="relative" prefetch={true}>
            <img src={`/uploads/${data.imageUrl}`} alt="cat" className="rounded-md hover:grayscale-[100%] cursor-pointer" />   
        </Link>
        <span className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" sizes="lg:16px" />
                </Avatar>
                {user.username}    
            </div>
            <div className="flex gap-3">
                <SlHeart />
                <GoComment />
            </div>
        </span>
    </div>
    
}