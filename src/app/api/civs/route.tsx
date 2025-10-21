import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import Civ from "@/models/Civ";
import { CivType } from "@/models/Civ";

// Get all Civilizations or a Civilization by name
export async function GET(request: Request) {
    await connectToMongoDB();

    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    console.log('searchParams: ', searchParams);

    if (!name) {
        try {
            const civs: CivType[] = await Civ.find({});
            return NextResponse.json(civs);
        } catch (error) {
            console.error("Error fetching civs:", error);
            return NextResponse.json({ error: "Failed to fetch civs" }, { status: 500 });
        }
    } else {
        try {
            const civ: CivType | null = await Civ.findOne({ name: name });
            if (civ) {
                return NextResponse.json(civ);
            } else {
                return NextResponse.json({ error: `Civ not found with name ${name}` }, { status: 404 });
            }
        } catch (error) {
            console.error("Error fetching civ:", error);
            return NextResponse.json({ error: "Failed to fetch civ" }, { status: 500 });
        }
    }
}

// Add a new Civilization
export async function POST(request: Request) {
    await connectToMongoDB();

    try {
        const civData: CivType = await request.json();
        const newCiv = new Civ(civData);
        const savedCiv = await newCiv.save();
        return NextResponse.json(savedCiv, { status: 201 });
    } catch (error) {
        console.error("Error creating civ:", error);
        return NextResponse.json({ error: "Failed to create civ" }, { status: 500 });
    }
}

// Update a Civilization by name
export async function PUT(request: Request) {
    await connectToMongoDB();

    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
        return NextResponse.json({ error: "Name query parameter is required" }, { status: 400 });
    }
    try {
        const civData: Partial<CivType> = await request.json();

        // console.log('civData :>> ', civData);

        // Use {$set: civData} instead of civData to update only the fields provided in the request body & leave the rest
        const updatedCiv = await Civ.findOneAndUpdate({ name: name }, { $set: civData }, { new: true });

        if (updatedCiv) {
            return NextResponse.json(updatedCiv);
        } else {
            return NextResponse.json({ error: `Update failed. Civ not found with name ${name}` }, { status: 404 });
        }
    } catch (error) {
        console.error("Error updating civ:", error);
        return NextResponse.json({ error: "Failed to update civ" }, { status: 500 });
    }
}