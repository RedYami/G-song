import CreateSong from "@/components/creating/create_song";
import LoadingUI from "@/components/loadingProgress";

export default function CreateSongPage() {
  return (
    <>
      <main className=" flex xsm:flex-col sm:flex-row justify-center ">
        <CreateSong />
      </main>
    </>
  );
}
