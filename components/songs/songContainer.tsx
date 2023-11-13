"use client";

import React, { useState } from "react";
import { useSongs } from "@/app/store";
import Verse from "./verse";
import SongFrom from "./songForm";
import { AvatarDemo } from "../avatar";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase-config";

type lyric = {
  id: number;
  text: string;
};
type Verse = {
  verse_number: number;
  lyrics: lyric[];
  type: string;
};
type Song = {
  title: string;
  verses: Verse[];
  song_number: number;
  key: string | null;
};
export default function Song() {
  const allSongs = useSongs((state) => state.songs);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser);
  });
  console.log(currentUser);

  return (
    <main className="flex flex-col relative ">
      {currentUser && (
        <section className="flex justify-center items-center">
          <h3 className="m-1">{currentUser?.displayName}</h3>
          <AvatarDemo avatarSrc={currentUser.photoURL as string} />
        </section>
      )}
      {allSongs.map((song) => (
        <SongFrom
          songKey={song.key as string}
          title={song.title}
          verses={song.verses}
        />
      ))}
    </main>
  );
}
