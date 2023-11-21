"use client";
import React from "react";
import Verse from "./verse";

import SongForm from "./songForm";
import SongSkeleton from "../skeletons/songSkeleton";
import { SongHeader } from "./searchBtn";
import { useSongCatagory } from "@/app/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

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
  id: string;
  title: string;
  verses: Verse[];
  song_number: number;
  key: string | null;
  author: Author;
  songType: string;
};
type Author = {
  username: string;
  email: string;
  id: string;
};

export default function Song() {
  const songType = useSongCatagory((state) => state.songCatagory);
  const { data, status } = useQuery({
    queryKey: ["songs", songType],
    queryFn: async () => {
      const res = await axios.get(
        `https://songlyrics-omega.vercel.app/api/song/type?songType=${songType}`
      );
      if (res.status === 200) {
        return res.data;
      } else {
        toast.error("error in fetching songs");
      }
    },
  });

  return (
    <main className="flex flex-col relative ">
      <SongHeader />
      {status === "pending" && <SongSkeleton />}
      {data?.length === 0 && (
        <h3 className="xsm:text-lg sm:text-2xl text-center">
          {` ${songType} doesn't exist yet :)`}
        </h3>
      )}
      {status === "success" &&
        data?.map((song: Song, index: number) => (
          <SongForm
            songType={song.songType}
            songId={song.id}
            key={index}
            songKey={song.key as string}
            author={song.author}
            title={song.title}
            verses={JSON.parse(JSON.stringify(song?.verses))}
          />
        ))}
    </main>
  );
}
