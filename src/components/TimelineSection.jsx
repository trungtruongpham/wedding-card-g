import { weddingData } from "../data/wedding-data";
import InvitationCard, { FlowerDecoration, SectionHeading } from "./InvitationCard";

export default function TimelineSection() {
  return (
    <section aria-labelledby="timeline-heading" className="relative z-10 mx-auto my-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      <FlowerDecoration className="-top-[10%]" />
      <InvitationCard className="px-6">
        <SectionHeading light>
          <span id="timeline-heading">Lịch trình ngày cưới</span>
        </SectionHeading>
        <ol className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 gap-y-8 font-invitation md:gap-x-8 md:gap-y-10">
          {weddingData.timeline.map((item, index) => (
            <li key={`${item.time}-${item.label}`} className="contents">
              <time dateTime={`2026-01-03T${item.time}:00+07:00`} className="relative text-right text-base tabular-nums tracking-wide md:text-[17px]">
                {item.icon && (
                  <img
                    alt=""
                    aria-hidden="true"
                    className="absolute right-[calc(100%+18px)] top-1/2 hidden size-10 -translate-y-1/2 object-contain sm:block"
                    src={item.icon}
                  />
                )}
                {item.time}
              </time>
              <span aria-hidden="true" className="relative flex self-stretch items-center justify-center">
                {index > 0 && <span className="absolute bottom-1/2 left-1/2 top-[-2rem] w-px -translate-x-1/2 bg-parchment/40 md:top-[-2.5rem]" />}
                {index < weddingData.timeline.length - 1 && (
                  <span className="absolute bottom-[-2rem] left-1/2 top-1/2 w-px -translate-x-1/2 bg-parchment/40 md:bottom-[-2.5rem]" />
                )}
                <span className="relative block size-2.5 rounded-full bg-parchment ring-2 ring-parchment/15" />
              </span>
              <span className="text-left text-[13px] text-parchment/70 md:text-[15px]">{item.label}</span>
            </li>
          ))}
        </ol>
      </InvitationCard>
    </section>
  );
}
