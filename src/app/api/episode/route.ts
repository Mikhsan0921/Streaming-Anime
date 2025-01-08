import { NextResponse } from 'next/server';

import Anime from '@/models/Anime';

// POST: Add an episode to an anime
export async function POST(req: Request) {

    try {
        const { animeId, episode } = await req.json();

        if (!animeId || !episode) {
            return NextResponse.json({ error: 'Anime ID and episode data are required' }, { status: 400 });
        }

        const anime = await Anime.findById(animeId);
        if (!anime) {
            return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
        }

        anime.episodeList.push(episode);
        await anime.save();

        return NextResponse.json(anime, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to add episode', details: error.message }, { status: 400 });
    }
}

// PATCH: Update an episode in an anime
export async function PATCH(req: Request) {

    try {
        const { animeId, episodeNumber, episodeData } = await req.json();

        if (!animeId || episodeNumber === undefined || !episodeData) {
            return NextResponse.json({ error: 'Anime ID, episode number, and updated data are required' }, { status: 400 });
        }

        const anime = await Anime.findById(animeId);
        if (!anime) {
            return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
        }

        const episode = anime.episodeList.find((ep: any) => ep.episodeNumber === episodeNumber);
        if (!episode) {
            return NextResponse.json({ error: 'Episode not found' }, { status: 404 });
        }

        Object.assign(episode, episodeData);
        await anime.save();

        return NextResponse.json(anime, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to update episode', details: error.message }, { status: 400 });
    }
}

// DELETE: Remove an episode from an anime
export async function DELETE(req: Request) {

    try {
        const { animeId, episodeNumber } = await req.json();

        if (!animeId || episodeNumber === undefined) {
            return NextResponse.json({ error: 'Anime ID and episode number are required' }, { status: 400 });
        }

        const anime = await Anime.findById(animeId);
        if (!anime) {
            return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
        }

        anime.episodeList = anime.episodeList.filter((ep: any) => ep.episodeNumber !== episodeNumber);
        await anime.save();

        return NextResponse.json({ message: 'Episode deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to delete episode', details: error.message }, { status: 400 });
    }
}

// GET: Fetch all episodes of an anime
export async function GET(req: Request) {

    const { animeId } = Object.fromEntries(new URL(req.url).searchParams.entries());

    if (!animeId) {
        return NextResponse.json({ error: 'Anime ID is required' }, { status: 400 });
    }

    try {
        const anime = await Anime.findById(animeId).select('episodeList');
        if (!anime) {
            return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
        }

        return NextResponse.json(anime.episodeList, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to fetch episodes', details: error.message }, { status: 400 });
    }
}
