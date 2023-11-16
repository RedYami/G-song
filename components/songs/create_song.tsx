"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { NormalSongFrom } from "./songForm";
import { v4 } from "uuid";
import axios from "axios";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import SomethingLoading from "../loadingSomething";

export default function CreateSong() {
  const [title, setTitle] = useState("");
  const [chorus, setChorus] = useState(false);
  const [hidedVerses, setHidedVerses] = useState<string[]>(["1"]);
  const [key, setKey] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [submiting, setSubmiting] = useState(false);
  const [verses, setVerses] = useState([
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
  ]);
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
    // Load draft from localStorage on component mount
    const savedVerses = localStorage.getItem("verses");
    const savedKey = localStorage.getItem("songKey");
    const savedTitle = localStorage.getItem("title");

    if (savedVerses) {
      //   setVerses((savedVerses as any) || defaultVerses);
      setTitle(savedTitle || "");
      setKey(savedKey || "");
      setVerses(JSON.parse(savedVerses as any) || defaultVerses);
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
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
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
            id: v4(),
            lyric_line: "",
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
              id: "0",
              lyric_line: "",
            },
          ],
        },
      ]);
    } else {
      setVerses((verses) => verses.filter((verse) => verse.type !== "chorus"));
    }
    setChorus(!chorus);
  };
  // update verse type chorus or normal verse
  const handlingVerseType = (id: string) => {
    setVerses(
      verses.map((verse) => {
        if (verse.id === id) {
          return {
            ...verse,
            type: verse.type === "verse" ? "chorus" : "verse",
          };
        }
        return verse;
      })
    );
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
                id: v4(),
                lyric_line: "",
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
  //delete verse by its id
  const deleteVerse = (verseId: string) => {
    setVerses((verses) => verses.filter((verse) => verse.id !== verseId));
    setHidedVerses(hidedVerses.filter((verse) => verse !== verseId));
  };
  // delete lyric by its lyricId
  const deleteLyricLine = (lyricId: string, verseNumber: number) => {
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
    setVerses(defaultVerses);
    setTitle("");
    setKey("");
    setHidedVerses(["1"]);
    setChorus(false);
  };
  //submit new song
  const createNewSong = async () => {
    const response = await axios.post("http://localhost:3000/api/song", {
      userEmail: user?.email,
      title: title,
      key: key,
      verses: verses,
    });
    if (response.status === 200) {
      toast.success("creating new song success");
      setSubmiting(false);
      clearSongData();
      clearDraft();
    } else {
      toast.error("oops something went wrong check log");
    }
  };
  const createMutation = useMutation({
    mutationFn: createNewSong,
  });

  const handleCreateNewSong = async () => {
    setSubmiting(true);
    createMutation.mutate();
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
      <section className=" flex justify-center flex-col text-black dark:text-white xsm:w-[100vw] sm:w-[60vw] xsm:border-b-4 sm:border-r-4 dark:border-white border-black to-blue-500 h-full ">
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
            {verses?.map((verse) => (
              <div
                className=" flex flex-col justify-center rounded-lg min-w-[300px] items-center m-1 border-2"
                key={verse.verse_number}
              >
                <div className=" verse flex w-full justify-between p-1 items-center">
                  <Button
                    className=" mx-2"
                    type="button"
                    onClick={() => handlingVerseType(verse.id)}
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
                        className="xsm:min-w-[100px] sm:min-w-[280px] mr-2 p-1 border-b-2 border-black dark:border-white  outline-none bg-white dark:bg-black"
                        value={lyric.lyric_line}
                        onChange={(e) => {
                          handleUpdateLyric(verse.id, lyric.id, e.target.value);
                        }}
                      />
                      {verse.lyrics.length > 1 && (
                        <Button
                          onClick={() =>
                            deleteLyricLine(lyric.id, verse.verse_number)
                          }
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
        <SomethingLoading>
          <h3 className="text-2xl">Creating...</h3>
        </SomethingLoading>
      )}
    </>
  );
}
