import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SearchSong({ hide }: { hide: () => void }) {
  const [searchText, setSearchText] = useState("");
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
        className="flex flex-col rounded-lg border-2 border-white justify-start w-[50vw] min-h-[50vh] items-start"
      >
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
            }}
          >
            Search
          </Button>
        </div>
        <div className=""></div>
      </section>
    </article>
  );
}
