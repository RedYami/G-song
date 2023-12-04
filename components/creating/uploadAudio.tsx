"use client";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { v4 } from "uuid";
import toast from "react-hot-toast";
import { storage } from "@/app/firebase";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { usePendingSong } from "@/app/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "firebase/auth";
import SomethingLoading from "../loadingSomething";

export default function UploadAudio({
  user,
  onCancel,
}: {
  user: User | null;
  onCancel: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const title = usePendingSong((state) => state.songTitle);
  const key = usePendingSong((state) => state.songKey);
  const songType = usePendingSong((state) => state.songType);
  const verses = usePendingSong((state) => state.songVerses);
  const resetSong = usePendingSong((state) => state.clearSongData);
  const [submiting, setSubmiting] = useState(false);
  const queryClient = useQueryClient();
  const [audio, setAudio] = useState<File | undefined>(undefined);
  const handleUploadMp3 = () => {
    inputRef.current?.click();
  };

  const clearDraft = () => {
    // Clear draft and remove from localStorage
    localStorage.removeItem("verses");
    localStorage.removeItem("songKey");
    localStorage.removeItem("title");
  };
  const createMutation = useMutation({
    mutationFn: async (url: string | null) => {
      if (!songType) {
        throw new Error("please choose song type");
      }
      const response = await axios.post(
        "https://songlyrics-omega.vercel.app/api/song",
        {
          userEmail: user?.email,
          title: title,
          key: key,
          verses: verses,
          songType: songType,
          songAudio: url,
        }
      );
      if (response.status === 200) {
        setSubmiting(false);
        onCancel();
        resetSong();
        clearDraft();
        queryClient.invalidateQueries({ queryKey: ["songs"] });
        return toast.success("creating new song success");
      } else {
        console.log(response.statusText);
      }
    },
    onError: (error: any) => {
      setSubmiting(false);
      toast.error(error.message);
    },
  });
  const uploadFileToFirebase = async (file: File) => {
    const fileName = `${songType}/${file.name + v4()}`;
    const imageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(imageRef, file);
    // set up an event listener to track upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent + "% done");
      },
      (error) => {
        console.log(error);
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          createMutation.mutate(url);
        });
      }
    );
  };

  return (
    <div className="fixed top-0 left-0 backdrop-blur-xl w-full h-full flex flex-col justify-center items-center min-h-[80vh]">
      <h3 className="text-2xl">Select mp3 audio for the song</h3>
      <section className="flex flex-col relative justify-center items-center w-[60vw] h-[50vh] border-2 rounded-md">
        <Button
          onClick={() => handleUploadMp3()}
          className="flex justify-between m-2"
        >
          <h4>choose mp3 audio</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </Button>
        <h3>{audio?.name}</h3>
        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          className=" hidden"
          onChange={(e) => {
            uploadFileToFirebase(e.target?.files?.[0] as File);
            setSubmiting(true);
          }}
        />
        <Button onClick={onCancel} className="absolute bottom-2 left-1 w-fit">
          Cancel
        </Button>
        <Button
          onClick={() => createMutation.mutate(null)}
          className="absolute flex justify-between bottom-2 right-1 w-fit"
        >
          Skip for now
        </Button>
      </section>
      {submiting && (
        <SomethingLoading>
          <h3 className="text-2xl">Creating...</h3>
        </SomethingLoading>
      )}
    </div>
  );
}
