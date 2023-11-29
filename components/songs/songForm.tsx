"use client";
import Verse from "./verse";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SongSkeleton from "../skeletons/songSkeleton";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import SomethingLoading from "../loadingSomething";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import Link from "next/link";
import Edit from "../icons/editIcon";
import Delete from "../icons/deleteIcon";
import Confirm from "../confirmWidget";
import AudioPlayer from "../mp3Player";

type lyric = {
  id: string;
  lyric_line: string;
};
export type Verse = {
  id: string;
  verse_number: number;
  lyrics: lyric[];
  type: string;
};
export default function SongForm({
  verses,
  title,
  songKey,
  author,
  songId,
  songType,
  audio,
}: {
  verses: Verse[];
  title: string;
  songKey: string;
  author: { username: string; email: string };
  songId: string;
  songType: string;
  audio: string;
}) {
  let versesIds: string[] = verses.map((verse) => {
    return verse.id;
  });
  const [deletingSong, setDeletingSong] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { data, status } = useQuery({
    queryKey: ["verses", versesIds],
    queryFn: async () => {
      const verses = await axios.get(
        `https://songlyrics-omega.vercel.app/api/verse?verses=${versesIds.join(
          ","
        )}`
      );
      return verses.data;
    },
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  const deleteSong = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `https://songlyrics-omega.vercel.app/api/song/${songId}`
      );
      if (response.status === 200) {
        setDeletingSong(false), toast.success("delete success");
        queryClient.invalidateQueries({ queryKey: ["songs"] });
      } else {
        toast.error("error in deleting");
      }
    },
  });
  if (status !== "pending" && data?.length === 0) return;
  const editQuery = {
    songId: songId,
    title: title,
    songKey: songKey,
    versesIds: JSON.stringify(versesIds),
    songType: songType,
  };
  const handleDeleteSong = () => {
    deleteSong.mutate();
    setDeletingSong(true);
  };
  return (
    <div className="pageWarper flex flex-col relative w-fit ">
      <article className="pageWarper  flex justify-center  ">
        <section className="pageWarper text-black overflow-auto relative dark:text-white w-fit xsm:min-w-[370px] sm:min-w-[35vw]  flex flex-col justify-center">
          {status === "success" && user?.email === author.email && (
            <div className=" absolute top-0 left-0 right-0 flex justify-between">
              <Confirm onclick={handleDeleteSong} title={title} />
              <Edit link={"/songs/editSong"} query={editQuery} />
            </div>
          )}
          {status === "pending" ? (
            <SongSkeleton />
          ) : (
            <>
              <h3 className=" xsm:text-lg sm:text-2xl text-center p-1 ">
                {title}
              </h3>
              <h4 className=" text-lg italic text-start p-1 ">
                Add by : {author?.username}
              </h4>
              <h5 className="text-xl p-2">Key:{songKey}</h5>
              {data?.map((verse: Verse, index: number) => (
                <Verse song={verse} key={index} />
              ))}
            </>
          )}
          {audio && <AudioPlayer source={audio} />}
          <h3 className="text-sm text-center">********End********</h3>
        </section>
      </article>
      {deletingSong && (
        <SomethingLoading>
          <h3 className="text-2xl">Deleting...</h3>
        </SomethingLoading>
      )}
    </div>
  );
}

export function NormalSongFrom({
  verses,
  title,
  songKey,
}: {
  verses: Verse[];
  title: string;
  songKey: string;
}) {
  return (
    <main className="flex flex-col relative min-w-[40vw] ">
      <article className=" w-full flex justify-center relative ">
        <section className=" text-black dark:text-white w-fit  flex flex-col justify-center">
          <h3 className=" text-2xl text-center p-1 ">{title}</h3>
          <h5 className="text-xl p-2">Key:{songKey}</h5>
          {verses?.map((verse, index) => (
            <Verse song={verse} key={index} />
          ))}
        </section>
      </article>
    </main>
  );
}
