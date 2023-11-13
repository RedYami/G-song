import Verse from "./verse";

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
export default function SongFrom({
  verses,
  title,
  songKey,
}: {
  verses: Verse[];
  title: string;
  songKey: string;
}) {
  return (
    <main className="flex flex-col relative min-w-[40vw] ">
      <article className=" w-full flex justify-center relative ">
        <section className=" text-black dark:text-white w-fit  flex flex-col justify-center">
          <h3 className=" text-2xl text-center p-1 ">{title}</h3>
          <h5 className="text-xl p-2">Key:{songKey}</h5>
          {verses.map((verse, index) => (
            <Verse song={verse} key={index} />
          ))}
        </section>
      </article>
    </main>
  );
}
