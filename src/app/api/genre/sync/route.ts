import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Genre from '@/models/Genre';

// Fetch genres from Jikan API
async function fetchGenresFromJikanAPI() {
    const response = await fetch(process.env.JIKAN_API_URL + '/v4/genres/anime');
    if (!response.ok) {
        throw new Error('Failed to fetch genres from Jikan API');
    }
    const data = await response.json();
    return data.data.map((genre: any) => ({
        id: genre.mal_id, // Map mal_id to id
        name: genre.name,
    }));
}

// Synchronize genres to the database
async function syncGenresToDatabase(genres: { id: number; name: string }[]) {
    await dbConnect();

    for (const genre of genres) {
        await Genre.updateOne(
            { id: genre.id }, // Match by ID
            { $set: genre },  // Update or set the new data
            { upsert: true }  // Insert if not exists
        );
    }
}

export async function POST() {
    try {
        const genres = await fetchGenresFromJikanAPI();
        await syncGenresToDatabase(genres);

        return NextResponse.json({ message: 'Genres synchronized successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
