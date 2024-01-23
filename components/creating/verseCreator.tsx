import { usePendingSong } from "@/app/store";
import { Button } from "../ui/button";
import { useState } from "react";
import { Verse } from "@/app/types";

type VerseCreator = {
  toogleShowHide: (verseId: string) => void;
  setCurrentVerse: (verseId: string) => void;
  updatingManyVerse: () => void;
  verse: Verse;
  hidedVerses: string[];
};

export default function VerseCreator({
  verse,
  toogleShowHide,
  updatingManyVerse,
  setCurrentVerse,
  hidedVerses,
}: VerseCreator) {
  const verses = usePendingSong((state) => state.songVerses);
  const updateVerseType = usePendingSong((state) => state.changeVerseType);
  const deleteVerse = usePendingSong((state) => state.deleteVerse);
  const addNewLyricLine = usePendingSong((state) => state.addNewLyricLine);
  const updateLyricLine = usePendingSong((state) => state.updateLyricLine);
  const deleteLyricLine = usePendingSong((state) => state.deleteLyricLine);

  return (
    <div
      className=" flex flex-col justify-center rounded-lg min-w-[300px] items-center m-1 border-2"
      key={verse.verse_number}
    >
      <div className=" verse flex w-full justify-between p-1 items-center">
        <Button
          className=" mx-2"
          type="button"
          onClick={() => updateVerseType(verse.id)}
        >
          {verse.type === "verse" ? `verse` : verse.type}
        </Button>
        <Button
          className="hover:bg-red-500 mx-2"
          type="button"
          onClick={() => toogleShowHide(verse.id)}
        >
          toogle
        </Button>
        {verses.length > 1 && (
          <Button
            className="hover:bg-red-500 mx-2"
            type="button"
            onClick={() => deleteVerse(verse.id)}
          >
            X
          </Button>
        )}
      </div>
      <div
        className={
          " flex flex-col justify-start p-1 w-full rounded-b-lg" +
          (hidedVerses.includes(verse.id) && " hidden")
        }
      >
        <Button
          className=""
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            updatingManyVerse();
            setCurrentVerse(verse.id);
            /////
          }}
        >
          create many
        </Button>
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addNewLyricLine(verse.id);
          }}
          className=" m-1"
        >
          new line +
        </Button>
        {verse.lyrics.map((lyric) => (
          <div
            key={lyric.id}
            className=" flex justify-between items-center p-1 "
          >
            <input
              required
              className="w-full mr-2 p-1 border-b-2 border-black dark:border-white  outline-none bg-white dark:bg-black"
              value={lyric.lyric_line}
              onChange={(e) => {
                updateLyricLine(verse.id, lyric.id, e.target.value);
              }}
            />
            {verse.lyrics.length > 1 && (
              <Button
                onClick={() => deleteLyricLine(verse.id, lyric.id)}
                type="button"
                className=" bg-red-500 text-white hover:bg-red-700"
              >
                X
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
