import { SlHeart } from "react-icons/sl";
import { Avatar, AvatarImage } from "./ui/avatar";
import { GoComment } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

interface IPost {
    id: string;
    img: string;
    author?: string;
    download_url: string;
}

export default function Post({ data }: { data: IPost } ) {
    return <div>
        <Link href={`/post/${data.id}`} className="relative" prefetch={true}>
            <img loading="lazy" src={data.download_url} alt="cat" className="rounded-md hover:grayscale-[100%] cursor-pointer" />   
        </Link>
        <span className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" sizes="lg:16px" />
                </Avatar>
                bartus    
            </div>
            <div className="flex gap-3">
                <SlHeart />
                <GoComment />
            </div>
        </span>
    </div>
    
}