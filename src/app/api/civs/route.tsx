import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import Civ from "@/models/Civ";
import { CivType } from "@/models/Civ";


export async function GET(request: Request) {
    await connectToMongoDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    console.log(searchParams);

    if (!query) {
        // return NextResponse.json({ error: "No query provided" }, { status: 400 });
        console.log("no query provided btw");
    } else {
        console.log(`Query found: ${query}`);
    }

    try {
        // return NextResponse.json({ civs: ['Civ1', 'Civ2', 'Civ3'] });
        const civs: CivType[] = await Civ.find({});

        return NextResponse.json(civs);

    } catch (error) {
        console.error("Error fetching civs:", error);
        return NextResponse.json({ error: "Failed to fetch civs" }, { status: 500 });
    }

    // const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    // const { results }: UnsplashSearchResponse = await response.json();

    // return NextResponse.json(results);

}