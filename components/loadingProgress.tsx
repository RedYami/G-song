"use client";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export function ProgressDemo() {
  const [progress, setProgress] = useState(13);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const handleStart = () => {
  //     setLoading(true);
  //   };

  //   const handleComplete = () => {
  //     setProgress(100);
  //     setLoading(false);
  //   };

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);

  //   return () => {
  //     router.events.off("routeChangeStart", handleStart);
  //     router.events.off("routeChangeComplete", handleComplete);
  //     router.events.off("routeChangeError", handleComplete);
  //   };
  // }, [router]); // Include router as a dependency

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Progress value={progress} className="w-full sticky " />
  ) : (
    <div></div>
  );
}
