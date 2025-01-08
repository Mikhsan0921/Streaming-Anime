import dbConnect from '@/utils/dbConnect'
import Anime from '@/models/Anime';
import Genre from '@/models/Genre';
import Studio from '@/models/Studio';
import User from '@/models/User';

export async function register() {
    await dbConnect();

    const animes = await Anime.find();
    const genres = await Genre.find();
    const studios = await Studio.find();
    const users = await User.find();

    console.log("Initialized Mongoose Schema");
    console.log({ animes: animes.length, genres: genres.length, studios: studios.length, users: users.length });
}
