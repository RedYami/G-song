export type Verse = {
    id: string;
    verse_number: number;
    lyrics: lyric[];
    type: string;
  };

  type lyric = {
    id: string;
    lyric_line: string;
  };