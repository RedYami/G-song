"use client";
import { useState } from "react";
import { Button } from "../ui/button";

export default function InsertLyrics({
  hide,
  onsave,
}: {
  hide: () => void;
  onsave: (lyrics: string) => void;
}) {
  const [lyrics, setlyrics] = useState("");
  return (
    <div className="flex flex-col justify-center backdrop-blur-lg items-center z-50 fixed top-0 left-0 w-full h-full">
      <form onSubmit={() => onsave(lyrics)}>
        <textarea
          required
          value={lyrics}
          autoFocus
          placeholder="comment"
          onChange={(e) => {
            setlyrics(e.target.value);
            e.target.style.height = "auto"; // Reset the height to auto
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          style={{
            resize: "none",
            height: "auto",
          }}
          className=" border min-w-[50vw] rounded-lg flex overflow-y-hidden flex-start ml-2 mr-2 text-lg p-2 font-bold outline-none bg-none"
        />
        <section className="flex justify-between p-1 items-center">
          <Button onClick={hide} type="button">
            cancel
          </Button>
          <Button type="submit">save</Button>
        </section>
      </form>
    </div>
  );
}
