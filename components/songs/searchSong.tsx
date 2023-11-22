import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import SearchByDropdown from "../searchDropdown";
import SomethingLoading from "../loadingSomething";

export default function SearchSong({ hide }: { hide: () => void }) {
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchSongs, setSearchSongs] = useState<any>([]);
  const [searchBy, setSearchBy] = useState("lyric");
  const [searchResults, setSearchResults] = useState<number | null>(null);

  async function getSearchSong() {
    if (!searchText) {
      setSearching(false);
      return toast("📢 please enter texts to search");
    }
    if (searchBy === "lyric") {
      const searchSongs = await fetch(
        `https://songlyrics-omega.vercel.app/api/lyric?searchText=${searchText}`
      );
      if (searchSongs.ok) {
        setSearchSongs(await searchSongs.json());
        setSearching(false);
      }
    }
    if (searchBy === "title") {
      const searchSongs = await fetch(
        `https://songlyrics-omega.vercel.app/api/song/search?searchText=${searchText}`
      );
      if (searchSongs.ok) {
        setSearchSongs(await searchSongs.json());
        setSearching(false);
      }
    }
  }

  return (
    <article
      onClick={(e) => {
        e.stopPropagation();
        hide();
      }}
      className="fixed top-0 right-0 z-50 w-full h-full backdrop-blur-sm flex justify-center items-center"
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col rounded-lg border-2 border-black dark:border-white justify-start xsm:w-[90vw] sm:w-[50vw] min-h-[50vh] items-start"
      >
        <div className="flex w-full justify-start m-2 items-center">
          <h5>Search by:</h5>
          <SearchByDropdown select={setSearchBy} currentType={searchBy} />
        </div>
        <div className="flex w-full p-2">
          <Input
            onClick={(e) => e.stopPropagation()}
            value={searchText}
            className="mx-2"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setSearching(true);
              getSearchSong();
            }}
          >
            Search
          </Button>
        </div>
        <ul className="w-full flex flex-col justify-center max-h-[60vh] overflow-auto">
          {searchSongs?.length === 0 && (
            <h4 className="px-2">search result: 0</h4>
          )}
          {searchSongs && searchSongs.length !== 0 && (
            <>
              <h4 className="px-2">search result: {searchSongs.length}</h4>
              {searchSongs?.map((item: any) =>
                searchBy === "lyric" ? (
                  <Link
                    key={item.id}
                    href={`songs/${item?.parent_verse?.songId}`}
                    className=" italic text-lg font-bold p-2 m-2 rounded-md border-2"
                  >
                    {item.lyric_line}
                  </Link>
                ) : (
                  <Link
                    key={item.id}
                    href={`songs/${item?.id}`}
                    className="text-2xl font-bold p-2 m-2 rounded-md border-2"
                  >
                    {item.title}
                  </Link>
                )
              )}
            </>
          )}
        </ul>
      </section>
      {searching && (
        <SomethingLoading>
          <h3 className="text-2xl">Searching</h3>
        </SomethingLoading>
      )}
    </article>
  );
}
