import { useState } from "react";
import CeremonySection from "./components/CeremonySection";
import GallerySection from "./components/GallerySection";
import GiftSection from "./components/GiftSection";
import GuestbookSection from "./components/GuestbookSection";
import HeroSection from "./components/HeroSection";
import MusicToggle from "./components/MusicToggle";
import ReceptionSection from "./components/ReceptionSection";
import RsvpModal from "./components/RsvpModal";
import TimelineSection from "./components/TimelineSection";

export default function App() {
  const [rsvpOpen, setRsvpOpen] = useState(false);

  return (
    <div className="min-h-dvh w-full bg-white">
      <main
        id="main-content"
        className="mx-auto min-h-dvh w-full max-w-[480px] overflow-hidden md:max-w-[900px]"
      >
        <div className="invitation-shell min-h-dvh w-full">
          <HeroSection />
          <CeremonySection />
          <GallerySection />
          <ReceptionSection onOpenRsvp={() => setRsvpOpen(true)} />
          {/* <TimelineSection />
          <GuestboowkSection /> */}
          <GiftSection />
          <footer className="relative z-10 flex flex-col items-center px-6 pb-8 text-center font-invitation text-xs leading-relaxed md:text-[13px]">
            <p className="max-w-[560px]">
              Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng
              tôi!
            </p>
            <span aria-hidden="true" className="mt-4 text-antique-gold">
              ◆
            </span>
          </footer>
        </div>
      </main>

      <MusicToggle />
      <RsvpModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </div>
  );
}
