import { getSongsByType } from "@/prisma/song";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    try {
        const url = new URL(req.url);
        const type = url.searchParams.get("songType");
  
        const songs = await getSongsByType(type as string);
        return new Response(JSON.stringify(songs),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}