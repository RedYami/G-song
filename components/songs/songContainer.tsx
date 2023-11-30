"use client";

import { useQuery } from "@tanstack/react-query";
import SongSkeleton from "../skeletons/songSkeleton";
import { useSongCatagory } from "@/app/store";
import axios from "axios";
import toast from "react-hot-toast";
import { Song } from "@/app/types";
import SongForm from "./songForm";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import nProgress from "nprogress";
import LoadingUI from "../loadingProgress";
// const fetchSongsByType = async () => {
//   const res = await axios.get(
//     `https://songlyrics-omega.vercel.app/api/song/type?songType=${"dd"}`
//   );
//   if (res.status === 200) {
//     console.log(res);
//     return res.data;
//   } else {
//     return toast.error("error in fetching..");
//   }
// };

export default function Song() {
  const songType = useSongCatagory((state) => state.songCatagory);
  const [filteredSong, setFilteredSong] = useState<Song[] | []>([]);
  const { data, status } = useQuery({
    queryKey: ["songs"],
    queryFn: async () => {
      const res = await axios.get(
        `https://songlyrics-omega.vercel.app/api/song`
      );
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
    <div className="flex flex-col relative ">
      {status === "pending" && <SongSkeleton />}
      {data && setFilteredSong?.length === 0 && (
        <h3 className="xsm:text-lg sm:text-2xl text-center">
          {` ${songType} doesn't exist yet :)`}
        </h3>
      )}

      {status === "success" &&
        filteredSong &&
        filteredSong.map((song: Song, index: number) => (
          <article
            key={index}
            className="flex xsm:flex-col sm:flex-row justify-center items-center my-2"
          >
            <Image
              src={song.coverImage}
              width={400}
              height={400}
              className=" object-cover xsm:min-h-[10vh] xsm:max-h-[25vh] sm:min-h-[30vh] sm:max-h-[400px] bg-center xsm:rounded-t-md sm:rounded-l-md min-h-[200px] xsm:mr-0 sm:mr-2 "
              alt="songImg"
              sizes="(min-width: 340px) 25vh,(min-width:620px) 50vh"
            />
            <SongForm
              songType={song.songType}
              songId={song.id}
              songKey={song.key as string}
              author={song.author}
              title={song.title}
              verses={JSON.parse(JSON.stringify(song?.verses))}
              audio={song.audio}
            />
          </article>
        ))}
    </div>
  );
}
