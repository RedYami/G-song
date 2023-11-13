import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarDemo({ avatarSrc }: { avatarSrc: string }) {
  return (
    <Avatar>
      <AvatarImage src={avatarSrc} alt="@shadcn" />
      <AvatarFallback>User</AvatarFallback>
    </Avatar>
  );
}
