"use client";
import Verse from "./verse";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import SongSkeleton from "../skeletons/songSkeleton";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import SomethingLoading from "../loadingSomething";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import Link from "next/link";

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
}: {
  verses: Verse[];
  title: string;
  songKey: string;
  author: { username: string; email: string };
  songId: string;
  songType: string;
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
        `http://localhost:3000/api/verse?verses=${versesIds.join(",")}`
      );
      return verses.data;
    },
  });
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  const deleteSong = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `http://localhost:3000/api/song/${songId}`
      );
      if (response.status === 200) {
        setDeletingSong(false), toast.success("delete success");
      } else {
        toast.error("error in deleting");
      }
    },
  });
  if (status !== "pending" && data?.length === 0) return;

  return (
    <main className="flex flex-col relative w-full ">
      <article className="  flex justify-center  ">
        <section className=" text-black relative dark:text-white w-fit min-w-[35vw]  flex flex-col justify-center">
          {user?.email === author.email && (
            <div className="flex justify-between">
              <Button
                onClick={() => {
                  deleteSong.mutate();
                  setDeletingSong(true);
                }}
                className="hover:bg-red-500 "
              >
                delete
              </Button>
              <Button className="hover:bg-green-500 ">
                <Link
                  href={{
                    pathname: "/songs/editSong",
                    query: {
                      songId: songId,
                      title: title,
                      songKey: songKey,
                      versesIds: JSON.stringify(versesIds),
                      songType: songType,
                    },
                  }}
                >
                  Edit
                </Link>
              </Button>
            </div>
          )}
          {status === "pending" ? (
            <SongSkeleton />
          ) : (
            <>
              <h3 className=" text-2xl text-center p-1 ">{title}</h3>
              <h4 className=" text-lg italic text-start p-1 ">
                Add by : {author?.username}
              </h4>
              <h5 className="text-xl p-2">Key:{songKey}</h5>
              {data?.map((verse: Verse, index: number) => (
                <Verse song={verse} key={index} />
              ))}
            </>
          )}
          <h3 className="text-sm text-center">********End********</h3>
        </section>
      </article>
      {deletingSong && (
        <SomethingLoading>
          <h3 className="text-2xl">Deleting...</h3>
        </SomethingLoading>
      )}
    </main>
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
