import { getVerseByIds } from "@/prisma/verse";
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