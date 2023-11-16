import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SearchByDropdown({
  select,
  currentType,
}: {
  select: (by: string) => void;
  currentType: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-2 border-white rounded-md mx-2 p-1 hover:bg-white hover:text-black">
        {currentType}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={() => select("title")}>Title</button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={() => select("lyric")}>lyric line</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
