import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import * as z from "zod";

const userSchema = z
.object({
    username: z.string().min(2).max(20),
    password: z.string().min(6),
})


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, password } = userSchema.parse(body);
        const existingUser = await db.select().from(usersTable).where( sql`${usersTable.username} = ${username}` )
        if(existingUser.length > 0) {
            return NextResponse.json({user: null, message: "Username is already taken."}, {status: 409})
        }


        const hashPassword = password     
        const newUser = await db.insert(usersTable).values({ username, password: hashPassword }).$returningId();

        const findUser = await db.select().from(usersTable).where( sql`${usersTable.id} = ${newUser[0].id}` )

        const { password: string, ...rest } = findUser[0];

        return NextResponse.json({ user: rest, message: "Account Created." }, {status:201});

    } catch(error) {
        console.log(error);
        return NextResponse.json({message: "Error!" }, {status:500});
    }
}