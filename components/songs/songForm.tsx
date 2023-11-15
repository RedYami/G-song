"use client";
import Verse from "./verse";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SongSkeleton from "../skeletons/songSkeleton";

type lyric = {
  id: string;
  lyric_line: string;
};
type Verse = {
  id: string;
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
export default function SongForm({
  verses,
  title,
  songKey,
  author,
}: {
  verses: Verse[];
  title: string;
  songKey: string;
  author: { username: string; email: string };
}) {
  let versesIds: string[] = verses.map((verse) => {
    return verse.id;
  });
  // const fetchAllVerses = async () => {
  //   const verses = await axios.get(
  //     `http://localhost:3000/api/verse?verses=${versesIds.join(",")}`
  //   );
  //   return verses.data;
  // };
  const { data, status } = useQuery({
    queryKey: ["verses", versesIds],
    queryFn: async () => {
      const verses = await axios.get(
        `http://localhost:3000/api/verse?verses=${versesIds.join(",")}`
      );
      return verses.data;
    },
  });

  return (
    <main className="flex flex-col relative w-full ">
      <article className="  flex justify-center relative ">
        <section className=" text-black dark:text-white w-fit min-w-[35vw]  flex flex-col justify-center">
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
          <h3 className="text-xl text-center">*********</h3>
        </section>
      </article>
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
