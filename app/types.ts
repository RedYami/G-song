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
export type Song = {
    id: string;
    title: string;
    verses: Verse[];
    song_number: number;
    key: string | null;
    author: Author;
    songType: string;
  };
  type Author = {
    username: string;
    email: string;
    id: string;
  };