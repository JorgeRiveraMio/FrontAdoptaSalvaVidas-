//src/pages/mission/mission.tsx
// import MissionHeroSection from "@/components/mission/MissionHeroSection";
import MissionFeatures from "@/components/mission/MissionFeatures";
// import MissionCallToAction from "@/components/mission/MissionCallToAction";
import MissionHistory from "@/components/mission/MissionHistory";
import MissionVission from "@/components/mission/MissionVission";
import MissionImages from "@/components/mission/MissionImages";

export default function mission() {
  return (
    <>
      <MissionHistory />
      <MissionVission />
      {/* Sección de Características */}
      <MissionImages />
      <MissionFeatures />

      {/* Sección de Llamada a la Acción */}
      {/* <MissionCallToAction /> */}
    </>
      
            

  );
}
