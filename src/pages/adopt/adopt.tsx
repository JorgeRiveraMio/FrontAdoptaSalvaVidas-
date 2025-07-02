// src/pages/adopt/adopt.tsx
import HeroAdoptSection from "@/components/adopt/HeroAdoptSection";
import FilterablePerritos from "@/components/adopt/FilterablePerritos";
import WhyAdoptSection from "@/components/adopt/WhyAdoptSection";
import WhatsAppCTASection from "@/components/adopt/WhatsAppCTASection";

export default function adopt() {
  return (
    <main className="flex flex-col gap-16">
      <HeroAdoptSection />
      <FilterablePerritos />
      <WhyAdoptSection />
      <WhatsAppCTASection />
    </main>
  );
}
