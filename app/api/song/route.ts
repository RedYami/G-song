import { AddSong, deleteAllSongs, getAllSongs } from "@/prisma/song";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest){
    try {
        const data = await request.json()
        console.log("newSong",data);
        
        await AddSong(data);
        return new Response("success",{
            status:200
        })
    } catch (error) {
        return new Response("Error",{
            status:500,
            statusText:"error in creating song"
        })
    }
}

export async function GET(request:NextRequest){
    try {
        const songs = await getAllSongs();
        return new Response(JSON.stringify(songs),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function DELETE(){
    try {
        await deleteAllSongs();
        return new Response(JSON.stringify("success"),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}