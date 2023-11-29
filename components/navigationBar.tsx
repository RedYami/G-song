"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import LoginOrOut from "./authenticate/logOutOrIn";
import Home from "./icons/homeIcon";
import Music from "./icons/musicIcon";
import Create from "./icons/createIcon";
import { useEffect } from "react";
import { CustomLink } from "./customLink";
export default function NavigationBar() {
  return (
    <nav className="pageWarper sticky top-0 left-0 z-40 right-0 border-b-2  border-black dark:border-white backdrop-blur-2xl">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="flex editHere justify-start items-center w-[100vw] ">
            <CustomLink href="/">
              <NavigationMenuLink
                className={
                  navigationMenuTriggerStyle() +
                  "xsm:mt-2 sm:mx-2 xsm:w-full sm:w-fit flex bg-none "
                }
              >
                <h3 className="xsm:hidden sm:block mx-1">Home</h3>
                <Home />
              </NavigationMenuLink>
            </CustomLink>
            <CustomLink href="/songs">
              <NavigationMenuLink
                className={
                  navigationMenuTriggerStyle() +
                  "xsm:mt-2 sm:mx-2 xsm:w-full sm:w-fit flex bg-none "
                }
              >
                <h3 className="xsm:hidden sm:block mx-1">Songs</h3>
                <Music />
              </NavigationMenuLink>
            </CustomLink>

            <CustomLink href="/createSong">
              <NavigationMenuLink
                className={
                  navigationMenuTriggerStyle() +
                  "xsm:mt-2 sm:mx-2 xsm:w-full sm:w-fit flex bg-none "
                }
              >
                <h3 className="xsm:hidden sm:block mx-1">Create Song</h3>
                <Create />
              </NavigationMenuLink>
            </CustomLink>

            <LoginOrOut />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
