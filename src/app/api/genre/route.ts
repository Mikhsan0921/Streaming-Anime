import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Genre from '@/models/Genre';

// Function to generate a unique integer ID
async function generateUniqueId() {
    const lastGenre = await Genre.findOne().sort({ id: -1 }); // Get the last inserted genre
    return lastGenre ? lastGenre.id + 1 : 1; // Increment ID or start from 1
}

// GET: Fetch all genres
export async function GET() {
    await dbConnect();

    try {
        const genres = await Genre.find({});
        return NextResponse.json(genres, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch genres' }, { status: 500 });
    }
}

// POST: Create a new genre
export async function POST(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const id = await generateUniqueId(); // Generate unique ID for the new genre
        const newGenre = await Genre.create({ id, ...body });

        return NextResponse.json(newGenre, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to create genre', details: error.message }, { status: 400 });
    }
}

// PATCH: Update an existing genre by ID
export async function PATCH(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: 'Genre ID is required for update' }, { status: 400 });
        }

        const updatedGenre = await Genre.findOneAndUpdate({ id }, updateData, { new: true });
        if (!updatedGenre) {
            return NextResponse.json({ error: 'Genre not found' }, { status: 404 });
        }

        return NextResponse.json(updatedGenre, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to update genre', details: error.message }, { status: 400 });
    }
}

// DELETE: Delete a genre by ID
export async function DELETE(req: Request) {
    await dbConnect();

    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'Genre ID is required for deletion' }, { status: 400 });
        }

        const deletedGenre = await Genre.findOneAndDelete({ id });
        if (!deletedGenre) {
            return NextResponse.json({ error: 'Genre not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Genre deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to delete genre', details: error.message }, { status: 400 });
    }
}
