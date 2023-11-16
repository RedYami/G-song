import { searchSongs } from "@/prisma/song";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest){
    const url = new URL(request.url);
    const searchText = url.searchParams.get("searchText");
    try {
        const songs = await searchSongs(searchText as string);
        return new Response(JSON.stringify(songs),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}