"use client";

import Link from "next/link";
import { PropsWithChildren, useEffect } from "react";
import "nprogress/nprogress.css";
import nProgress from "nprogress";

export const CustomLink: React.FC<PropsWithChildren<{ href: string }>> = ({
  href,
  children,
}) => {
  return (
    <>
      <button
        onClick={() => {
          nProgress.start();
          console.log("load start");
        }}
      >
        <Link href={href} passHref legacyBehavior>
          {children}
        </Link>
      </button>
    </>
  );
};
