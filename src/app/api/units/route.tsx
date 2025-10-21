import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import Unit from "@/models/Unit";
import { UnitType } from "@/models/Unit";

// Get all Units or a Unit by name
export async function GET(request: Request) {
    await connectToMongoDB();

    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    console.log('searchParams: ', searchParams);

    if (!name) {
        try {
            const units: UnitType[] = await Unit.find({});
            return NextResponse.json(units);
        } catch (error) {
            console.error("Error fetching units:", error);
            return NextResponse.json({ error: "Failed to fetch units" }, { status: 500 });
        }
    } else {
        try {
            const unit: UnitType | null = await Unit.findOne({ name: name });
            if (unit) {
                console.log(unit.cost);
                return NextResponse.json(unit);
            } else {
                return NextResponse.json({ error: `Unit not found with name ${name}` }, { status: 404 });
            }
        } catch (error) {
            console.error("Error fetching unit:", error);
            return NextResponse.json({ error: "Failed to fetch unit" }, { status: 500 });
        }
    }
}

// Add a new Unit
export async function POST(request: Request) {
    await connectToMongoDB();

    try {
        const unitData: UnitType = await request.json();
        const newUnit = new Unit(unitData);
        const savedUnit = await newUnit.save();
        return NextResponse.json(savedUnit, { status: 201 });
    } catch (error) {
        console.error("Error creating unit:", error);
        return NextResponse.json({ error: "Failed to create unit" }, { status: 500 });
    }
}

// Update a Unit by name
export async function PUT(request: Request) {
    await connectToMongoDB();

    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
        return NextResponse.json({ error: "Name query parameter is required" }, { status: 400 });
    }
    try {
        const unitData: Partial<UnitType> = await request.json();

        // Use {$set: unitData} instead of unitData to update only the fields provided in the request body & leave the rest
        const updatedUnit = await Unit.findOneAndUpdate({ name: name }, { $set: unitData }, { new: true });

        if (updatedUnit) {
            return NextResponse.json(updatedUnit);
        } else {
            return NextResponse.json({ error: `Update failed. Unit not found with name ${name}` }, { status: 404 });
        }
    } catch (error) {
        console.error("Error updating unit:", error);
        return NextResponse.json({ error: "Failed to update unit" }, { status: 500 });
    }
}