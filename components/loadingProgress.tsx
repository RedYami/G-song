"use client";
import nProgress from "nprogress";
import { useEffect } from "react";

export default function LoadingUI() {
  useEffect(() => {
    return () => {
      console.log("load done!!!");
      nProgress.done();
    };
  }, []);
  return <div></div>;
}
