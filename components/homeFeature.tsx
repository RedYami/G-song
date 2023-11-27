import Image from "next/image";
import Link from "next/link";
export default function HomeFeatures() {
  return (
    <main className="flex p-3 flex-col justify-center items-center border-2 ">
      <section className="flex xsm:flex-col sm:flex-row justify-center sm:w-[80vw] min-h-[40vh] border-2 rounded-lg">
        <div className=" relative min-w-[40vw] min-h-[35vh] max-h-[40vh]">
          <Image
            priority
            src={
              "https://firebasestorage.googleapis.com/v0/b/g-songs.appspot.com/o/music-pics%2Freal%20band.jpg?alt=media&token=ed301f67-3d80-4947-92b6-4f070301fdb2"
            }
            fill
            className=" object-cover rounded-l-lg"
            alt="band"
          />
        </div>
        <div className="flex flex-col justify-start p-2 relative">
          <h2 className="text-2xl z-20 font-bold">Upload your song</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, sequi
            id voluptatem ipsam temporibus eligendi soluta accusantium ullam
            tempora quas, et, numquam repellendus quidem? Nemo explicabo iure
            beatae quibusdam in.
          </p>
          <Link
            className=" italic absolute bottom-2 right-2"
            href={"/createSong"}
          >
            Create Now
          </Link>
        </div>
      </section>
      <section className="flex m-2 xsm:flex-col sm:flex-row justify-center sm:w-[80vw] min-h-[40vh] border-2 rounded-lg">
        <div className=" relative min-w-[40vw] min-h-[50vh]">
          <Image
            priority
            src={
              "https://firebasestorage.googleapis.com/v0/b/g-songs.appspot.com/o/music-pics%2FgirlHeadphone.jpg?alt=media&token=85a09ad9-1b5c-43b3-a060-bb8092767921"
            }
            fill
            className=" object-cover rounded-l-lg bg-center"
            alt="band"
          />
        </div>
        <div className="flex flex-col justify-start p-2 relative">
          <h2 className="text-2xl z-20 font-bold">
            Listen mp3 music with lyrics
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, sequi
            id voluptatem ipsam temporibus eligendi soluta accusantium ullam
            tempora quas, et, numquam repellendus quidem? Nemo explicabo iure
            beatae quibusdam in.
          </p>
          <Link className=" italic absolute bottom-2 right-2" href={"/songs"}>
            Go listen now
          </Link>
        </div>
      </section>
      <section className="flex justify-center sm:flex-row xsm:flex-col rounded-md w-fit">
        <Image
          priority
          width={300}
          height={200}
          alt="type"
          className="rounded-lg mx-1"
          src={
            "https://firebasestorage.googleapis.com/v0/b/g-songs.appspot.com/o/music-pics%2Fa7x.jpg?alt=media&token=24d191a6-a332-4a53-aad6-113a91a15103"
          }
        />
        <Image
          priority
          width={300}
          height={200}
          alt="type"
          className="rounded-lg mx-1"
          src={
            "https://firebasestorage.googleapis.com/v0/b/g-songs.appspot.com/o/music-pics%2Fmj.jpg?alt=media&token=cac46dda-a1fa-40a6-9ce8-0430c2c5a9bf"
          }
        />
      </section>
      {/* <section className="flex justify-center flex-col rounded-md w-fit">
        <h2 className="text-2xl ">How to create song</h2>
        <video
          controls
          className="rounded-lg xsm:w-[90vw] sm:w-[50vw] "
          src="https://firebasestorage.googleapis.com/v0/b/g-songs.appspot.com/o/createSong.mp4?alt=media&token=cc2d63bc-4f42-4c45-be33-bd4d4b8a3c06"
        />
      </section> */}
    </main>
  );
}
