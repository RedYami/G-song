"use client";

import Link from "next/link";
import { PropsWithChildren, useEffect } from "react";
import "nprogress/nprogress.css";
import nProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import { useRoutePath } from "@/app/store";

export const CustomLink: React.FC<PropsWithChildren<{ href: string }>> = ({
  href,
  children,
}) => {
  const previousPath = useRoutePath((state) => state.previousPath);
  const setPreviousPath = useRoutePath((state) => state.setPreviousPath);
  const newPath = useRoutePath((state) => state.newPath);
  const setNewPath = useRoutePath((state) => state.setNewPath);
  const handleStartLoading = () => {
    nProgress.start();
    console.log("load start");
  };
  const handleSetPaths = () => {
    if (href != newPath) {
      setPreviousPath(newPath);
      setNewPath(href);
      handleStartLoading();
    }
  };
  // useEffect(() => {
  //     handleStartLoading();
  // }, [newPath, previousPath]);
  console.log("new path ;", newPath);
  console.log(" previous path: ", previousPath);

  return (
    <>
      <button onClick={handleSetPaths}>
        <Link href={href} passHref legacyBehavior>
          {children}
        </Link>
      </button>
    </>
  );
};
