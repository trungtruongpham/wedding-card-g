import { useState } from "react";
import { weddingData } from "../data/wedding-data";
import Modal from "./Modal";
import { SectionHeading } from "./InvitationCard";

function Sparkle({ className }) {
  return (
    <svg
      aria-hidden="true"
      className={`animate-sparkle absolute text-antique-gold ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 1c.7 6.8 4.2 10.3 11 11-6.8.7-10.3 4.2-11 11C11.3 16.2 7.8 12.7 1 12 7.8 11.3 11.3 7.8 12 1Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14"
      />
    </svg>
  );
}

function GiftAccount({ account }) {
  return (
    <article className="flex w-full max-w-[210px] flex-col items-center rounded-xl border border-burgundy/12 bg-white/45 p-4">
      <h3 className="flex min-h-10 items-start justify-center text-center text-xs font-semibold leading-relaxed">
        {account.label}
      </h3>
      <div className="mt-2 grid size-40 place-items-center rounded-xl border-2 border-burgundy/10 bg-white p-2 shadow-lg">
        <img
          src={account.qrImage}
          alt={`Mã QR chuyển khoản ${account.label}`}
          width="140"
          height="140"
          className="size-[140px] object-contain"
        />
      </div>
      <div className="mt-3 space-y-0.5 text-center text-[11px]">
        <p>{account.bank}</p>
        <p className="font-mono text-xs">{account.accountNumber}</p>
        <p className="font-semibold">{account.accountHolder}</p>
      </div>
      <a
        href={account.qrImage}
        download={`qr-${account.id}.jpg`}
        className="mt-3 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-burgundy/8 px-4 py-2 text-xs font-semibold transition-colors hover:bg-burgundy/15"
      >
        <DownloadIcon />
        Lưu QR
      </a>
    </article>
  );
}

export default function GiftSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      aria-labelledby="gift-heading"
      className="relative z-10 overflow-hidden px-6 pb-12 pt-10 text-center"
    >
      <img
        alt=""
        aria-hidden="true"
        className="section-watermark top-[3%]"
        src="/assets/castle-background.webp"
      />
      <div className="relative z-10 flex flex-col items-center">
        <SectionHeading>
          <span id="gift-heading">Hộp quà mừng</span>
        </SectionHeading>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative mt-2 h-[357px] w-[250px] cursor-pointer border-0 bg-transparent"
          aria-label="Mở hộp quà mừng cưới"
        >
          <Sparkle className="left-5 top-7 size-5" />
          <Sparkle className="right-5 top-16 size-4 [animation-delay:650ms]" />
          <Sparkle className="left-2 top-36 size-3 [animation-delay:1.2s]" />
          <Sparkle className="right-2 top-28 size-3 [animation-delay:1.65s]" />
          <span className="absolute bottom-12 left-1/2 h-3 w-32 -translate-x-1/2 rounded-full bg-[#26090c]/25 blur-[4px] transition-transform duration-300 group-hover:scale-x-90" />
          <img
            alt=""
            aria-hidden="true"
            src="/assets/gift-envelope.webp"
            className="animate-float-delayed absolute bottom-14 left-1/2 h-[275px] w-[190px] -translate-x-[35%] -rotate-[15deg] scale-x-[-0.8] scale-y-[0.8] object-contain drop-shadow-[0_10px_16px_rgb(0_0_0/0.2)]"
          />
          <img
            alt=""
            aria-hidden="true"
            src="/assets/gift-envelope.webp"
            className="animate-float-soft absolute bottom-14 left-1/2 h-[275px] w-[190px] -translate-x-[58%] -rotate-[10deg] object-contain drop-shadow-[0_12px_18px_rgb(0_0_0/0.22)] transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-burgundy/75">
            Nhấn để mở
          </span>
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Hộp quà mừng">
        <div className="flex flex-col items-center justify-center gap-4 p-5 text-burgundy sm:flex-row sm:items-start sm:p-7">
          {weddingData.giftAccounts.map((account) => (
            <GiftAccount key={account.id} account={account} />
          ))}
        </div>
        <p className="px-6 pb-6 text-center text-xs leading-relaxed text-burgundy/60">
          Quét mã để xem thông tin chuyển khoản. Hãy kiểm tra lại tên và số tài
          khoản trước khi gửi.
        </p>
      </Modal>
    </section>
  );
}
