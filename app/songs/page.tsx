import { CustomLink } from "@/components/customLink";
import LoadingUI from "@/components/loadingProgress";
import { SelectSongCatagory } from "@/components/songCatagory";
import { SongHeader } from "@/components/songs/searchBtn";
import Song from "@/components/songs/songContainer";

// import SongContainer, { Song } from "@/components/songContainer";

export default function CSong() {
  return (
    <>
      <LoadingUI />
      <main className="p-3">
        <SongHeader />
        <SelectSongCatagory />
        <Song />
      </main>
    </>
  );
}
