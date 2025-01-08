import { NextResponse } from 'next/server';

import Studio from '@/models/Studio';

// Function to generate a unique integer ID for Studio
async function generateUniqueId() {
    const lastStudio = await Studio.findOne().sort({ id: -1 }); // Get the last inserted studio
    return lastStudio ? lastStudio.id + 1 : 1; // Increment ID or start from 1
}

// GET: Fetch all studios
export async function GET() {

    try {
        const studios = await Studio.find({});
        return NextResponse.json(studios, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch studios' }, { status: 500 });
    }
}

// POST: Create a new studio
export async function POST(req: Request) {

    try {
        const body = await req.json();
        const id = await generateUniqueId(); // Generate unique ID for the new studio
        const newStudio = await Studio.create({ id, ...body });

        return NextResponse.json(newStudio, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to create studio', details: error.message }, { status: 400 });
    }
}

// PATCH: Update an existing studio by ID
export async function PATCH(req: Request) {

    try {
        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: 'Studio ID is required for update' }, { status: 400 });
        }

        const updatedStudio = await Studio.findOneAndUpdate({ id }, updateData, { new: true });
        if (!updatedStudio) {
            return NextResponse.json({ error: 'Studio not found' }, { status: 404 });
        }

        return NextResponse.json(updatedStudio, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to update studio', details: error.message }, { status: 400 });
    }
}

// DELETE: Delete a studio by ID
export async function DELETE(req: Request) {

    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'Studio ID is required for deletion' }, { status: 400 });
        }

        const deletedStudio = await Studio.findOneAndDelete({ id });
        if (!deletedStudio) {
            return NextResponse.json({ error: 'Studio not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Studio deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to delete studio', details: error.message }, { status: 400 });
    }
}
