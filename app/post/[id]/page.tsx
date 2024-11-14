import Comment from "@/components/Comment";
import CommentInput from "@/components/CommentInput";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db";
import { comments, postsTable, usersTable } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { Suspense } from "react";
import { GoComment } from "react-icons/go";

type params = {
    params: {
        id: string;
    }
}

export default async function PostPage({ params }: params) {

    const { id } = await params;

    const post = await db.select()
                            .from(postsTable)
                            .where( sql`${postsTable.id} = ${id}` )
                            .innerJoin(usersTable, sql`${postsTable.userId} = ${usersTable.id}`);

    if(post.length < 1) {
        return <div>
            <h1>Post not found</h1>
        </div>
    }

    const coms = await db.select()
                        .from(comments)
                        .where( sql`${comments.postId} = ${id}` )
                        .innerJoin(usersTable, sql`${comments.userId} = ${usersTable.id}`)
                        .orderBy(desc(comments.id));
            
    const { albumId, userId, imageUrl, description, title } = post[0].posts;
    const { username } = post[0].users;

    return <div>
        <div className="flex gap-3 flex-col md:flex-row">
            <div className="mx-auto md:mx-0 max-w-full w-[375px]">
                <Suspense fallback={<Skeleton className="w-full max-w-[100vw] h-[500px]" />}> 
                    <img src={`/uploads/${imageUrl}`} alt="cat" className="rounded-md h-[500px]" />
                </Suspense>
            </div>
            <div className="max-w-[600px]">
                <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" sizes="lg:16px" />
                    </Avatar>
                    {username}    
                </div>
                <h1 className="text-4xl">{title}</h1>
                <p className="text-lg">{description}</p>

            </div>
            
        </div>

        <section>
            <h1 className="flex gap-2 items-center text-2xl mt-6"><GoComment /> Comments</h1>
            <article>
                <CommentInput postId={id} />
                {coms.map((com) => {
                    return <Comment key={com.comments.id} id={com.comments.id.toString()} author={com.users.username} content={com.comments.content} />
                })}
            </article>
        </section>

    </div>
}