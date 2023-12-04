"use client";

import BackButton from "@/components/icons/backIcon";
import LoadingUI from "@/components/loadingProgress";
import SongSkeleton from "@/components/skeletons/songSkeleton";
import SongForm from "@/components/songs/songForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function SongWithId({ params }: { params: { songId: string } }) {
  const { data, status } = useQuery({
    queryKey: ["song", params.songId],
    queryFn: async () => {
      const song = await axios.get(
        `https://songlyrics-omega.vercel.app/api/song/${params.songId}`
      );
      return song.data;
    },
  });

  return (
    <main className="flex flex-col justify-center items-center">
      <BackButton />

      {status === "pending" && <SongSkeleton />}
      {status === "success" && (
        <SongForm
          songId={params.songId}
          songKey={data?.key as string}
          author={data?.author}
          title={data?.title}
          verses={JSON.parse(JSON.stringify(data?.verses))}
          songType={data?.songType}
          audio={data?.audio}
        />
      )}
      {status === "error" && <h2>ERRor :)</h2>}
    </main>
  );
}
