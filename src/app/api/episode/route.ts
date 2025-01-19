import { NextResponse } from 'next/server';
import Anime from '@/models/Anime';

// GET: Fetch episodes of a specific anime
export async function GET(req: Request) {
    try {
        const { animeId }: { animeId?: string } = Object.fromEntries(new URL(req.url).searchParams.entries());

        if (!animeId) {
            return NextResponse.json({ error: 'Anime ID is required' }, { status: 400 });
        }

        // Query using `id` instead of `_id`
        const anime = await Anime.findOne({ id: parseInt(animeId) }).select('episodeList');
        if (!anime) {
            return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
        }

        return NextResponse.json(anime.episodeList, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch episodes', details: error.message }, { status: 500 });
    }
}

// POST: Add a new episode to an anime
export async function POST(req: Request) {
    try {
        const { animeId, episode }: { animeId?: string; episode?: any } = await req.json();

        if (!animeId || !episode) {
            return NextResponse.json({ error: 'Anime ID and episode data are required' }, { status: 400 });
        }

        // Query using `id` instead of `_id`
        const anime = await Anime.findOne({ id: parseInt(animeId) });
        if (!anime) {
            return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
        }

        anime.episodeList.push(episode);
        await anime.save();

        return NextResponse.json({ message: 'Episode added successfully', episode }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to add episode', details: error.message }, { status: 500 });
    }
}

// PATCH: Update an episode of an anime
export async function PATCH(req: Request) {
    try {
        const { animeId, episodeNumber, updateData }: { animeId?: string; episodeNumber?: number; updateData?: any } = await req.json();

        if (!animeId || episodeNumber === undefined || !updateData) {
            return NextResponse.json({ error: 'Anime ID, episode number, and update data are required' }, { status: 400 });
        }

        // Query using `id` instead of `_id`
        const anime = await Anime.findOne({ id: parseInt(animeId) });
        if (!anime) {
            return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
        }

        const episode = anime.episodeList.find((ep: any) => ep.episodeNumber === episodeNumber);
        if (!episode) {
            return NextResponse.json({ error: 'Episode not found' }, { status: 404 });
        }

        Object.assign(episode, updateData);
        await anime.save();

        return NextResponse.json({ message: 'Episode updated successfully', episode }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update episode', details: error.message }, { status: 500 });
    }
}

// DELETE: Delete an episode from an anime
export async function DELETE(req: Request) {
    try {
        const { animeId, episodeNumber }: { animeId?: string; episodeNumber?: number } = await req.json();

        if (!animeId || episodeNumber === undefined) {
            return NextResponse.json({ error: 'Anime ID and episode number are required' }, { status: 400 });
        }

        // Query using `id` instead of `_id`
        const anime = await Anime.findOne({ id: parseInt(animeId) });
        if (!anime) {
            return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
        }

        const episodeIndex = anime.episodeList.findIndex((ep: any) => ep.episodeNumber === episodeNumber);
        if (episodeIndex === -1) {
            return NextResponse.json({ error: 'Episode not found' }, { status: 404 });
        }

        anime.episodeList.splice(episodeIndex, 1);
        await anime.save();

        return NextResponse.json({ message: 'Episode deleted successfully' }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete episode', details: error.message }, { status: 500 });
    }
}
