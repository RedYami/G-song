import { Button } from "./ui/button";

export default function EditSong() {
  return (
    <article className="fixed top-0 left-0 w-full backdrop-blur-sm z-50 flex justify-center items-center">
      <section className="p-3 text-xl xsm:w-[95vw] sm:w-[60vw] overflow-auto min-h-[80vh] flex flex-col justify-start rounded-lg border-2 ">
        <div className="flex justify-between">
          <Button>save</Button>
          <Button>cancel</Button>
        </div>
        {[1, 2, 3, 4].map((number) => (
          <div key={number} className="flex flex-col border-2 rounded-lg p-2">
            {[1, 2, 3, 4].map((num) => (
              <input
                key={num}
                required
                className="xsm:min-w-full sm:min-w-[280px] mr-2 p-1 border-b-2 border-black dark:border-white  outline-none bg-white dark:bg-black"
              />
            ))}
          </div>
        ))}
      </section>
    </article>
  );
}
