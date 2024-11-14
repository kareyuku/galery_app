import { db } from '@/db';
import { comments } from '@/db/schema';
import nextAuthConfig from '@/lib/nextAuth';
import { sql } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { postId, content } = await req.json();

    const session = await getServerSession(nextAuthConfig);
    if(!session || !session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    if (!postId || !content) {
      return NextResponse.json({ error: 'Fill content' }, { status: 400 });
    }

    const newCommentId = await db.insert(comments).values({
      postId: postId,
      userId: session.user.id,
      content: content
    }).$returningId();

    const newComment = await db.select().from(comments).where(sql`${comments.id} = ${newCommentId[0].id}`);

    return NextResponse.json(newComment[0], { status: 201 });
  } catch (error) {
    console.error('Error on adding comment', error);
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
