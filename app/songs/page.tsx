import Song from "@/components/songs/songContainer";

// import SongContainer, { Song } from "@/components/songContainer";

export const mySong = {
  key: "E",
  title: "ပို့ဆောင်တော်မူကျူး",
  song_number: 1,
  verses: [
    {
      verse_number: 1,
      lyrics: [
        "အိုးငြိမ်းဖွယ်ရာ  မြတ်မဂ်လာ၊ ",
        "ငါပြုမှုတိုင်း ငါသွားလေရာ။",
        "သခင်ယေရှု စောင့်ထိန်းမူလေ ၊ ",
        "လက်ရုံးတော်ပင်  ငါ့လက်ကိုင်ပေ။",
      ],
    },
    {
      verse_number: 2,
      lyrics: [
        "အိုးငြိမ်းဖွယ်ရာ  မြတ်မဂ်လာ၊ ",
        "ငါပြုမှုတိုင်း ငါသွားလေရာ။",
        "သခင်ယေရှု စောင့်ထိန်းမူလေ ၊ ",
        "လက်ရုံးတော်ပင်  ငါ့လက်ကိုင်ပေ။",
      ],
    },
  ],
  Chorus: [
    "အိုးငြိမ်းဖွယ်ရာ  မြတ်မဂ်လာ၊ ",
    "ငါပြုမှုတိုင်း ငါသွားလေရာ။",
    "သခင်ယေရှု စောင့်ထိန်းမူလေ ၊ ",
    "လက်ရုံးတော်ပင်  ငါ့လက်ကိုင်ပေ။",
  ],
};

export default function CSong() {
  return (
    <main>
      <Song />
    </main>
  );
}
