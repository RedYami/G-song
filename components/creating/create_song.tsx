"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { NormalSongFrom } from "../songs/songForm";
import { v4 } from "uuid";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import toast from "react-hot-toast";
import { SelectSongType } from "../songTypeSelect";
import { usePendingSong } from "@/app/store";
import UploadAudio from "./uploadAudio";
import InsertLyrics from "./insertLyric";
let defaultVerses = [
  {
    id: "2k3",
    verse_number: 1,
    type: "verse",
    lyrics: [
      {
        id: "0",
        lyric_line: "",
      },
    ],
  },
];

type creatingProps = {
  versess: typeof defaultVerses | null;
  titlee: string | null;
  keyy: string | null;
};

export default function CreateSong({ versess, titlee, keyy }: creatingProps) {
  const title = usePendingSong((state) => state.songTitle);
  const setTitle = usePendingSong((state) => state.setSongTitle);
  const key = usePendingSong((state) => state.songKey);
  const setKey = usePendingSong((state) => state.setsongKey);
  const songType = usePendingSong((state) => state.songType);
  const setSongType = usePendingSong((state) => state.setsongType);
  const verses = usePendingSong((state) => state.songVerses);
  const setVerse = usePendingSong((state) => state.setVerse);
  const updateVerseType = usePendingSong((state) => state.changeVerseType);
  const deleteVerse = usePendingSong((state) => state.deleteVerse);
  const addVerse = usePendingSong((state) => state.addNewVerse);
  const addNewLyricLine = usePendingSong((state) => state.addNewLyricLine);
  const updateLyricLine = usePendingSong((state) => state.updateLyricLine);
  const deleteLyricLine = usePendingSong((state) => state.deleteLyricLine);
  const updateVerse = usePendingSong((state) => state.updateVerse);
  const [hidedVerses, setHidedVerses] = useState<string[]>(["1"]);
  const [user, setUser] = useState<User | null>(null);
  const [submiting, setSubmiting] = useState(false);
  const [updatingManyVerse, setUpdatingManyVerse] = useState(false);
  const [currentVerseId, setCurrentVerseId] = useState("");
  function convertLyricsToObjects(lyricsText: string) {
    // Split the lyrics into lines
    const lines = lyricsText.split("\n");

    // Convert the lines into lyric objects with IDs
    const lyricObjects = lines.map((line, index) => ({
      id: `line-${index + 1}` + v4(), // Generating unique IDs for each line
      lyric_line: line.trim(), // Storing the trimmed lyric line
    }));
    console.log("converted lyrics objs", lyricObjects);

    updateVerse(currentVerseId, lyricObjects);
  }
  const handleChangeManyVerse = (lyricsString: string) => {
    setUpdatingManyVerse(false);
    convertLyricsToObjects(lyricsString);
  };
  const defaultVerses = [
    {
      id: "2k3",
      verse_number: 1,
      type: "verse",
      lyrics: [
        {
          id: "0",
          lyric_line: "",
        },
      ],
    },
  ];
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  useEffect(() => {
    // Load draft from localStorage on component mount
    const savedVerses = localStorage.getItem("verses");
    const savedKey = localStorage.getItem("songKey");
    const savedTitle = localStorage.getItem("title");

    if (savedVerses) {
      //   setVerses((savedVerses as any) || defaultVerses);
      setTitle(savedTitle || "");
      setKey(savedKey || "");
      setVerse(JSON.parse(savedVerses as any) || defaultVerses);
    }
  }, []);

  useEffect(() => {
    // Save draft to localStorage on every input change
    if (
      verses?.[0].lyrics[0].lyric_line !== "" &&
      verses?.[0].lyrics.length > 1
    ) {
      localStorage.setItem("verses", JSON.stringify(verses));
    }
    if (key !== "" || title !== "") {
      localStorage.setItem("songKey", key);
      localStorage.setItem("title", title);
    }
  }, [verses, key, title]);

  const clearDraft = () => {
    // Clear draft and remove from localStorage
    localStorage.removeItem("verses");
    localStorage.removeItem("songKey");
    localStorage.removeItem("title");
  };
  //submit new song

  const handleCreateNewSong = async () => {
    setSubmiting(true);
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
      <section className=" flex justify-center flex-col text-black dark:text-white xsm:w-[100vw] sm:w-[60vw] xsm:border-b-4 sm:border-b-0 sm:border-r-4 dark:border-white border-black to-blue-500 h-full ">
        <div className="flex justify-start ">
          <Button
            type="button"
            className=" m-2"
            onClick={(e) => {
              e.stopPropagation();
              addVerse();
            }}
          >
            add verse
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
            <SelectSongType setSongType={setSongType} songType={songType} />
          </div>
          <div className=" flex justify-center flex-wrap items-start p-1 ">
            {verses?.map((verse) => (
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
                    onClick={() => showOrHideVerse(verse.id)}
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
                      setUpdatingManyVerse(true);
                      setCurrentVerseId(verse.id);
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
                        className="xsm:min-w-[100px] sm:min-w-[280px] mr-2 p-1 border-b-2 border-black dark:border-white  outline-none bg-white dark:bg-black"
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
            ))}
          </div>
          <Button
            className=" bg-green-400 m-2 hover:bg-green-600 hover:text-white"
            type="submit"
          >
            Create
          </Button>
          <Button
            className=" bg-red-400 m-2 hover:bg-red-600 text-white"
            onClick={() => clearDraft()}
            type="button"
          >
            Clear draft
          </Button>
        </form>
      </section>
      <section className="flex flex-col">
        <h3 className="text-center xsm:text-lg sm:text-2xl p-2">Preview</h3>
        <NormalSongFrom verses={verses} title={title} songKey={key} />
      </section>
      {submiting && (
        <UploadAudio user={user} onCancel={() => setSubmiting(false)} />
      )}
      {updatingManyVerse && (
        <InsertLyrics
          hide={() => setUpdatingManyVerse(false)}
          onsave={handleChangeManyVerse}
        />
      )}
    </>
  );
}
