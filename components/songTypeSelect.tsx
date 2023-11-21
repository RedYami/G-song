"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectSongType({
  songType,
  setSongType,
}: {
  songType: string;
  setSongType: (type: string) => void;
}) {
  return (
    <Select onValueChange={(value) => setSongType(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select song type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>{currentSongCata}</SelectLabel> */}
          <SelectItem value="rock">rock</SelectItem>
          <SelectItem value="pop">pop</SelectItem>
          <SelectItem value="gospel">gospel</SelectItem>
          <SelectItem value="classic">classic</SelectItem>
          <SelectItem value="country">country</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
