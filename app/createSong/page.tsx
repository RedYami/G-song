import CreateSong from "@/components/songs/create_song";
import { auth } from "../firebase-config";

export default function CreateSongPage() {
  console.log("current user:", auth.currentUser);

  return (
    <main className=" flex xsm:flex-col sm:flex-row justify-center ">
      <CreateSong versess={null} titlee={null} keyy={null} />
    </main>
  );
}
