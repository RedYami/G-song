import { Verse } from "@/components/songs/songForm";
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
    } catch (error:any) {
        console.log("verse error:",error.message);
        
        return error
    }
}

export async function updateVerses(verses:any,songId:string,songKey:string,title:string,songType:string){
    try {
        ///update song first
        await prisma.song.update({
            where:{
                id:songId
            },
            data:{
                title:title,
                titleLowerCase:title.toLowerCase(),
                key:songKey,
                songType:songType
            }
        })
        //update lric and verse
        await Promise.all(
            verses.map(async (verse: any) => {
                // Update existing verse
                await prisma.verse.update({
                  where: { id: verse.id },
                  data: {
                    lyrics: {
                      updateMany: verse.lyrics.map((lyric:any) => ({
                        where: { id: lyric.id },
                        data: {
                          lyric_line: lyric.lyric_line, // Optionally update lyric_line
                          lower_case_lyric: lyric.lyric_line.toLowerCase(),
                        },
                      })),
                    },
                  },
                });
             
            })
          );
        return "success"
      } catch (error) {
        // Handle errors here
        console.error('Error updating verses:', error);
        return error
      }
}