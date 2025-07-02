// src/components/mission/MissionHeroSection.tsx
import EquipoDetras from "@/assets/image/home/equipo_detras.jpg";

export default function MissionHeroSection() {
  return (
    <section
      className="relative h-[500px] flex items-center justify-center text-center text-white overflow-hidden"
      style={{
        backgroundImage: `url(${EquipoDetras})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay semitransparente rojo */}
      <div className="absolute inset-0 bg-black-700/40" />

      <div className="relative z-10 px-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold mb-2 flex items-center justify-center gap-2">
          <span className="text-yellow-400 text-2xl">🐾</span>
          ¿Quiénes Somos?
        </h1>
        <p className="text-lg text-white-300">
          Rescatamos, rehabilitamos y educamos para darles a los perros una segunda oportunidad.
        </p>
      </div>
    </section>
  );
}
