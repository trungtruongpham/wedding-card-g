export default function InvitationCard({ children, className = "" }) {
  return (
    <div
      className={`burgundy-card relative overflow-hidden rounded-[13px] px-5 py-9 text-center ${className}`}
    >
      <div className="relative z-10 flex flex-col items-center gap-6 text-parchment">
        {children}
      </div>
    </div>
  );
}

export function FlowerDecoration({ position = "right", className = "" }) {
  const positionClass = position === "left" ? "-left-[16%]" : "-right-[18%]";

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 block w-[34%] ${positionClass} ${className}`}
    >
      <span className="animate-float-delayed block">
        <img2222
          alt=""
          src="/assets/flower-decoration.webp"
          className="block w-full max-w-none object-contain drop-shadow-[3px_4px_3px_rgb(0_0_0/0.28)]"
        />
      </span>
    </span>
  );
}

export function SectionHeading({ children, light = false, className = "" }) {
  return (
    <h2
      className={`font-invitation text-[20px] font-bold uppercase tracking-[0.06em] ${light ? "text-parchment" : "text-burgundy"} ${className}`}
    >
      {children}
    </h2>
  );
}
