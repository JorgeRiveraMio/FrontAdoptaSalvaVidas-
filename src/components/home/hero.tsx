import { Button } from "@heroui/button";
import { Link } from "react-router-dom";

// src/components/home/hero.tsx
export default function Hero() {
  return (
    <section className="relative flex items-center justify-center h-dvh overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/109612-685086112_medium.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>

      {/* Capa oscura para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent z-10"></div>

      {/* Contenido centrado */}
      <div className="relative z-20 max-w-3xl mx-auto text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold sm:text-5xl font-fam-desk">
          Da un Hogar, Salva una Vida
        </h1>
        <p className="mt-6 text-lg font-fam-two">
          Cada perrito merece amor, cuidados y una familia para siempre. ¡Únete a nuestra misión!
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-6">
          <Button
            as={Link}
            to="/adopta"
            color="secondary"
            size="lg"
            className="font-fam-two bg-yellow-400 text-gray-900 rounded-full font-bold px-8 py-4 shadow-lg hover:bg-yellow-500 transition"
          >
            Adopta un Amigo <i className="fa-solid fa-paw ml-2"></i>
          </Button>
          {/* <Button
            as="a"
            href="/mision"
            color="primary"
            size="lg"
            className="font-fam-two px-8 py-4 font-bold shadow-lg rounded-full"
          >
            Apoya Nuestra Misión
          </Button> */}
        </div>
      </div>
    </section>

  );
}
