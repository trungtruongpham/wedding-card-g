import { useState } from "react";
import { weddingData } from "../data/wedding-data";
import { SectionHeading } from "./InvitationCard";

const suggestions = [
  "Chúc hai bạn luôn bình an, thấu hiểu và cùng nhau viết nên thật nhiều kỷ niệm đẹp.",
  "Mừng ngày hai bạn về chung một nhà. Chúc hành trình phía trước luôn ngập tràn yêu thương.",
  "Chúc cô dâu chú rể trăm năm hạnh phúc, mỗi ngày bên nhau đều là một ngày vui.",
];

function loadSavedWishes() {
  try {
    return JSON.parse(localStorage.getItem("wedding-wishes") || "[]");
  } catch {
    return [];
  }
}

export default function GuestbookSection() {
  const [savedWishes, setSavedWishes] = useState(loadSavedWishes);
  const [message, setMessage] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const allWishes = [...savedWishes, ...weddingData.wishes];

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const wish = {
      name: formData.get("name").trim(),
      message: formData.get("message").trim(),
      time: new Intl.DateTimeFormat("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date()),
    };

    if (!wish.name || !wish.message) return;

    const nextWishes = [wish, ...savedWishes];
    setSavedWishes(nextWishes);
    try {
      localStorage.setItem("wedding-wishes", JSON.stringify(nextWishes));
    } catch {
      // The new wish remains visible for this session when storage is disabled.
    }
    form.reset();
    setMessage("");
  };

  const suggestWish = () => {
    setMessage(suggestions[suggestionIndex]);
    setSuggestionIndex((suggestionIndex + 1) % suggestions.length);
  };

  return (
    <section
      aria-labelledby="guestbook-heading"
      className="paper-note relative z-10 px-6 pb-10 pt-[86px] md:px-10 md:pb-12 md:pt-[130px]"
    >
      <div className="text-center">
        <SectionHeading>
          <span id="guestbook-heading">Sổ lưu bút</span>
        </SectionHeading>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-6 w-full max-w-[380px]">
        <div className="space-y-4 rounded-lg p-1">
          <label className="block">
            <span className="mb-2 block font-invitation font-semibold">Tên của bạn *</span>
            <input
              required
              name="name"
              maxLength="80"
              autoComplete="name"
              placeholder="Ví dụ: Duy Khang"
              className="min-h-12 w-full rounded-lg border border-burgundy bg-transparent px-4 text-base text-burgundy placeholder:text-burgundy/55"
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-invitation font-semibold">Lời chúc *</span>
            <textarea
              required
              name="message"
              maxLength="1000"
              rows="4"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Gửi lời chúc tới cô dâu chú rể"
              className="w-full resize-none rounded-lg border border-burgundy bg-transparent px-4 py-3 text-base text-burgundy placeholder:text-burgundy/55"
            />
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={suggestWish}
              className="min-h-11 cursor-pointer rounded-full border border-burgundy/30 px-4 py-2 text-sm transition-colors hover:bg-burgundy/8"
            >
              Gợi ý lời chúc
            </button>
            <button
              type="submit"
              className="min-h-11 cursor-pointer rounded-full bg-burgundy px-6 py-2 text-sm font-semibold uppercase tracking-[0.05em] text-parchment transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Gửi lời chúc
            </button>
          </div>
        </div>
      </form>

      <div className="scrollbar-thin mx-auto mt-14 max-h-[500px] w-full max-w-[600px] space-y-3 overflow-y-auto pr-2">
        {allWishes.map((wish, index) => (
          <article
            key={`${wish.name}-${wish.time}-${index}`}
            className="rounded-lg border border-burgundy/30 bg-white/55 p-4 text-sm shadow-[0_4px_14px_rgb(81_20_25/0.04)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="font-semibold text-burgundy">{wish.name}</h3>
              <time className="text-xs text-burgundy/60">{wish.time}</time>
            </div>
            <p className="mt-2 leading-relaxed text-burgundy/90">{wish.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
