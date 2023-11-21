import { getVerseByIds, updateVerses } from "@/prisma/verse";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest){
    const url = new URL(request.url);
    const verses = url.searchParams.get("verses")
    const verseIds = verses?.split(",") as string[]
    
    
    try {
        const verses = await getVerseByIds(verseIds);
        return new Response(JSON.stringify(verses),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function PUT(request:NextRequest){
    const data = await request.json();
    try {
        const res = await updateVerses(data.verses,data.songId,data.key,data.title,data.songType)
        return new Response(JSON.stringify(res),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}
////// updating VERSESS