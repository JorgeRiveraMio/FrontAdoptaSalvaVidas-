//Página de Voluntariado
//Imagenes
import Team from '@/assets/image/home/solidary.jpg'
import Op from '@/assets/image/home/voluntariado.jpg'
import { useRef } from "react";
import { Link } from "react-router-dom";

import team_one from "@/assets/image/home/team_one.jpg";
import team_two from "@/assets/image/home/team_two.jpg";
import team_tree from "@/assets/image/home/team_tree.jpg";
import team_four from "@/assets/image/home/team_four.jpg";
import dog_register from "@/assets/image/home/dog_register.jpg";
import UPN from "@/assets/image/home/UPN.png";
import UCV_logo from "@/assets/image/home/UCV_logo.png";
import UNMSM from "@/assets/image/home/UNMSM.png";
import Ulima_tree from "@/assets/image/home/Ulima_tree.png";
import UTP from "@/assets/image/home/UTP.png";

const galleryImages = [
    team_one,
    team_two,
    team_tree,
    team_four,
    dog_register,
];
type Aliados ={
    id: number,
    nombreCompleto: string,
    imagen: string,
}

const voluntarios_u: Aliados[] =[
    {
        id: 1,
        nombreCompleto: "UPN",
        imagen: UPN,
    },
    {
        id: 2,
        nombreCompleto: "Julio Zapata",
        imagen: UCV_logo,
    },
    {
        id: 3,
        nombreCompleto: "Guillermo Perez",
        imagen: UNMSM,
    },
    {
        id: 4,
        nombreCompleto: "Pablo Terrones",
        imagen: Ulima_tree,
    },
    {
        id: 5,
        nombreCompleto: "Sara Gutierrez",
        imagen: UTP,
    },
]


export default function Voluntariado(){
    const scrollRef = useRef<HTMLDivElement>(null);
    
        const scroll = (direction: "left" | "right") => {
            if (scrollRef.current) {
            const amount = 400;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -amount : amount,
                behavior: "smooth",
            });
            }
        };

    return(
        <>
            <section className='py-20'>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    
                    {/* Imagen con overlay y superposición */}
                    <div className="relative max-w-lg h-[700px]">
                    {/* Imagen principal */}
                    <img
                        src={Team}
                        alt="Imagen principal"
                        className="rounded-xl w-full h-full object-cover"
                    />

                    {/* Imagen secundaria sobrepuesta */}
                    <img
                        src={Op}
                        alt="Imagen encima"
                        className="absolute bottom-[80px] right-[-40px] w-64 rounded-xl shadow-xl object-cover"
                    />
                    </div>


                    {/* Contenido de texto */}
                    <div className="font-fam-desk" data-aos="fade-left">
                        <h2 className="text-5xl font-bold text-red-700 mb-6 font-fam-desk capitalize">
                            Únete como voluntario
                        </h2>

                        <p className="text-gray-700 text-lg mb-4 font-fam-two leading-relaxed">
                            En nuestro albergue, cada acción cuenta. Como voluntario, serás parte fundamental en el rescate, cuidado y recuperación de perritos en situación de abandono. Nos dedicamos a brindarles una segunda oportunidad y, con tu ayuda, podemos lograrlo.
                        </p>

                        <p className="text-gray-700 text-lg mb-6 font-fam-two leading-relaxed">
                            También promovemos la educación sobre la tenencia responsable, construyendo juntos una comunidad más empática y consciente. ¡Tu tiempo y compromiso pueden transformar vidas!
                        </p>


                        {/* Botón de voluntariado */}
                        <div className="mt-6 text-left">
                        <div className="flex flex-wrap gap-4 mt-6">
                        {/* Botón Contacto */}
                        <Link
                            to="/voluntariado"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-red-700 text-white font-semibold shadow-md hover:bg-red-800 transition duration-300"
                        >
                            Contacto
                            <i className="ml-2 fa-solid fa-arrow-right"></i>
                        </Link>
                        {/* Botón Donaciones */}
                        <a
                            href="https://wa.me/51955288116"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-yellow-400 text-gray-900 font-semibold shadow-md hover:bg-yellow-500 transition duration-300"
                        >
                            Donaciones
                            <i className="ml-2 fa-solid fa-heart"></i>
                        </a>

                        </div>
                    </div>
                    </div>
                </div>
                {/* Gracias a los participantes */}
            </section>
            {/* Seccion de participantes o Universitarios -----------------------------------------------------*/}
            <section className="pb-12">
                <div className=''>
                    <div className='max-w-7xl mx-auto'>
                    <h2 className='font-fam-desk font-bold text-5xl text-center'><span className='text-red-600'>Voluntarios</span> de diferentes <span className='text-red-600'>universidades</span></h2>

                    </div>
                    <div className="overflow-hidden relative">
                        <div className="flex animate-scroll-x-loop w-max">
                        {[...voluntarios_u, ...voluntarios_u].map(({ id, nombreCompleto, imagen }, index) => (
                            <div
                                key={`${id}-${index}`}
                                className="relative min-w-[250px] max-w-[280px] h-72 mx-3 overflow-hidden flex-shrink-0"
                                >
                                <img
                                    src={imagen}
                                    alt={nombreCompleto}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* --------------------------------------------------------------------- */}
            {/* Fotos de grupos */}
            <section className="pb-20 bg-white px-4">
            <div className="max-w-7xl mx-auto text-center">

            {/* Botones de control */}
            <div className="flex justify-end gap-3 mb-6">
            <button
                onClick={() => scroll("left")}
                className="border border-gray-300 p-4 rounded-full text-gray-700 hover:bg-gray-100 transition"
                aria-label="Izquierda"
            >
                <i className="w-6 h-5 fa-solid fa-arrow-left"></i>
            </button>
            <button
                onClick={() => scroll("right")}
                className="border border-gray-300 p-4 rounded-full text-gray-700 hover:bg-gray-100 transition"
                aria-label="Derecha"
            >
                <i className="w-6 h-5 fa-solid fa-arrow-right"></i>
            </button>
            </div>

            {/* Carrusel de imágenes */}
            <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
            >
            {galleryImages.map((src, index) => (
                <div
                key={index}
                className="min-w-[450px] max-w-[400px] h-[450px] snap-start flex-shrink-0 rounded-xl overflow-hidden shadow-md"
                >
                <img
                    src={src}
                    alt={`Equipo ${index + 1}`}
                    className="w-full h-full object-cover"
                />
                </div>
            ))}
            </div>
        </div>
        </section>
        </>
    )
}