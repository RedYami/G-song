import { getASongById } from "@/prisma/song";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest,{params}:{params:{songId:string}}){
    const songId = params.songId
    console.log("from interanl song id:",songId);
    
    try {
        const song = await getASongById(songId);
        return new Response(JSON.stringify(song),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}