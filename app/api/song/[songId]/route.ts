import { deleteASong, getASongById } from "@/prisma/song";
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

export async function DELETE(request:NextRequest,{params}:{params:{songId:string}}){
    const songId = params.songId
    try {
        const response = await deleteASong(songId);
        return new Response(JSON.stringify(response),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}