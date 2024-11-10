import { Avatar, AvatarImage } from "./ui/avatar";

interface IComment {
    id: string;
    author: string;
    content: string;
}

export default function Comment({ id, author, content }: IComment) {
    return <div className="rounded-md pl-3 py-1">
        <div className="flex items-center gap-3 mb-3 mt-6 md:mt-0">
            <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" sizes="lg:16px" />
            </Avatar>
            {author}    
        </div>
        {content}
    </div>
}