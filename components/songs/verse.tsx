type lyric = {
  id: number;
  text: string;
};
type Verse = {
  verse_number: number;
  lyrics: lyric[];
  type: string;
};
type Song = {
  title: string;
  verses: Verse[];
  song_number: number;
  key: string | null;
};
export default function Verse({ song }: { song: Verse }) {
  return (
    <div className=" flex sm:flex-col md:flex-row items-start justify-start my-2 ">
      <h4 className="px-3">{song.type === "verse" ? `*` : `Chorus:`}</h4>
      <div className=" flex flex-col w-fit text-lg justify-end ">
        {song.lyrics.map((lyric) => (
          <pre className=" chorus w-fit " key={lyric.id}>
            {lyric.text}
          </pre>
        ))}
      </div>
    </div>
  );
}
