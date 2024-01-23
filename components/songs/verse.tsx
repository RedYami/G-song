"use client";

import { Verse } from "@/app/types";

type Song = {
  title: string;
  verses: Verse[];
  song_number: number;
  key: string | null;
};
export default function Verse({ song }: { song: Verse }) {
  return (
    <div className="pageWarper flex sm:flex-col md:flex-row items-start justify-start my-2 ">
      <h4 className="px-3">{song.type === "verse" ? `*` : `>>>>`}</h4>
      <div className=" flex flex-col w-fit xsm:text-[15px] sm:text-lg justify-end ">
        {song.lyrics.map((lyric) =>
          lyric.lyricType === "lyric" ? (
            <pre key={lyric.id}>{lyric.lyric_line}</pre>
          ) : (
            <p className=" chorus w-fit " key={lyric.id}>
              {lyric.lyric_line}
            </p>
          )
        )}
      </div>
    </div>
  );
}
