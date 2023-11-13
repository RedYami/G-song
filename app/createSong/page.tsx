"use client";
import CreateSong from "@/components/songs/create_song";
import { useIsCreating } from "../store";
import SongFrom from "@/components/songs/songForm";

export default function CreateSongPage() {
  const setIsCreating = useIsCreating((state) => state.setIsCreating);
  return (
    <main className=" flex xsm:flex-col sm:flex-row justify-center ">
      <CreateSong hideCreating={() => setIsCreating()} />
    </main>
  );
}
