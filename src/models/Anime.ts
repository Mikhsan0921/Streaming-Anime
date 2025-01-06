import mongoose, { Schema, Document, model, models } from 'mongoose';

interface IAnime extends Document {
    title: string;
    description: string;
    genres: mongoose.Types.ObjectId[];
    releaseDate: number;
    thumbnail: string;
    banner: string;
}

const AnimeSchema = new Schema<IAnime>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
        required: true
    },
    releaseDate: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    banner: { type: String, required: true },
});

// Export the Anime model
export default models.Anime || model<IAnime>('Anime', AnimeSchema);
