"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import Logout from "./authenticate/logoutBtn";
import { Button } from "./ui/button";

export default function NavigationBar() {
  const [user, setUser] = useState<User | null>(null);
  const [showNav, setShowNav] = useState(true);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  return (
    <nav className="pageWarper sticky top-0 left-0 z-40 right-0 border-b-2 bg-black border-black dark:border-white">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="flex xsm:flex-col sm:flex-row xsm:justify-center sm:justify-start items-center w-[100vw] ">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  navigationMenuTriggerStyle() +
                  "xsm:mt-2 sm:mx-2 xsm:w-full sm:w-fit "
                }
              >
                Home
              </NavigationMenuLink>
            </Link>
            <Link href="/songs" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  navigationMenuTriggerStyle() +
                  "xsm:mt-2 sm:mx-2 xsm:w-full sm:w-fit "
                }
              >
                Song
              </NavigationMenuLink>
            </Link>
            <Link href="/createSong" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  navigationMenuTriggerStyle() +
                  "xsm:mt-2 sm:mx-2 xsm:w-full sm:w-fit "
                }
              >
                Create Song
              </NavigationMenuLink>
            </Link>
            {user ? (
              <Logout />
            ) : (
              <Link href="/authenticate" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle() + "xsm:mt-2 sm:mx-2"}
                >
                  login
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

// <div className=" flex justify-between items-center">
// <h3 className="text-xl text-black dark:text-white">songs</h3>
// <SongSvg />
// </div>
// <AvatarDemo />
