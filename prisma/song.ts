import prisma from "./client";
const LanguageDetect = require("languagedetect");
const lngDetector = new LanguageDetect();


export async function AddSong(data: any) {
    const checkedLanguage = lngDetector.detect(data.title,1);
    
    try {
        await prisma.song.create({
            data: {
              audio:data.songAudio,
              title: data.title,
              songType:data.songType,
              titleLowerCase:(checkedLanguage.length && checkedLanguage[0][0]==="english")? data.title.toLowerCase():data.title,
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
                      lower_case_lyric:(checkedLanguage.length && checkedLanguage[0][0]==="english")? lyric.lyric_line.toLowerCase():lyric.lyric_line,
                    })),
                  },
                  type: verse.type,
                })),
              },
            },
          });
          return "success"
        
    } catch (error) {
      console.log("from song back:",error);
      
        throw error
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

  export async function getSongsByType(type:string){
    try {
      const songs = await prisma.song.findMany({
        where:{
          songType:type
        },
        include:{
          verses:true,
          author:true,
        },
        orderBy:{
          title:"asc"
        }
      })
      console.log("returned song:",songs);
      
      return songs
    } catch (error) {
      return error
    }
  }

  export async function deleteAllSongs(){
    await prisma.song.deleteMany();
    return "success"
  }

  export async function deleteASong(songId:string){
    try {
      await prisma.song.delete({
        where:{
          id:songId
        }
      })
      return "success"
    } catch (error) {
      return error
    }
  }

  export async function searchSongs(searchText:string){
    try {
      const songs = await prisma.song.findMany({
        where:{
          titleLowerCase:{
            contains:searchText.toLowerCase()
          }
        }
      })
      return songs
    } catch (error) {
      return error
    }
  }