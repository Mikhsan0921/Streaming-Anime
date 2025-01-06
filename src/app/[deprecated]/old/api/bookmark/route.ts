import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
    await dbConnect();

    const session: any = await getServerSession(authOptions as any);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { animeId } = await req.json();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (user.bookmarks.includes(animeId)) {
            return NextResponse.json({ error: 'Anime already bookmarked' }, { status: 400 });
        }

        user.bookmarks.push(animeId);
        await user.save();

        return NextResponse.json({ message: 'Anime bookmarked successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to bookmark anime' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    await dbConnect();
    const session: any = await getServerSession(authOptions as any);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { animeId } = await req.json();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        user.bookmarks = user.bookmarks.filter((id: any) => id.toString() !== animeId);
        await user.save();

        return NextResponse.json({ message: 'Anime removed from bookmarks' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to remove bookmark' }, { status: 500 });
    }
}

export async function GET() {
    await dbConnect();
    const session: any = await getServerSession(authOptions as any);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await User.findOne({ email: session.user.email }).populate('bookmarks');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user.bookmarks, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
    }
}
