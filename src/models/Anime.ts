import mongoose, { Schema, Document, model, models } from 'mongoose';

interface IStream {
    url: string;
    label: string;
    quality: string;
}

interface IEpisode {
    episodeNumber: number;
    title: string;
    streams: IStream[];
}

export interface IAnime extends Document {
    [x: string]: any;
    id: number;
    title: string;
    subtitle: string[];
    description: string;
    type: string;
    releaseDate: number;
    rating: number;
    genres: mongoose.Types.ObjectId[];
    status: string;
    studio: mongoose.Types.ObjectId;
    thumbnail: string;
    banner: string;
    episodeList: IEpisode[];
}

const StreamSchema = new Schema<IStream>({
    url: { type: String, required: true },
    label: { type: String, required: true },
    quality: { type: String, required: true },
});

const EpisodeSchema = new Schema<IEpisode>({
    episodeNumber: { type: Number, required: true },
    title: { type: String, required: true },
    streams: { type: [StreamSchema], required: true },
});

const AnimeSchema = new Schema<IAnime>({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    subtitle: { type: [String], default: [] },
    description: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'TV', 'Movie', 'OVA'
    releaseDate: { type: Number, required: true },
    rating: { type: Number, required: true }, // e.g., 1-10
    genres: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }], required: true },
    status: { type: String, enum: ['Ongoing', 'Completed', 'Upcoming'], required: true },
    studio: { type: mongoose.Schema.Types.ObjectId, ref: 'Studio', required: true },
    thumbnail: { type: String, required: true },
    banner: { type: String, required: true },
    episodeList: { type: [EpisodeSchema], default: [] },
});

// Export the Anime model
export default models.Anime || model<IAnime>('Anime', AnimeSchema);
