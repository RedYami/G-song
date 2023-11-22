import { getSongsByType } from "@/prisma/song";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    try {
        const url = new URL(req.url);
        const type = url.searchParams.get("songType") as string;
  
        const songs = await getSongsByType(type);
        console.log("returned song in api:",songs);
        
        return new Response(JSON.stringify(songs),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}