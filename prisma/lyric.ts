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
    // const songs = await prisma.song.findMany({
    //   where:{
    //     titleLowerCase:{
    //       contains:searchText.toLowerCase(),
    //     }
    //   },
    //   include:{
    //     verses:true,
    //   }
    // })
      
    // // extract song IDs from the distinct result
    // const songIds1 = distinctSongIds.map((item) => item.parent_verse.songId);
    // const songIds2 = songs.map((item)=>item.id)
    // const songIds = songIds1.concat(songIds2)  
    //     // fetch songs based on the distinct song IDs
    //     const resultSongs = await prisma.song.findMany({
    //       where: {
    //         id: {
    //           in: songIds,
    //         },
    //       },
    //     });

    return distinctSongIds
}