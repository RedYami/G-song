import prisma from "./client";

export async function getLyric(searchText:string){
    const distinctSongIds = await prisma.lyric.findMany({
        where:{
            lower_case_lyric:{
                contains:searchText.toLowerCase()
            }
        },
        include:{
            parent_verse:true,
        },
        });
      
        // Extract song IDs from the distinct result
        const songIds = distinctSongIds.map((item) => item.parent_verse.songId);
      
        // Fetch songs based on the distinct song IDs
        const resultSongs = await prisma.song.findMany({
          where: {
            id: {
              in: songIds,
            },
          },
        });

    return resultSongs
}