import { addNewUser } from "@/prisma/user";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest){
    try {
        const data = await request.json()
        const user = await addNewUser(data)
        return new Response(JSON.stringify(user),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}