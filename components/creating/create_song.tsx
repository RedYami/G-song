"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { NormalSongFrom } from "../songs/songForm";
import { v4 } from "uuid";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import { usePendingSong } from "@/app/store";
import UploadAudio from "./uploadAudio";
import InsertLyrics from "./insertLyric";
import SongHeaders from "./songHeaders";
import VerseCreator from "./verseCreator";
import { SeparatorHorizontal } from "lucide-react";
import { Separator } from "../ui/separator";
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
  const verses = usePendingSong((state) => state.songVerses);
  const setVerse = usePendingSong((state) => state.setVerse);
  const addVerse = usePendingSong((state) => state.addNewVerse);
  const updateVerse = usePendingSong((state) => state.updateVerse);
  const resetSongData = usePendingSong((state) => state.clearSongData);
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
      lyricType: "lyric",
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
    resetSongData();
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
            className=" m-2 xsm:text-sm sm:text-lg"
            onClick={(e) => {
              e.stopPropagation();
              addVerse();
            }}
          >
            add verse +
          </Button>
        </div>
        <form
          className=" min-h-[90vh] "
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateNewSong();
          }}
        >
          <SongHeaders />
          <Separator orientation="horizontal" className="w-full my-2" />
          <div className=" flex justify-center flex-wrap items-start p-1 ">
            {verses?.map((verse) => (
              <VerseCreator
                hidedVerses={hidedVerses}
                toogleShowHide={showOrHideVerse}
                setCurrentVerse={setCurrentVerseId}
                updatingManyVerse={() => setUpdatingManyVerse(true)}
                verse={verse}
              />
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
