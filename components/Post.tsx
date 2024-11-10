import { Avatar, AvatarImage } from "./ui/avatar";

interface IPost {
    img: string;
    author?: string;
}

export default function Post({ img }: IPost ) {
    return <div>
        <img loading="lazy" src={img} alt="cat" className="rounded-md hover:grayscale-[100%]" />    
        <span className="flex gap-3 items-center mt-2">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            bartus    
        </span>
    </div>
    
}