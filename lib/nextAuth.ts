import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { sql } from "drizzle-orm";

const nextAuthConfig: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req): Promise<any> {

                const users = await db.select()
                                      .from(usersTable)
                                      .where(sql`${usersTable.username} = ${credentials?.username}`)

                if (users.length > 0) {

                    if(credentials?.password !== users[0].password) return null;

                    const { password, ...userWithoutPassword } = users[0]

                    return userWithoutPassword;
                    
                } else {
                    return null
                }
            }
        })
      ],

    session: {
        strategy: "jwt"
    },

    callbacks: {

        jwt: async ({token, user}: any) => {
            if(user)
                token.user = {...user};
            return token;
        },

        session: async ({session, token}: any) => {
            session.user = token.user;
            return session;
        }

    },

    secret: process.env.NEXTAUTH_SECRET,

}

export default nextAuthConfig;