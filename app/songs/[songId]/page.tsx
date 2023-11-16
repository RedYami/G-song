"use client";

import SongSkeleton from "@/components/skeletons/songSkeleton";
import SongForm from "@/components/songs/songForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function SongWithId({ params }: { params: { songId: string } }) {
  const { data, status } = useQuery({
    queryKey: ["song", params.songId],
    queryFn: async () => {
      const song = await axios.get(
        `http://localhost:3000/api/song/${params.songId}`
      );
      return song.data;
    },
  });
  console.log(data);

  return (
    <>
      {status === "pending" && <SongSkeleton />}
      {status === "success" && (
        <SongForm
          songKey={data?.key as string}
          author={data?.author}
          title={data?.title}
          verses={JSON.parse(JSON.stringify(data?.verses))}
        />
      )}
      {status === "error" && <h2>ERRor :)</h2>}
    </>
  );
}
