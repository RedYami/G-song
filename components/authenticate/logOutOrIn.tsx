"use client";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Logout from "./logoutBtn";
import Link from "next/link";
import { User, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/app/firebase-config";

export default function LoginOrOut() {
  const [user, setUser] = useState<User | null>(null);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  return user ? (
    <Logout />
  ) : (
    <Link href="/authenticate" legacyBehavior passHref>
      <NavigationMenuLink
        className={navigationMenuTriggerStyle() + "xsm:mt-2 sm:mx-2"}
      >
        login
      </NavigationMenuLink>
    </Link>
  );
}
