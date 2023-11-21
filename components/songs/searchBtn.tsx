"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import { AvatarDemo } from "../avatar";
import SearchSong from "./searchSong";

export default function SearchButton({
  hideSearch,
}: {
  hideSearch: () => void;
}) {
  return (
    <Button className="" onClick={() => hideSearch()}>
      Search
    </Button>
  );
}

export function SongHeader() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hideSearch, setHideSearch] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });
  });
  return (
    <div>
      <section className="flex justify-between py-2 items-center">
        {currentUser ? (
          <div className="flex justify-center items-center ">
            <h3 className="m-1">{currentUser?.displayName}</h3>
            <AvatarDemo avatarSrc={currentUser?.photoURL as string} />
          </div>
        ) : (
          <h3 className="text-lg ml-2">Guest mode</h3>
        )}
        <SearchButton hideSearch={() => setHideSearch(false)} />
      </section>

      {!hideSearch && <SearchSong hide={() => setHideSearch(true)} />}
    </div>
  );
}
