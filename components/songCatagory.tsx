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
import { useSongCatagory } from "@/app/store";

export function SelectSongCatagory() {
  const currentSongCata = useSongCatagory((state) => state.songCatagory);
  const changeSongType = useSongCatagory((state) => state.setSongCatagory);
  console.log("current type:", currentSongCata);
  const setSongCata = (value: string) => {
    console.log("is clicked");

    changeSongType(value);
  };

  return (
    <Select onValueChange={(value) => setSongCata(value)}>
      <SelectTrigger className="w-[180px] z-20">
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
