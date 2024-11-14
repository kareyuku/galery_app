"use server";

import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import nextAuthConfig from "@/lib/nextAuth";
import { db } from "@/db";
import { postsTable } from "@/db/schema";

import {v4 as uuidv4} from 'uuid';
import { redirect } from "next/navigation";

export async function uploadFile(formData: FormData) {

    const session = await getServerSession(nextAuthConfig);

    if(!session || !session.user) return;

    const file = formData.get("file") as File;
    const description = formData.get("description") as string;
    const title = formData.get("title") as string;

    let myuuid = uuidv4();

    const newPost = await db.insert(postsTable).values({ 
        imageUrl: `${myuuid + file.name}`,
        userId: session.user.id,
        description,
        title
     }).$returningId()

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    await fs.writeFile(`./public/uploads/${myuuid + file.name}`, buffer);

    revalidatePath("/");
    redirect(`/post/${newPost[0].id}`);
}