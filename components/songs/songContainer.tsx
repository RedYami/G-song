"use client";

import React, { useEffect, useState } from "react";
import Verse from "./verse";
import { AvatarDemo } from "../avatar";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SongForm from "./songForm";
import SongSkeleton from "../skeletons/songSkeleton";
import SearchButton from "./searchBtn";
import SearchSong from "./searchSong";
import { useIsSearching } from "@/app/store";

type lyric = {
  id: number;
  lyric_line: string;
};
type Verse = {
  verse_number: number;
  lyrics: lyric[];
  type: string;
  id: string;
};
type Song = {
  title: string;
  verses: Verse[];
  song_number: number;
  key: string | null;
  author: Author;
};
type Author = {
  username: string;
  email: string;
  id: string;
};
export default function Song() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hideSearch, setHideSearch] = useState(true);
  const { data, status } = useQuery({
    queryKey: ["allSongs"],
    queryFn: async () => {
      const songs = await axios.get("http://localhost:3000/api/song");
      return songs.data;
    },
  });
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });
  });
  return (
    <main className="flex flex-col relative ">
      {currentUser && (
        <section className="flex justify-between py-2 items-center">
          <div className="flex justify-center items-center ">
            <h3 className="m-1">{currentUser?.displayName}</h3>
            <AvatarDemo avatarSrc={currentUser.photoURL as string} />
          </div>
          <SearchButton hideSearch={() => setHideSearch(false)} />
        </section>
      )}
      {status === "pending" && <SongSkeleton />}
      {status === "success" &&
        data?.map((song: Song, index: number) => (
          <SongForm
            key={index}
            songKey={song.key as string}
            author={song.author}
            title={song.title}
            verses={JSON.parse(JSON.stringify(song.verses))}
          />
        ))}
      {!hideSearch && <SearchSong hide={() => setHideSearch(true)} />}
    </main>
  );
}
