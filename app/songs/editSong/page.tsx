"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Verse } from "@/app/types";
import { useEffect, useState } from "react";
import SomethingLoading from "@/components/loadingSomething";
import toast from "react-hot-toast";
import { SelectSongType } from "@/components/songTypeSelect";

export default function EditSong() {
  const searchParams = useSearchParams();
  const songId = searchParams.get("songId") as string;
  const versesIds = JSON.parse(searchParams.get("versesIds") as string);
  const songTitle = searchParams.get("title") as string;
  const songKey = searchParams.get("songKey") as string;
  const song_type = searchParams.get("songType") as string;
  const [verses, setVerses] = useState<Verse[] | []>([]);
  const [saving, setSaving] = useState(false);
  const [songType, setSongType] = useState(song_type || "");
  const [title, setTitle] = useState(songTitle || "");
  const [key, setKey] = useState(songKey || "");
  const queryClient = useQueryClient();
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
    if (data) {
      setVerses(data);
    }
  }, [data]);
  const handleUpdateLyric = (
    verseId: string,
    lyricId: string,
    newLyric: string
  ) => {
    setVerses((verses) =>
      verses.map((verse) => {
        if (verse.id === verseId) {
          return {
            ...verse,
            lyrics: verse.lyrics.map((lyric) => {
              if (lyric.id === lyricId) {
                return {
                  ...lyric,
                  lyric_line: newLyric,
                };
              }
              return lyric;
            }),
          };
        }
        return verse;
      })
    );
  };
  const updateVerses = useMutation({
    mutationFn: async () => {
      const res = await axios.put("http://localhost:3000/api/verse", {
        verses: verses,
        title: title,
        key: key,
        songId: songId,
        songType: songType,
      });
      if (res.status === 200) {
        setSaving(false);
        queryClient.invalidateQueries({ queryKey: ["songs"] });
        toast.success("saved successfully!!");
      }
    },
    onError: (error: any) => toast.error(error.message),
  });
  return (
    <article className=" w-[100vw] h-fit flex justify-center ">
      <section className="p-3 xsm:text-sm sm:text-xl xsm:w-[97vw] border h-[90vh] sm:w-[60vw] overflow-auto flex flex-col justify-start rounded-lg ">
        <div className="flex justify-between">
          <Button
            onClick={() => {
              updateVerses.mutate();
              setSaving(true);
            }}
          >
            save changes
          </Button>
        </div>
        {status === "pending" && (
          <h3 className="text-2xl text-center">Loading...</h3>
        )}
        {status === "error" && (
          <h3 className="text-2xl text-center">Error :(</h3>
        )}
        <label>Title</label>
        <input
          className="text-xl text-center outline-none w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Key</label>
        <input
          className="text-lg text-start outline-none w-full my-2"
          onChange={(e) => setKey(e.target.value)}
          value={key}
        />
        <SelectSongType setSongType={setSongType} songType={songType} />
        {verses?.map((verse: Verse) => (
          <div className="flex flex-col" key={verse.id}>
            <h3 className="text-2xl text-center">
              {verse.type === "verse" ? "verse" : "chorus"}
            </h3>
            {verse.lyrics.map((lyric) => (
              <input
                key={lyric.id}
                value={lyric.lyric_line}
                onChange={(e) =>
                  handleUpdateLyric(verse.id, lyric.id, e.target.value)
                }
                required
                className="xsm:min-w-[100px] sm:min-w-[280px] mr-2 p-1 border-b-2 border-black dark:border-white  outline-none bg-white dark:bg-black"
              />
            ))}
          </div>
        ))}
      </section>
      {saving && (
        <SomethingLoading>
          <h3 className="text-2xl text-center">Saving...</h3>
        </SomethingLoading>
      )}
    </article>
  );
}
