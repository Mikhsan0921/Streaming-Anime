import { NextResponse } from 'next/server';

import Anime from '@/models/Anime';
import Genre from '@/models/Genre';
import Studio from '@/models/Studio';

// Utility functions
async function fetchAnimeDetails(id: number): Promise<JikanAnimeData> {
    const response = await fetch(`${process.env.JIKAN_API_URL}/v4/anime/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch anime details');
    }
    return response.json().then((data) => data.data);
}

async function fetchAnimeList(searchTerm: string, page?: number): Promise<{ pagination: JikanPagination; data: JikanAnimeData[] }> {
    const response = await fetch(`${process.env.JIKAN_API_URL}/v4/anime?q=${searchTerm}&page=${page || 1}`);
    if (!response.ok) {
        throw new Error('Failed to fetch anime list');
    }
    return response.json().then((data) => data);
}

function mapAnimeData(anime: JikanAnimeData) {
    return {
        id: anime.mal_id,
        title: anime.title,
        thumbnail: anime.images.jpg.large_image_url,
        banner: anime.trailer?.images?.small_image_url || anime.images.jpg.large_image_url,
        releaseDate: anime.aired.prop.from.year,
        genres: anime.genres.map((g) => g.name),
        type: anime.type,
        description: anime.synopsis,
        status:
            anime.status === 'Finished Airing'
                ? 'Completed'
                : anime.status === 'Currently Airing'
                    ? 'Ongoing'
                    : 'Upcoming',
        studio: {
            id: anime.studios[0]?.mal_id || 0,
            name: anime.studios[0]?.name || 'Unknown',
        },
        rating: anime.rating,
    };
}

async function upsertGenres(genres: { name: string }[]) {
    const genreIds: string[] = [];
    for (const genre of genres) {
        const existingGenre = await Genre.findOneAndUpdate(
            { name: genre.name },
            { name: genre.name },
            { upsert: true, new: true }
        );
        genreIds.push(existingGenre._id.toString());
    }
    return genreIds;
}

async function upsertStudio(studios: { mal_id: number; name: string }[]) {
    if (studios.length === 0) return null;

    const studioData = studios[0];
    const existingStudio = await Studio.findOneAndUpdate(
        { name: studioData.name },
        { name: studioData.name, id: studioData.mal_id },
        { upsert: true, new: true }
    );

    return existingStudio._id.toString();
}

// Handlers
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get('q');
    const page = searchParams.get('page');
    const id = searchParams.get('id');

    if (!id && !searchTerm) {
        return NextResponse.json({ error: 'Search term or ID is required' }, { status: 400 });
    }

    try {
        if (id) {
            const anime = await fetchAnimeDetails(Number(id));
            return NextResponse.json(mapAnimeData(anime), { status: 200 });
        } else if (searchTerm) {
            const animeList = await fetchAnimeList(searchTerm, Number(page));
            return NextResponse.json(
                { pagination: animeList.pagination, data: animeList.data.map((anime) => mapAnimeData(anime)) },
                { status: 200 }
            );
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { id }: { id: number } = await req.json();

    if (!id) {
        return NextResponse.json({ error: 'Anime ID is required' }, { status: 400 });
    }

    try {

        const anime = await fetchAnimeDetails(id);

        const genreIds = await upsertGenres(anime.genres);
        const studioId = await upsertStudio(anime.studios);

        const animeData = {
            id: anime.mal_id,
            title: anime.title,
            subtitle: anime.title_synonyms,
            description: anime.synopsis,
            type: anime.type,
            releaseDate: anime.aired.prop.from.year,
            rating: anime.score || 0,
            genres: genreIds,
            status:
                anime.status === 'Finished Airing'
                    ? 'Completed'
                    : anime.status === 'Currently Airing'
                        ? 'Ongoing'
                        : 'Upcoming',
            studio: studioId || null,
            thumbnail: anime.images.jpg.large_image_url,
            banner: anime.trailer?.images?.small_image_url || anime.images.jpg.large_image_url,
            episodeList: [],
        };

        await Anime.updateOne({ title: anime.title }, { $set: animeData }, { upsert: true });

        return NextResponse.json({ message: 'Anime imported successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
