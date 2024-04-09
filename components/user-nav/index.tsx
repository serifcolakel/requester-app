import { redirect, RedirectType } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { paths } from "@/constants/paths";
import { getUser } from "@/services/auth";
import { logout } from "@/services/auth/actions";

export async function UserNav() {
  const user = await getUser();

  const onLogout = async () => {
    "use server";

    await logout();

    redirect(paths.home, RedirectType.replace);
  };

  const fullName = String(user?.user_metadata?.fullName);

  const avatarFallbackText = fullName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-8 w-8 rounded-full" variant="ghost">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{avatarFallbackText}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent forceMount align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-0">
          <form action={onLogout} className="w-full">
            <Button
              className="flex items-center justify-between w-full p-0"
              size="xs"
              type="submit"
              variant="icon"
            >
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
