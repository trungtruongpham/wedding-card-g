import { weddingData } from "../data/wedding-data";

export default function HeroSection() {
  const { groom, bride } = weddingData.couple;

  return (
    <header className="relative z-10 flex flex-col items-center overflow-hidden px-9 pb-14 pt-15 text-center md:pt-18">
      <img
        alt=""
        aria-hidden="true"
        className="section-watermark top-[23%] w-[170%]"
        src="/assets/castle-background.webp"
      />

      <p className="relative z-10 font-invitation text-[15px] font-semibold uppercase tracking-[0.2em] text-[#590310] md:text-[18px]">
        Save the date
      </p>

      <div className="relative z-10 mt-24 w-[82%] max-w-[330px] md:mt-28 md:max-w-[420px]">
        <div className="relative aspect-[333/384]">
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 w-full max-w-none"
            src="/assets/envelope-background.webp"
          />
          <div className="animate-float-delayed absolute left-[33%] top-[-2%] z-20 w-[64%]">
            <div className="aspect-[221/309] rotate-[12deg] border-[7px] border-white bg-white shadow-[2px_3px_8px_rgb(0_0_0/0.24)]">
              <img
                alt={`Ảnh cưới của ${groom.shortName} và ${bride.shortName}`}
                className="h-full w-full object-cover"
                src="/assets/img1.jpg"
              />
            </div>
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-[2%] -top-[12%] z-[25] block w-[42%]"
          >
            <span className="animate-float-soft block">
              <img
                alt=""
                className="block w-full max-w-none rotate-[-17deg] object-contain drop-shadow-[3px_4px_3px_rgb(0_0_0/0.3)]"
                src="/assets/flower-decoration.webp"
              />
            </span>
          </span>
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 z-30 w-full max-w-none"
            src="/assets/envelope-cover.webp"
          />
        </div>
      </div>

      <div className="relative z-10 mt-16 flex flex-col items-center gap-[22px] md:mt-20">
        <h1 className="contents">
          <span className="font-display text-[clamp(38px,11vw,46px)] leading-none md:text-[58px]">
            Văn Tuấn
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[37%] -translate-y-1/2 font-invitation text-[92px] italic leading-none text-burgundy/15 md:text-[120px]"
          >
            &amp;
          </span>
          <span className="font-display text-[clamp(38px,11vw,46px)] leading-none md:text-[58px]">
            Hương Giang
          </span>
        </h1>
      </div>
    </header>
  );
}
