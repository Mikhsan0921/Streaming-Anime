import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
        console.log('Connected to MongoDB');
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
