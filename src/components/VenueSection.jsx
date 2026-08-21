import { weddingData } from "../data/wedding-data";
import { SectionHeading } from "./InvitationCard";

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

const familyVenueLabels = [
  {
    side: "Nhà trai",
    title: "Tiệc mời cưới nhà trai",
  },
  {
    side: "Nhà gái",
    title: "Tiệc mời cưới nhà gái",
  },
];

function FamilyAddress({ family, side, title }) {
  return (
    <article className="flex h-full min-w-0 flex-col">
      <h3 className="relative z-10 flex min-h-11 items-center justify-center rounded-full bg-burgundy px-4 py-2 text-center font-formal text-[18px] leading-tight text-parchment shadow-[3px_5px_12px_rgb(81_20_25/0.2)] md:text-[21px]">
        {title}
      </h3>
      <div className="mx-3 flex min-h-0 flex-1 flex-col items-center border-s-2 border-burgundy/80 px-4 pb-1 pt-5 text-center md:mx-5 md:px-5">
        <p className="font-normal text-base text-burgundy/80 md:text-lg">
          {family.weeddingTime}
        </p>
        <p className="font-normal text-base text-burgundy/80 md:text-lg">
          {family.weddingDay}
        </p>
        <p className="font-normal text-base text-burgundy/80 md:text-lg">
          {family.lunarWeddingDay}
        </p>
        <p className="font-normal text-base text-burgundy/80 md:text-lg">
          Tại tư gia {side}
        </p>
        <address className="mt-auto flex h-45 w-full shrink-0 items-center justify-center bg-burgundy px-3 py-3 font-formal text-base not-italic leading-snug text-parchment shadow-[3px_5px_12px_rgb(81_20_25/0.18)] [overflow-wrap:anywhere] md:text-lg">
          {family.address}
        </address>
      </div>
    </article>
  );
}

export default function VenueSection() {
  const { families, venue, dressCode } = weddingData;
  const mapQuery = encodeURIComponent(`${venue.name}, ${venue.address}`);
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="relative z-10 w-full overflow-hidden rounded-[10px] bg-parchment text-burgundy">
      <img
        alt=""
        aria-hidden="true"
        className="section-watermark top-[-1%]"
        src="/assets/castle-background.webp"
      />

      <section
        aria-labelledby="family-addresses-heading"
        className="relative z-10 flex w-full flex-col items-center px-5 pb-8 pt-10 md:px-8 md:pb-12"
      >
        <div className="text-center">
          <SectionHeading>
            <span id="family-addresses-heading">Thư mời</span>
          </SectionHeading>
          <p className="mx-auto mt-1 max-w-[360px] font-invitation text-sm uppercase leading-relaxed tracking-[0.04em] text-burgundy/80 md:text-base">
            Tham dự tiệc thân mật cùng gia đình chúng tôi
          </p>
        </div>

        <div className="mt-7 grid w-full max-w-[680px] grid-cols-1 items-stretch gap-6 md:mt-9 md:grid-cols-2 md:gap-8">
          {families.map((family, index) => {
            const labels = familyVenueLabels[index];

            if (!labels) return null;

            return (
              <FamilyAddress key={labels.side} family={family} {...labels} />
            );
          })}
        </div>
      </section>
    </div>
  );
}
