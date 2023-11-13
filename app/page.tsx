import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="flex justify-between p-4 dark:text-white text-black">
      <ModeToggle />
    </main>
  );
}
