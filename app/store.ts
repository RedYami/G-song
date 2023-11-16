import { create } from "zustand";

type lyric = {
    id: number;
    text: string;
  };
  type Verse = {
    verse_number: number;
    id:string;
    lyrics: lyric[];
    type: string;
  };
  type Song = {
    title: string;
    verses: Verse[];
    song_number: number;
    key: string | null;
  };
type SongType = {
    songs:Song[]|[],
    addNewSong:(newSong:Song)=>void;
}

export const useSongs = create<SongType>((set)=>({
    songs:[],
    addNewSong:(newSong:Song)=>set((state)=>({songs:[
        ...state.songs,
        newSong
    ]}))
}))
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
