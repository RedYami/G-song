import prisma from "./client";

export async function getVerseByIds(verseIds:string[]){
    try {
        const verses = await prisma.verse.findMany({
            where:{
                id:{
                    in:verseIds
                }
            },
            include:{
                lyrics:true,
            }
        })
        return verses
    } catch (error) {
        return error
    }
}