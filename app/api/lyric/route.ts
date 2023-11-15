import { getLyric } from "@/prisma/lyric";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest){
    const url = new URL(request.url);
    const searchText = url.searchParams.get("searchText") as string;
    try {
        const lyrics = await getLyric(searchText);
        return new Response(JSON.stringify(lyrics),{
        status:200
    })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}