import { usePendingSong } from "@/app/store";
import { Input } from "../ui/input";
import { SelectSongType } from "../songTypeSelect";

export default function SongHeaders() {
  const title = usePendingSong((state) => state.songTitle);
  const setTitle = usePendingSong((state) => state.setSongTitle);
  const key = usePendingSong((state) => state.songKey);
  const setKey = usePendingSong((state) => state.setsongKey);
  const songType = usePendingSong((state) => state.songType);
  const setSongType = usePendingSong((state) => state.setsongType);

  return (
    <div className="flex xsm:flex-col sm:flex-row justify-center items-center">
      <SelectSongType setSongType={setSongType} songType={songType} />
      <label className="text-center ml-2 ">Title</label>
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
  );
}
