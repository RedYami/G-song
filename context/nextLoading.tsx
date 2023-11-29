"use client";
import NextNProgress from "nextjs-progressbar";
import React from "react";

export default function LoadingComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("this is loading");

  return (
    <div className="z-50">
      <NextNProgress
        options={{ easing: "ease", speed: 500 }}
        color="#00ff00"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      {children}
    </div>
  );
}
