import { weddingData } from "../data/wedding-data";
import InvitationCard, {
  FlowerDecoration,
  SectionHeading,
} from "./InvitationCard";
import VenueSection from "./VenueSection";

const weekdayLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function formatGoogleDate(date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function createCalendarUrl() {
  const { reception, venue, couple } = weddingData;
  const start = new Date(reception.startsAt);
  const end = new Date(
    start.getTime() + reception.durationHours * 60 * 60 * 1000,
  );
  const location = `${venue.name}, ${venue.address}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Đám cưới ${couple.groom.fullName} & ${couple.bride.fullName}`,
    dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
    ctz: "Asia/Ho_Chi_Minh",
    details: `Tiệc cưới của ${couple.groom.fullName} và ${couple.bride.fullName}`,
    location,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

function Calendar() {
  const eventDate = new Date(weddingData.reception.startsAt);
  const eventEndDate = new Date(weddingData.reception.endAt);
  const year = eventDate.getFullYear();
  const month = eventDate.getMonth();
  const selectedDay = [eventDate.getDate(), eventEndDate.getDate()];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  return (
    <div className="mx-auto mt-3 w-[280px] max-w-full overflow-hidden rounded-[10px] bg-parchment px-4 pb-4 pt-2 text-burgundy md:w-[330px]">
      <p className="border-b border-burgundy/25 py-2.5 text-center font-display text-[24px]">
        Tháng {month + 1} / {year}
      </p>
      <div className="grid grid-cols-7 border-b-2 border-burgundy">
        {weekdayLabels.map((label) => (
          <span
            key={label}
            className="py-1.5 text-center text-[11px] font-medium opacity-65"
          >
            {label}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
        {cells.map((day, index) => (
          <span
            key={`${day ?? "empty"}-${index}`}
            className="flex h-[30px] items-center justify-center text-xs md:h-[34px] md:text-[13px]"
          >
            {selectedDay.includes(day) ? (
              <span className="relative grid h-7 w-8 place-items-center text-[11px] font-bold text-white md:h-8 md:w-9 md:text-xs">
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full drop-shadow-sm"
                  viewBox="0 0 24 22"
                  fill="#511419"
                >
                  <path d="M12 21S1.5 13.5 1.5 7.5A5.5 5.5 0 0 1 12 4.8a5.5 5.5 0 0 1 10.5 2.7C22.5 13.5 12 21 12 21Z" />
                </svg>
                <span className="relative">{day}</span>
              </span>
            ) : (
              day
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ReceptionSection({ onOpenRsvp }) {
  const { reception, ceremony } = weddingData;

  return (
    <section
      aria-labelledby="reception-heading"
      className="relative z-10 mx-auto mb-4 w-[88%] max-w-[420px] md:max-w-[560px]"
    >
      <FlowerDecoration position="left" className="top-[8%]" />
      <InvitationCard>
        <div className="flex flex-col items-center gap-4 font-invitation md:gap-5">
          <VenueSection></VenueSection>

          <Calendar />

          <a
            href={createCalendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="grid min-h-11 place-items-center px-3 text-sm underline decoration-parchment/55 underline-offset-4 transition-colors hover:text-white"
          >
            Thêm vào lịch
          </a>

          <button
            type="button"
            onClick={onOpenRsvp}
            className="min-h-11 cursor-pointer rounded-full bg-parchment px-7 py-2 font-invitation text-sm font-semibold tracking-wide text-burgundy transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Xác nhận tham dự
          </button>
        </div>
      </InvitationCard>
    </section>
  );
}
