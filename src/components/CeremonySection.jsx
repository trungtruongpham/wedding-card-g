import { weddingData } from "../data/wedding-data";
import InvitationCard, {
  FlowerDecoration,
  SectionHeading,
} from "./InvitationCard";
import VenueSection from "./VenueSection";

function Family({ family }) {
  return (
    <div className="grid min-w-0 justify-items-center gap-0.5">
      <span className="text-xs text-parchment/70">{family.label}</span>
      {family.parents.map((parent) => (
        <strong
          key={parent}
          className="text-[13px] font-semibold [overflow-wrap:anywhere]"
        >
          {parent}
        </strong>
      ))}
      <span className="mt-1 text-[10px] leading-tight text-parchment/70">
        {family.address}
      </span>
    </div>
  );
}

export default function CeremonySection() {
  const { couple, families, ceremony } = weddingData;

  return (
    <section
      aria-labelledby="ceremony-heading"
      className="relative z-10 mx-auto w-[88%] max-w-[420px] md:max-w-[560px]"
    >
      <FlowerDecoration className="bottom-[44%]" />
      <InvitationCard className="pb-10 pt-9">
        <SectionHeading light>
          <span id="ceremony-heading">Thông tin lễ cưới</span>
        </SectionHeading>

        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-x-5 font-invitation md:gap-x-8">
          <Family family={families[0]} />
          <span aria-hidden="true" className="h-14 w-px bg-parchment/40" />
          <Family family={families[1]} />
        </div>

        <p className="whitespace-pre-line font-invitation text-xs leading-relaxed md:text-[13px]">
          TRÂN TRỌNG BÁO TIN{"\n"}LỄ THÀNH HÔN CỦA CON CHÚNG TÔI
        </p>

        <div className="flex w-full min-w-0 flex-col items-center gap-3 text-center md:gap-4">
          <h3 className="flex min-h-18 w-[94%] items-center justify-center text-nowrap font-formal text-[clamp(32px,8.5vw,46px)] leading-none">
            {couple.groom.fullName}
          </h3>
          <span aria-hidden="true" className="font-invitation text-4xl italic">
            &amp;
          </span>
          <h3 className="flex min-h-18 w-[94%] items-center justify-center text-nowrap font-formal text-[clamp(32px,8.5vw,46px)] leading-none">
            {couple.bride.fullName}
          </h3>
        </div>

        <div className="flex flex-col items-center gap-4 font-invitation md:gap-5">
          <p className="whitespace-pre-line text-base text-parchment/70 md:text-lg">
            LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI{"\n"}
            {ceremony.location.toUpperCase()}
          </p>
          <div className="flex w-full max-w-[190px] justify-between text-[15px] uppercase text-parchment/70 md:text-[20px]">
            <span>Vào lúc {ceremony.time}</span>
            <span>{ceremony.weekday}</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <strong className="font-invitation text-[42px] font-normal leading-none md:text-[48px]">
              {ceremony.day}
            </strong>
            <span aria-hidden="true" className="h-12 w-px bg-parchment/45" />
            <span className="flex flex-col items-start gap-1 text-left font-invitation text-base uppercase md:text-lg">
              <span>Tháng {ceremony.month}</span>
              <span>{ceremony.year}</span>
            </span>
          </div>
          <p className="text-xs uppercase tracking-[0.1em] text-parchment/70 md:text-sm">
            ({ceremony.lunarDate})
          </p>
        </div>
      </InvitationCard>
    </section>
  );
}
