import { NextResponse } from 'next/server';
import Anime from '@/models/Anime';

// GET: Fetch all animes or filter/search by query
export async function GET(req: Request) {

    const { search, genre, releaseDate }: { search?: string; genre?: string; releaseDate?: string } = Object.fromEntries(
        new URL(req.url).searchParams.entries()
    );

    try {
        const filter: any = {};
        if (search) {
            filter.title = { $regex: search, $options: 'i' }; // Search by title (case-insensitive)
        }
        if (genre) {
            filter.genres = { $in: genre.split(',') }; // Filter by genres
        }
        if (releaseDate) {
            filter.releaseDate = Number(releaseDate); // Filter by release year
        }

        const animes = await Anime.find(filter).populate('genres').populate('studio');
        return NextResponse.json(animes, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch animes' }, { status: 500 });
    }
}

// POST: Create a new anime
export async function POST(req: Request) {

    try {
        const body = await req.json();
        const newAnime = await Anime.create(body);
        return NextResponse.json(newAnime, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to create anime', details: error.message }, { status: 400 });
    }
}

// PATCH: Update an existing anime by ID
export async function PATCH(req: Request) {

    try {
        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: 'Anime ID is required for update' }, { status: 400 });
        }

        const updatedAnime = await Anime.findByIdAndUpdate(id, updateData, { new: true }).populate('genres').populate('studio');
        if (!updatedAnime) {
            return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
        }

        return NextResponse.json(updatedAnime, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to update anime', details: error.message }, { status: 400 });
    }
}

// DELETE: Delete an anime by ID
export async function DELETE(req: Request) {

    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'Anime ID is required for deletion' }, { status: 400 });
        }

        const deletedAnime = await Anime.findByIdAndDelete(id);
        if (!deletedAnime) {
            return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Anime deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to delete anime', details: error.message }, { status: 400 });
    }
}
