"use client";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Logout from "./logoutBtn";
import Link from "next/link";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase-config";
import LogInIcon from "../icons/loginIcon";

export default function LoginOrOut() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  return user ? (
    <Logout />
  ) : (
    <Link href="/authenticate" legacyBehavior passHref>
      <NavigationMenuLink
        className={navigationMenuTriggerStyle() + "xsm:mt-2 sm:mx-2 flex"}
      >
        <h3 className="xsm:hidden sm:block mx-1">LognIn</h3>
        <LogInIcon />
      </NavigationMenuLink>
    </Link>
  );
}
