"use client";
import { Skeleton } from "../ui/skeleton";

export default function SongSkeleton() {
  return (
    <main className="flex flex-col relative min-w-[40vw] ">
      <article className=" w-full flex justify-center relative ">
        <section className=" text-black dark:text-white w-fit  flex flex-col justify-center ">
          <div className="flex justify-center items-center w-full">
            <Skeleton className=" w-[150px] xsm:h-[25px] sm:h-[28px] my-2 rounded-full bg-black dark:bg-white" />
          </div>
          <Skeleton className="w-[70px] xsm:h-[20px] sm:h-[28px] my-2 rounded-full bg-black dark:bg-white" />

          {[1, 2, 3].map((num) => (
            <div
              className=" flex sm:flex-col md:flex-row items-start justify-start my-2 "
              key={num}
            >
              <Skeleton className="w-[30px] xsm:h-[20px] sm:h-[28px] rounded-xl bg-black dark:bg-white" />
              <div className=" flex flex-col w-fit text-lg justify-end ">
                {[1, 2, 3].map((lyric) => (
                  <Skeleton
                    className="xsm:w-[200px] sm:w-[300px] my-2 xsm:h-[20px] sm:h-[28px] rounded-full bg-black dark:bg-white"
                    key={lyric}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </article>
    </main>
  );
}

export function VerseSkeleton() {
  return [1, 2, 3].map((num) => (
    <div
      className=" flex sm:flex-col md:flex-row items-start justify-start my-2 "
      key={num}
    >
      <Skeleton className="w-[30px] h-[20px] rounded-full" />
      <div className=" flex flex-col w-fit text-lg justify-end ">
        {[1, 2, 3].map((lyric) => (
          <Skeleton className="w-[100px] h-[20px] rounded-full" key={lyric} />
        ))}
      </div>
    </div>
  ));
}
