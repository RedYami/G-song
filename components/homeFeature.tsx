import Pop from "public/popicon.jpg";
import Country from "public/countryicon.jpg";
import Gospel from "public/gospelicon.jpg";
import Rock from "public/rockicon.jpg";
import Classic from "public/classicicon.jpg";
import Image from "next/image";
import Link from "next/link";

export default function HomeFeatures() {
  return (
    <main className="flex p-3 flex-col justify-center items-center border-2 rounded-lg ">
      <article className="flex xsm:flex-col sm:flex-row justify-center sm:w-[80vw] min-h-[40vh] border-2 rounded-lg">
        <section className=" relative min-w-[40vw] min-h-[35vh] max-h-[40vh]">
          <Image
            priority
            src={
              "https://firebasestorage.googleapis.com/v0/b/g-songs.appspot.com/o/music-pics%2Freal%20band.jpg?alt=media&token=ed301f67-3d80-4947-92b6-4f070301fdb2"
            }
            fill
            className=" object-cover rounded-l-lg"
            alt="band"
          />
        </section>
        <section className="flex flex-col justify-between p-2 relative items-end">
          <div className="flex flex-col justify-start">
            <h2 className="text-2xl z-20 font-bold">Upload your song</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
              sequi id voluptatem ipsam temporibus eligendi soluta accusantium
              ullam tempora quas, et, numquam repellendus quidem? Nemo explicabo
              iure beatae quibusdam in.
            </p>
          </div>
          <Link className=" italic  w-fit  " href={"/createSong"}>
            Create Now
          </Link>
        </section>
      </article>
      <article className="flex m-2 xsm:flex-col sm:flex-row justify-center sm:w-[80vw] min-h-[40vh] border-2 rounded-lg">
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
        <section className="flex flex-col justify-between p-2 relative items-end">
          <div className="flex flex-col justify-start">
            <h2 className="text-2xl z-20 font-bold">List songs with lyrics</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
              sequi id voluptatem ipsam temporibus eligendi soluta accusantium
              ullam tempora quas, et, numquam repellendus quidem? Nemo explicabo
              iure beatae quibusdam in.
            </p>
          </div>
          <Link className=" italic w-fit" href={"/createSong"}>
            Listen now
          </Link>
        </section>
      </article>
      <article className="flex flex-col justify-start">
        <div className="flex flex-col justify-start m-1">
          <h3 className="text-4xl">We have variety of musics</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            corrupti maxime laudantium repellendus at maiores fugit iure nisi
            assumenda, amet, architecto placeat eum repudiandae autem. Nobis
            perspiciatis laudantium unde impedit!
          </p>
        </div>
        <div className="grid xsm:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 rounded-md w-fit">
          <section className="flex flex-col justify-between ">
            <div className="relative sm:min-h-[300px] sm:min-w-[28vw] md:min-w-[18vw] xsm:min-h-[200px] xsm:min-w-[40vw] ">
              <Image
                placeholder="blur"
                priority
                src={Pop}
                fill
                alt="pop"
                className=" object-cover bg-center"
              />
            </div>
            <h3 className="text-xl text-center">Pop</h3>
          </section>
          <section className="flex flex-col justify-between ">
            <div className="relative sm:min-h-[300px] sm:min-w-[28vw] md:min-w-[18vw] xsm:min-h-[200px] xsm:min-w-[40vw] ">
              <Image
                placeholder="blur"
                priority
                src={Classic}
                fill
                alt="pop"
                className=" object-cover bg-center"
              />
            </div>
            <h3 className="text-xl text-center">Classic</h3>
          </section>
          <section className="flex flex-col justify-between ">
            <div className="relative sm:min-h-[300px] sm:min-w-[28vw] md:min-w-[18vw] xsm:min-h-[200px] xsm:min-w-[40vw] ">
              <Image
                placeholder="blur"
                priority
                src={Rock}
                fill
                alt="pop"
                className=" object-cover bg-center"
              />
            </div>
            <h3 className="text-xl text-center">Rock</h3>
          </section>
          <section className="flex flex-col justify-between ">
            <div className="relative sm:min-h-[300px] sm:min-w-[28vw] md:min-w-[18vw] xsm:min-h-[200px] xsm:min-w-[40vw] ">
              <Image
                placeholder="blur"
                priority
                src={Gospel}
                fill
                alt="pop"
                className=" object-cover bg-center"
              />
            </div>
            <h3 className="text-xl text-center">Gospel</h3>
          </section>
          <section className="flex flex-col justify-between ">
            <div className="relative sm:min-h-[300px] sm:min-w-[28vw] md:min-w-[18vw] xsm:min-h-[200px] xsm:min-w-[40vw] ">
              <Image
                placeholder="blur"
                priority
                src={Country}
                fill
                alt="pop"
                className=" object-cover bg-center"
              />
            </div>
            <h3 className="text-xl text-center">Country</h3>
          </section>
        </div>
      </article>
      {/* <article className="flex justify-center flex-col rounded-md w-fit">
        <h2 className="text-2xl ">How to create song</h2>
        <video
          controls
          className="rounded-lg xsm:w-[90vw] sm:w-[50vw] "
          src="https://firebasestorage.googleapis.com/v0/b/g-songs.appspot.com/o/createSong.mp4?alt=media&token=cc2d63bc-4f42-4c45-be33-bd4d4b8a3c06"
        />
      </article> */}
    </main>
  );
}
