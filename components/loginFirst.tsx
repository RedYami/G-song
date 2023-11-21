import Link from "next/link";
import { Button } from "./ui/button";

export default function LoginFirst() {
  return (
    <div className=" w-[100vw] h-[100vh] flex justify-center items-center">
      <section className="p-3 xsm:w-[60vw] sm:w-[50vw] xsm:h-[50vh] sm:h-[60vh] flex flex-col justify-center items-center border-2 rounded-lg border-black dark:border-white">
        <h3 className="text-2xl text-center">
          Please login first to create song
        </h3>
        <div className="flex justify-between p-2 w-full">
          <Button>
            <Link href={"/"}>Home</Link>
          </Button>
          <Button>
            <Link href={"authenticate"}>Login</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
