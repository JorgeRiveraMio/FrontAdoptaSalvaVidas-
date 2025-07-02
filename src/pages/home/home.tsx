// src/pages/home/home.tsx
import HeroImage from "@/components/home/hero";
import AdoptableFriends from "@/components/home/adoptable-friends";
import MissionSection from "@/components/home/missionSection";
import CallToActionSection from "@/components/home/callToActionSection";

import Preguntas from "./components/Preguntas";
import ImpactoOp from "./components/ImpactoOp";
import EquipoOp from "./components/EquipoOp";
import SituacionOp from "./components/SituacionOp";

export default function Home() {
  return (
    <>
      {/* Sección Hero */}
      <HeroImage />

      {/* Sección Impacto */}
      <ImpactoOp />

      {/* Sección Adoptable Friends */}
      <AdoptableFriends />

      {/* Sección Misión */}
      <MissionSection />

      {/* Nuestro equipo */}
      <EquipoOp />

      {/* Situación */}
      <SituacionOp />

      {/* Preguntas Frecuentes */}
      <Preguntas />

      {/* Sección Llamado a la Acción */}
      <CallToActionSection />

      {/* <Footer /> */}
    </>
  );
}
