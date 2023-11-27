"use client";
import { auth } from "@/app/firebase-config";
import { signOut } from "firebase/auth";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import Cookies from "js-cookie";

export default function Logout() {
  const logout = async () => {
    await signOut(auth);
    Cookies.remove("firebase-auth");
  };
  return (
    <Button
      className=" bg-black hover:bg-red-600 m-1 text-white flex"
      onClick={() => logout()}
    >
      <h3 className="xsm:hidden sm:block mx-1">LogOut</h3>
      <LogOutIcon />
    </Button>
  );
}
