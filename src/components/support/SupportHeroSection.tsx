// src/components/support/SupportHeroSection.tsx

export default function SupportHeroSection() {
  return (
    <section
      className="relative h-[400px] flex items-center justify-center text-center text-white overflow-hidden"
      style={{
        backgroundImage: "url('https://i.imgur.com/LObCT3j_d.webp?maxwidth=760&fidelity=grand')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay rojo suave */}
      <div className="absolute inset-0 bg-red-700/40" />

      <div className="relative z-10 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
          Apoya Nuestra Misión
        </h1>
        <p className="text-lg">
          Tu ayuda brinda comida, atención médica y un hogar a nuestros perritos.
        </p>
        <a
          href="https://wa.me/902985139?text=%C2%A1Hola!%20Quiero%20hacer%20una%20donaci%C3%B3n%20y%20apoyar%20la%20misión%20del%20albergue."  
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold shadow hover:bg-yellow-500 transition"
        >
          Donar Ahora
        </a>
      </div>
    </section>
  );
}
