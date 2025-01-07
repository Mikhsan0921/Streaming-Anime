import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Anime from '@/models/Anime';
import Genre from '@/models/Genre';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get('q');
    const id = searchParams.get('id');

    if (!id && !searchTerm) {
        return NextResponse.json({ error: 'Search term or ID is required' }, { status: 400 });
    }

    try {
        if (id) {
            const response = await fetchAnimeDetails(Number(id));
            const anime = response.data;
            console.log(anime);
            const mappedAnime = {
                id: anime.mal_id,
                title: anime.title,
                thumbnail: anime.images.jpg.large_image_url,
                banner: anime.trailer.images.small_image_url || anime.images.jpg.large_image_url,
                releaseDate: anime.aired.prop.from.year,
                genres: anime.genres.map((g: any) => g.name),
                type: anime.type,
                description: anime.synopsis,
                status: anime.status === 'Finished Airing' ? 'Completed' : anime.status === 'Currently Airing' ? 'Ongoing' : 'Upcoming',
                studio: anime.studios[0]?.name || 'Unknown',
                rating: anime.rating,
            };
            return NextResponse.json(mappedAnime, { status: 200 });
            // return NextResponse.json(anime, { status: 200 });
        } else if (searchTerm) {
            const response = await fetch(`${process.env.JIKAN_API_URL}/v4/anime?q=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Failed to fetch anime data');
            }

            const { data } = await response.json();

            const mappedAnime = data.map((anime: any) => ({
                id: anime.mal_id,
                title: anime.title,
                thumbnail: anime.images.jpg.large_image_url,
                banner: anime.trailer.images.small_image_url || anime.images.jpg.large_image_url,
                releaseDate: anime.aired.prop.from.year,
                genres: anime.genres.map((g: any) => g.name),
                type: anime.type,
                description: anime.synopsis,
                status: anime.status === 'Finished Airing' ? 'Completed' : anime.status === 'Currently Airing' ? 'Ongoing' : 'Upcoming',
                studio: anime.studios[0]?.name || 'Unknown',
                rating: anime.rating,
            }));

            return NextResponse.json({ data: mappedAnime }, { status: 200 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function fetchAnimeDetails(id: number) {
    const response = await fetch(`${process.env.JIKAN_API_URL}/v4/anime/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch anime details');
    }
    return response.json();
}

export async function POST(req: Request) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: 'Anime ID is required' }, { status: 400 });
    }

    try {
        await dbConnect();

        const { data } = await fetchAnimeDetails(id);

        // Fetch or create genres
        const genreIds = [];
        for (const genre of data.genres) {
            const existingGenre = await Genre.findOneAndUpdate(
                { name: genre.name },
                { name: genre.name },
                { upsert: true, new: true }
            );
            genreIds.push(existingGenre._id);
        }

        // Map anime data to the schema
        const animeData = {
            title: data.title,
            subtitle: data.title_synonyms,
            description: data.synopsis,
            type: data.type,
            releaseDate: data.aired.prop.from.year,
            rating: data.score || 0,
            genres: genreIds,
            status: data.status === 'Finished Airing' ? 'Completed' : data.status === 'Currently Airing' ? 'Ongoing' : 'Upcoming',
            studio: null, // Set this after implementing the Studio model
            thumbnail: data.images.jpg.large_image_url,
            banner: data.trailer.images.small_image_url || data.images.jpg.large_image_url,
            episodeList: [], // You can extend this to include episode details if needed
        };

        // Save or update the anime in the database
        await Anime.updateOne(
            { title: data.title },
            { $set: animeData },
            { upsert: true }
        );

        return NextResponse.json({ message: 'Anime imported successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
