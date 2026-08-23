import { useRef, useState } from "react";
import { weddingData } from "../data/wedding-data";
import mp3file from "../components/vay-cuoi.mp3";

export default function MusicToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const togglePlayback = async () => {
    if (!audioRef.current || failed) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      setFailed(true);
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={mp3file}
        loop
        preload="none"
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onError={() => setFailed(true)}
      />
      <button
        type="button"
        onClick={togglePlayback}
        disabled={failed}
        aria-pressed={playing}
        className="fixed bottom-4 right-4 z-40 grid size-12 cursor-pointer place-items-center rounded-full bg-burgundy text-white shadow-[0_8px_24px_rgb(81_20_25/0.34)] transition-transform duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-45 sm:bottom-6 sm:right-6"
        aria-label={
          failed
            ? "Không thể phát nhạc"
            : playing
              ? "Tạm dừng nhạc"
              : "Phát nhạc"
        }
        title={
          failed
            ? "Không thể tải bản nhạc. Kiểm tra đường dẫn trong wedding-data.js."
            : weddingData.music.title
        }
      >
        <span
          aria-hidden="true"
          className={`absolute inset-1 rounded-full border border-white/20 ${playing ? "animate-music-spin" : ""}`}
        >
          <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/85" />
        </span>
        {playing ? (
          <span
            aria-hidden="true"
            className="relative flex h-4 items-center gap-0.5"
          >
            {["55%", "100%", "42%", "78%"].map((height) => (
              <span
                key={height}
                className="music-bar block w-1 rounded-full bg-white"
                style={{ height }}
              />
            ))}
          </span>
        ) : (
          <svg
            aria-hidden="true"
            className="relative size-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 18.4A3.4 3.4 0 1 1 7 15.3V6.5l10-2.1v10a3.4 3.4 0 1 1-2-3.1V7l-6 1.3v10.1Z" />
          </svg>
        )}
      </button>
    </>
  );
}
