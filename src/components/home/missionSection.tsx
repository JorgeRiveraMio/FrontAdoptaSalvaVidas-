// src/components/home/MissionSection.tsx
import { Link } from "react-router-dom";
import ImgDog from "@/assets/image/home/img_dog.jpg";
import DogTest from "@/assets/image/home/adopta_home.jpg";
// import Responsable from "@/assets/image/home/responsable.png";
// import Cuidado from "@/assets/image/home/cuidado.png";
// import Equipo from "@/assets/image/home/equipo.png";
import Donation from "./donation";

export default function MissionSection() {
  return (
    <section className="pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Imagen con overlay y superposición */}
        <div className="relative max-w-lg h-[700px]">
          {/* Imagen principal */}
          <img
            src={DogTest}
            alt="Imagen principal"
            className="rounded-xl w-full h-full object-cover"
          />

          {/* Imagen secundaria sobrepuesta */}
          <img
            src={ImgDog}
            alt="Imagen encima"
            className="absolute bottom-[80px] right-[-40px] w-64 rounded-xl shadow-xl object-cover"
          />
        </div>


          {/* Contenido de texto */}
        <div className="font-fam-desk" data-aos="fade-left">
            <h2 className="text-5xl font-bold text-red-700 mb-6 font-fam-desk">¡ Se parte de nuestra misión !</h2>
            <p className="text-gray-700 text-lg mb-4 font-fam-two">
              Trabajamos incansablemente para cambiar vidas: rescatamos, rehabilitamos y reubicamos perros en hogares amorosos, mientras educamos a nuestra comunidad sobre la tenencia responsable.
            </p>

            {/* Donación */}
            <Donation></Donation>
            {/* Botón de voluntariado */}
            <div className="mt-6 text-left">
            <div className="flex flex-wrap gap-4 mt-6">
              {/* Botón Voluntariado */}
              <Link
                to="/voluntariado"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-red-700 text-white font-semibold shadow-md hover:bg-red-800 transition duration-300"
              >
                Voluntariado
                <i className="ml-2 fa-solid fa-arrow-right"></i>
              </Link>
              {/* Botón Donaciones */}
              <Link
                to="/donaciones"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-yellow-400 text-gray-900 font-semibold shadow-md hover:bg-yellow-500 transition duration-300"
              >
                Donaciones
                <i className="ml-2 fa-solid fa-heart"></i>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
