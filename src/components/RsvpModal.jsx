import { useState } from "react";
import { weddingData } from "../data/wedding-data";
import Modal from "./Modal";

export default function RsvpModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = Object.fromEntries(formData.entries());
    try {
      localStorage.setItem("wedding-rsvp", JSON.stringify(response));
    } catch {
      // The confirmation still succeeds for this session when storage is disabled.
    }
    setSubmitted(true);
  };

  const closeAndReset = () => {
    onClose();
    window.setTimeout(() => setSubmitted(false), 200);
  };

  return (
    <Modal open={open} onClose={closeAndReset} title="Xác nhận tham dự">
      <div className="p-5 sm:p-7">
        {submitted ? (
          <div className="flex min-h-56 flex-col items-center justify-center text-center" role="status" aria-live="polite">
            <svg aria-hidden="true" className="size-12 text-antique-gold" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="24" cy="24" r="20" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 24 6 6 12-13" />
            </svg>
            <h3 className="mt-4 font-display text-3xl">Đã ghi nhận phản hồi</h3>
            <p className="mt-2 max-w-sm font-invitation text-base leading-relaxed text-burgundy/75">
              Cảm ơn bạn đã phản hồi lời mời của {weddingData.couple.groom.shortName} và {weddingData.couple.bride.shortName}.
            </p>
            <button type="button" onClick={closeAndReset} className="mt-6 min-h-11 cursor-pointer rounded-full bg-burgundy px-7 py-2 text-parchment">
              Hoàn tất
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block font-invitation font-semibold">Tên của bạn *</span>
              <input
                required
                name="name"
                autoComplete="name"
                className="min-h-12 w-full rounded-lg border border-burgundy/35 bg-white/55 px-4 text-base text-burgundy placeholder:text-burgundy/40 focus:border-burgundy"
                placeholder="Nguyễn Minh Anh"
              />
            </label>

            <fieldset>
              <legend className="mb-2 font-invitation font-semibold">Bạn sẽ tham dự? *</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["yes", "Tôi sẽ tham dự"],
                  ["no", "Tôi không thể tham dự"],
                ].map(([value, label]) => (
                  <label key={value} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-burgundy/25 bg-white/45 px-4 has-checked:border-burgundy has-checked:bg-burgundy/8">
                    <input required type="radio" name="attendance" value={value} className="size-4 accent-burgundy" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="mb-2 block font-invitation font-semibold">Số khách tham dự</span>
              <select name="guests" defaultValue="1" className="min-h-12 w-full rounded-lg border border-burgundy/35 bg-white/55 px-4 text-base">
                {[1, 2, 3, 4, 5].map((count) => (
                  <option key={count} value={count}>{count} khách</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block font-invitation font-semibold">Lời nhắn</span>
              <textarea name="message" rows="3" className="w-full resize-none rounded-lg border border-burgundy/35 bg-white/55 px-4 py-3 text-base" placeholder="Gửi lời nhắn tới cô dâu chú rể" />
            </label>

            <button type="submit" className="min-h-12 w-full cursor-pointer rounded-full bg-burgundy px-6 py-3 font-semibold uppercase tracking-[0.05em] text-parchment transition-transform hover:scale-[1.01] active:scale-[0.99]">
              Gửi xác nhận
            </button>
            <p className="text-center text-xs leading-relaxed text-burgundy/60">
              Bản React này lưu phản hồi trên thiết bị. Kết nối API trong <code>handleSubmit</code> để nhận RSVP thật.
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
}
