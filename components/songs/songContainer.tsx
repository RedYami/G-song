"use client";

import { useQuery } from "@tanstack/react-query";
import SongSkeleton from "../skeletons/songSkeleton";
import { SongHeader } from "./searchBtn";
import { useSongCatagory } from "@/app/store";
import axios from "axios";
import toast from "react-hot-toast";
import { Song } from "@/app/types";
import SongForm from "./songForm";
import { useEffect, useMemo, useState } from "react";
const fetchSongsByType = async () => {
  const res = await axios.get(
    `http://localhost:3000/api/song/type?songType=${"dd"}`
  );
  if (res.status === 200) {
    console.log(res);
    return res.data;
  } else {
    return toast.error("error in fetching..");
  }
};

export default function Song() {
  const songType = useSongCatagory((state) => state.songCatagory);
  const [filteredSong, setFilteredSong] = useState<Song[] | []>([]);
  const { data, status } = useQuery({
    queryKey: ["songs"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/api/song`);
      if (res.status === 200) {
        console.log(res);
        return res.data;
      } else {
        return toast.error("error in fetching..");
      }
    },
  });
  useEffect(() => {
    if (data) {
      setFilteredSong(data.filter((song: Song) => song.songType === songType));
    }
  }, [data, songType]);
  return (
    <main className="flex flex-col relative ">
      <SongHeader />
      {status === "pending" && <SongSkeleton />}
      {data && setFilteredSong?.length === 0 && (
        <h3 className="xsm:text-lg sm:text-2xl text-center">
          {` ${"pop"} doesn't exist yet :)`}
        </h3>
      )}
      {status === "success" &&
        filteredSong &&
        filteredSong.map((song: Song, index: number) => (
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
