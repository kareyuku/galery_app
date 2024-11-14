// "use client"

// import { useState, useEffect } from "react"
import { db } from "@/db";
import Post from "./Post";
import { postsTable, usersTable } from "@/db/schema";
import { Suspense } from "react";
import { desc, sql } from "drizzle-orm";
// import axios from "axios";

export default async function DisplayImages() {
    
    // const [images, setImages] = useState<IPhoto[]>([]);

    // const fetchImages = async () => {
    //     const request = await axios.get('https://picsum.photos/v2/list?page=2&limit=35')
    //     const data = await request.data;
    //     setImages(data);
    // }

    // useEffect(() => {
    //     fetchImages();
    // }, []);
 
    const images = await db.select().from(postsTable)
                            .innerJoin(usersTable, sql`${postsTable.userId} = ${usersTable.id}`)
                            .orderBy(desc(postsTable.id));

    return <div className="columns-2 lg:columns-4 md:columns-3 gap-4 space-y-4 mx-auto mb-5">
            <Suspense fallback={<div>Loading...</div>}>
                {images.map((image) =>
                    <div key={image.posts.id} className="break-inside-avoid">
                        <Post props={image} />
                    </div>
                )}
            </Suspense>

    </div>
}