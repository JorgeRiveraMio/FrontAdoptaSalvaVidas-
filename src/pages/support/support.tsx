// src/pages/adopt/adopt.tsx

import SupportHeroSection from "@/components/support/SupportHeroSection";
import Donation from "@/components/home/donation";

export default function support() {
  return (
    <main className="flex flex-col gap-16">

      {/* Sección Hero */}
      <SupportHeroSection />

      {/* Sección Donación */}
      <Donation />

    </main>

  );
}
