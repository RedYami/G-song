import { useSongs } from "@/app/store";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SongFrom from "./songForm";
import { v4 } from "uuid";

type lyric = {
  id: string;
  text: string;
};
type Verse = {
  id: string;
  verse_number: number;
  lyrics: lyric[];
  type: string;
};
type Song = {
  tile: string;
  verses: Verse[];
  song_number: number;
  key: string | null;
};

export default function CreateSong({
  hideCreating,
}: {
  hideCreating: () => void;
}) {
  const allSongs = useSongs((state) => state.songs);
  const addNewSong = useSongs((state) => state.addNewSong);
  const [title, setTitle] = useState("");
  const [chorus, setChorus] = useState(false);
  const [hidedVerses, setHidedVerses] = useState<string[]>(["1"]);
  const [key, setKey] = useState("");
  const [verses, setVerses] = useState([
    {
      id: "2k3",
      verse_number: 1,
      type: "verse",
      lyrics: [
        {
          id: 0,
          text: "",
        },
      ],
    },
  ]);
  console.log("new verse:", verses.length);
  //adding new verse
  const handleAddNewVerse = () => {
    setVerses([
      ...verses,
      {
        id: v4(),
        verse_number: verses.length + 1,
        type: "verse",
        lyrics: [
          {
            id: 0,
            text: "",
          },
        ],
      },
    ]);
  };
  //add lyric or remove
  const handlingChorus = () => {
    if (!chorus) {
      setVerses([
        ...verses,
        {
          id: v4(),
          verse_number: verses.length + 1,
          type: "chorus",
          lyrics: [
            {
              id: 0,
              text: "",
            },
          ],
        },
      ]);
    } else {
      setVerses((verses) => verses.filter((verse) => verse.type !== "chorus"));
    }
    setChorus(!chorus);
  };
  //add new lyric line
  const handleAddNewLyricLine = (verseNumber: number) => {
    setVerses((verses) =>
      verses.map((verse) => {
        if (verse.verse_number === verseNumber) {
          return {
            ...verse,
            lyrics: [
              ...verse.lyrics,
              {
                id: verse.lyrics.length + 1,
                text: "",
              },
            ],
          };
        }
        return verse;
      })
    );
  };
  //update lyric by verse id and its id
  const handleUpdateLyric = (
    verseId: string,
    lyricId: number,
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
                  text: newLyric,
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
  //delete verse by its id
  const deleteVerse = (verseId: string) => {
    setVerses((verses) => verses.filter((verse) => verse.id !== verseId));
    setHidedVerses(hidedVerses.filter((verse) => verse !== verseId));
  };
  // delete lyric by its lyricId
  const deleteLyricLine = (lyricId: number, verseNumber: number) => {
    setVerses((verses) =>
      verses.map((verse) => {
        if (verse.verse_number === verseNumber) {
          return {
            ...verse,
            lyrics: verse.lyrics.filter((lyric) => lyric.id !== lyricId),
          };
        }
        return verse;
      })
    );
  };
  //clearing all song data
  const clearSongData = () => {
    setVerses([]);
    setTitle("");
    setKey("");
    setHidedVerses(["1"]);
    setChorus(false);
  };
  //submit new song
  const handleCreateNewSong = () => {
    addNewSong({
      title: title,
      verses: verses,
      song_number: allSongs.length + 1,
      key: key,
    });
    hideCreating();
    clearSongData();
  };
  //toogling song verses hide or show
  const showOrHideVerse = (verseId: string) => {
    if (hidedVerses.includes(verseId)) {
      setHidedVerses(hidedVerses.filter((verse) => verse != verseId));
    } else {
      setHidedVerses((hidedVerse) => [...hidedVerse, verseId]);
    }
  };
  return (
    <>
      <section className=" flex justify-center flex-col text-black dark:text-white xsm:w-[100vw] sm:w-[60vw]xsm:border-b-4 sm:border-r-4 dark:border-white border-black to-blue-500 h-full ">
        <div className="flex justify-start ">
          <Button
            type="button"
            className=" m-2"
            onClick={(e) => {
              e.stopPropagation();
              handleAddNewVerse();
            }}
          >
            add verse
          </Button>
          <Button
            type="button"
            className=" m-2"
            onClick={(e) => {
              e.stopPropagation();
              handlingChorus();
            }}
          >
            {chorus ? "remove chorus" : "add chorus"}
          </Button>
        </div>
        <form
          className=" min-h-[90vh] "
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateNewSong();
          }}
        >
          <div className="flex justify-center items-center">
            <label className="text-center ">Title</label>
            <Input
              required
              type="text"
              className=" max-w-[200px] mx-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="text-center ">Key</label>
            <Input
              required
              type="text"
              className=" max-w-[90px] mx-2"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div className=" flex justify-center flex-wrap items-start p-1 ">
            {verses.map((verse) => (
              <div
                className=" flex flex-col justify-center rounded-lg min-w-[300px] items-center m-1 border-2"
                key={verse.verse_number}
              >
                <div className=" verse flex w-full justify-between p-1 items-center">
                  <h3 className=" mx-2">
                    {verse.type === "verse" ? `verse` : verse.type}
                  </h3>
                  <Button
                    className="hover:bg-red-500 mx-2"
                    type="button"
                    onClick={() => showOrHideVerse(verse.id)}
                  >
                    toogle
                  </Button>
                  <Button
                    className="hover:bg-red-500 mx-2"
                    type="button"
                    onClick={() => deleteVerse(verse.id)}
                  >
                    X
                  </Button>
                </div>
                <div
                  className={
                    " flex flex-col justify-center items-center p-1 w-full bg-slate-500 rounded-b-lg" +
                    (hidedVerses.includes(verse.id) && " hidden")
                  }
                >
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddNewLyricLine(verse.verse_number);
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
                        className="xsm:min-w-[100px] sm:min-w-[280px] mr-2 p-1 border-b-2 border-slate-700 bg-none outline-none bg-slate-500"
                        value={lyric.text}
                        onChange={(e) => {
                          handleUpdateLyric(verse.id, lyric.id, e.target.value);
                        }}
                      />
                      <Button
                        onClick={() =>
                          deleteLyricLine(lyric.id, verse.verse_number)
                        }
                        className=" bg-red-500 text-white hover:bg-red-700"
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button
            className=" bg-green-400 m-2 hover:bg-green-600 hover:text-white"
            type="submit"
          >
            Create
          </Button>
        </form>
      </section>
      <section className="flex flex-col">
        <h3 className="text-center xsm:text-lg sm:text-2xl p-2">Preview</h3>
        <SongFrom verses={verses} title={title} songKey={key} />
      </section>
    </>
  );
}
