import { SelectSongCatagory } from "@/components/songCatagory";
import Song from "@/components/songs/songContainer";

// import SongContainer, { Song } from "@/components/songContainer";

export default function CSong() {
  return (
    <main className="p-3">
      <SelectSongCatagory />
      <Song />
    </main>
  );
}
