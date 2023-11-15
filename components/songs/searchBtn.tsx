import { Button } from "../ui/button";

export default function SearchButton({
  hideSearch,
}: {
  hideSearch: () => void;
}) {
  return (
    <Button className="" onClick={() => hideSearch()}>
      Search
    </Button>
  );
}
