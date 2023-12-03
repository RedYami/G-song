import HomeFeatures from "@/components/homeFeature";
import LoadingUI from "@/components/loadingProgress";
import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <>
      <main className=" relative p-4 dark:text-white text-black">
        <ModeToggle />
        <HomeFeatures />
      </main>
    </>
  );
}
