"use client";
import React, { useEffect, useRef, useState } from "react";
import { SliderDemo } from "./audioSlider";
import PlayIcon from "./icons/playIcon";
import PauseIcon from "./icons/pauseIcon";

const AudioPlayer = ({ source }: { source: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [currentSliderValue, setCurrentSliderValue] = useState<number>(0);
  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setTotalDuration(Math.floor(audioRef.current!.duration));
      };

      const handleTimeUpdate = () => {
        setCurrentSliderValue(Math.floor(audioRef.current!.currentTime));
      };

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        // Remove event listeners when the component is unmounted
        if (audioRef.current) {
          audioRef.current!.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
          audioRef.current!.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };
    }
  }, [audioRef]);
  const handleSeek = (seekNumber: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seekNumber;
    }
  };
  const handlePlayPause = () => {
    if (!audioRef.current) {
      return;
    }
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const handleCurrentValue = () => {};
  return (
    <section className="flex justify-start items-center">
      {isPlaying ? (
        <PauseIcon
          onclick={() => {
            setIsPlaying(!isPlaying);
            handlePlayPause();
          }}
        />
      ) : (
        <PlayIcon
          onclick={() => {
            setIsPlaying(!isPlaying);
            handlePlayPause();
          }}
        />
      )}
      <SliderDemo
        className=" h-3"
        onValueChange={(value) => handleSeek(value[0])}
        defaultValue={[0]}
        value={[currentSliderValue]}
        max={totalDuration}
      />
      <audio ref={audioRef} className="border-2">
        <source src={source} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
};

export default AudioPlayer;
