"use client";
import { auth } from "@/app/firebase-config";
import { signOut } from "firebase/auth";
import { Button } from "../ui/button";

export default function Logout() {
  const logout = async () => {
    await signOut(auth);
    localStorage.setItem("isLoginWithFirebase", "no");
  };
  return (
    <Button
      className=" bg-black hover:bg-red-600 m-1 text-white"
      onClick={() => logout()}
    >
      LogOut
    </Button>
  );
}
