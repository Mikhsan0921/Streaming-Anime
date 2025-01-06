import mongoose from 'mongoose';

const StudioSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const Studio = mongoose.models.Genre || mongoose.model('Studio', StudioSchema);

export default Studio;
