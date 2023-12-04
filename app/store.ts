import { create } from "zustand";
import { Verse, lyric } from "./types";
import { v4 } from "uuid";


//   type Verse = {
//     verse_number: number;
//     id:string;
//     lyrics: lyric[];
//     type: string;
//   };
//   type Song = {
//     title: string;
//     verses: Verse[];
//     song_number: number;
//     key: string | null;
//   };
// type SongType = {
//     songs:Song[]|[],
//     addNewSong:(newSong:Song)=>void;
// }

// export const useSongs = create<SongType>((set)=>({
//     songs:[],
//     addNewSong:(newSong:Song)=>set((state)=>({songs:[
//         ...state.songs,
//         newSong
//     ]}))
// }))
type CreatingSong = {
    isCreating:boolean,
    setIsCreating:()=>void
}

export const useIsCreating = create<CreatingSong>((set)=>({
    isCreating:false,
    setIsCreating:()=>set((state)=>({
        isCreating:!state.isCreating,
    }))
}))

export const useIsSearching = create((set)=>({
    isSearching:false,
    setIsSearching:(boolean:boolean)=>set(()=>({
        isSearching:boolean,
    }))
}))
type songCatagory = {
    songCatagory:string;
    setSongCatagory:(newSongCatagory:string)=>void
}

export const useSongCatagory = create<songCatagory>((set)=>({
    songCatagory:"pop",
    setSongCatagory:(newSongCatagory:string)=>set(()=>({
        songCatagory:newSongCatagory,
    }))
}))

type creatingSongType = {
    songTitle:string,
    songKey:string,
    songType:string,
    songVerses:Verse[]|[],
}

type creatingSongAction = {
    setSongTitle:(newSongTitle:string)=>void
    setsongKey:(newsongKey:string)=>void
    setsongType:(newsongType:string)=>void
    setVerse:(verses:Verse[])=>void
    addNewVerse:()=>void
    changeVerseType:(verseId:string)=>void
    updateVerse:(verseId:string,lyric_lines:lyric[])=>void
    deleteVerse:(verseId:string)=>void
    addNewLyricLine:(verseId:string)=>void
    updateLyricLine:(verseId:string,lyricId:string,newLyricLine:string)=>void
    deleteLyricLine:(verseId:string,lyricId:string)=>void
    clearSongData:()=>void
    updateLyricType:(verseId:string,lyricId:string)=>void
}

export const usePendingSong = create<creatingSongType&creatingSongAction>((set)=>({
    songTitle:"",
    songKey:"",
    songType:"",
    songVerses:[{
        id: "2k3",
        verse_number: 1,
        type: "verse",
        lyrics: [
          {
            id: "0",
            lyric_line: "",
            lyricType:"lyric",
          },
        ],
      }],
    setSongTitle:(newSongTitle:string)=>set(()=>({
        songTitle:newSongTitle
    })),
    setsongKey:(newsongKey:string)=>set(()=>({
        songKey:newsongKey
    })),
    setsongType:(newsongType:string)=>set(()=>({
        songType:newsongType
    })),
    setVerse:(verses:Verse[])=>set(()=>({
        songVerses:verses
    }))
    ,
    addNewVerse:()=>set((state)=>({
        songVerses:[
            ...state.songVerses,
                {
                  id: v4(),
                  verse_number: state.songVerses.length + 1,
                  type: "verse",
                  lyrics: [
                    {
                      id: v4(),
                      lyric_line: "",
                      lyricType:"lyric",
                    },
                  ],
                },    
        ]
    })),
    changeVerseType:(verseId:string)=>set((state)=>({
        songVerses:state.songVerses.map((verse) => {
            if (verse.id === verseId) {
              return {
                ...verse,
                type: verse.type === "verse" ? "chorus" : "verse",
              };
            }
            return verse;
          })
    })),
    updateVerse:(verseId:string,lyric_lines:lyric[])=>set((state)=>({
      songVerses:state.songVerses.map((verse) => {
          if (verse.id === verseId) {
            return {
              ...verse,
              lyrics:lyric_lines
            };
          }
          return verse;
        })
  })),
    deleteVerse:(verseId:string)=>set((state)=>({
        songVerses:state.songVerses.filter((verse) => verse.id !== verseId)
    })),
    addNewLyricLine:(verseId:string)=>set((state)=>({
        songVerses: state.songVerses.map((verse) => {
            if (verse.id === verseId) {
              return {
                ...verse,
                lyrics: [
                  ...verse.lyrics,
                  {
                    id: v4(),
                    lyric_line: "",
                    lyricType:"lyric",
                  },
                ],
              };
            }
            return verse;
          })
    })),
    updateLyricLine:(verseId:string,lyricId:string,newLyricLine:string)=>set((state)=>({
        songVerses:state.songVerses.map((verse) => {
            if (verse.id === verseId) {
              return {
                ...verse,
                lyrics: verse.lyrics.map((lyric) => {
                  if (lyric.id === lyricId) {
                    return {
                      ...lyric,
                      lyric_line: newLyricLine,
                    };
                  }
                  return lyric;
                }),
              };
            }
            return verse;
          })
    })),
    updateLyricType:(verseId:string,lyricId:string)=>set((state)=>({
      songVerses:state.songVerses.map((verse) => {
          if (verse.id === verseId) {
            return {
              ...verse,
              lyrics: verse.lyrics.map((lyric) => {
                if (lyric.id === lyricId) {
                  return {
                    ...lyric,
                    lyricType:lyric.lyricType==="lyric"?"key":"lyric",
                  };
                }
                return lyric;
              }),
            };
          }
          return verse;
        })
  })),
    deleteLyricLine:(verseId:string,lyricId:string)=>set((state)=>({
        songVerses:state.songVerses.map((verse) => {
            if (verse.id === verseId) {
              return {
                ...verse,
                lyrics: verse.lyrics.filter((lyric) => lyric.id !== lyricId),
              };
            }
            return verse;
          })
    })),
    clearSongData:()=>set((state)=>({
        songKey:"",
        songTitle:"",
        songType:"",
        songVerses:[{
            id: "2k3",
            verse_number: 1,
            type: "verse",
            lyrics: [
              {
                id: "0",
                lyric_line: "",
                lyricType:"lyric"
              },
            ],
          }]
    }))
}))