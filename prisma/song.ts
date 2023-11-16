import prisma from "./client";



export async function AddSong(data: any) {
    try {
        await prisma.song.create({
            data: {
              title: data.title,
              titleLowerCase:data.title.toLowerCase(),
              key: data.key,
              author: {
                connect: { email: data.userEmail },
              },
              verses: {
                create: data.verses.map((verse: any) => ({
                  verse_number: verse.verse_number,
                  lyrics: {
                    create: verse.lyrics.map((lyric: any) => ({
                      lyric_line: lyric.lyric_line,
                      lower_case_lyric:lyric.lyric_line.toLowerCase(),
                    })),
                  },
                  type: verse.type,
                })),
              },
            },
          });
        
    } catch (error) {
        console.log(error);
        
        return error
    }
  }

  export async function getAllSongs(){
    try {
      const songs = await prisma.song.findMany({
        include:{
          verses:true,
          author:true
        },
        orderBy:{
          title:"asc"
        }
      });
      return songs
    } catch (error) {
      return error
    }
  }
  export async function getASongById(songId:string){
    try {
      const song = await prisma.song.findUnique({
        where:{
          id:songId
        },
        include:{
          verses:true,
          author:true,
        }
      })
      return song
    } catch (error) {
      console.log("internal error:",error);
      
      return error
    }
  }

  export async function deleteAllSongs(){
    await prisma.song.deleteMany();
    return "success"
  }

  export async function searchSongs(searchText:string){
    try {
      const songs = await prisma.song.findMany({
        where:{
          titleLowerCase:{
            contains:searchText
          }
        }
      })
      return songs
    } catch (error) {
      return error
    }
  }