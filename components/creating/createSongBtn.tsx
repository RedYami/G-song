"use client";

import { useIsCreating } from "@/app/store";
import { Button } from "../ui/button";

export default function CreateSongButton() {
  const setIsCreatingSong = useIsCreating((state) => state.setIsCreating);
  return (
    <Button
      onClick={(e) => {
        setIsCreatingSong();
      }}
    >
      Create song
    </Button>
  );
}
