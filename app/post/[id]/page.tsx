import Comment from "@/components/Comment";
import CommentInput from "@/components/CommentInput";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GoComment } from "react-icons/go";

type params = {
    params: {
        id: string;
    }
}

export default async function PostPage({ params }: params) {

    const { id } = await params;

    return <div>
        <Navbar />

        <div className="flex gap-3 flex-col md:flex-row">
            <div className="mx-auto md:mx-0">
                <img src={`https://picsum.photos/id/${id}/2758/3622`} alt="cat" className="rounded-md h-[500px]" />
            </div>
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" sizes="lg:16px" />
                    </Avatar>
                    bartus    
                </div>
                <h1 className="text-4xl">Photo Title</h1>
                <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quae.</p>

            </div>
            
        </div>

        <section>
            <h1 className="flex gap-2 items-center text-2xl mt-6"><GoComment /> Comments</h1>
            <article>
                <CommentInput />
                <Comment id={""} author="bartus" content={"lorem ipsum"} />
                <Comment id={""} author="michał" content={"lorem ipsum"} />
                <Comment id={""} author="kacper" content={"lorem ipsum"} />
            </article>
        </section>

    </div>
}