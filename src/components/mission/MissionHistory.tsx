//src/components/mission/MissionHistory.tsx

import ImgDog from "@/assets/image/home/img_dog.jpg";
import DogTest from "@/assets/image/home/about_p.jpg";
import happy from "@/assets/image/home/happy.jpg";
import equipo from "@/assets/image/home/equipo.jpg";

const features = [
    "Atención dedicada a cada perrito.",
    "Transparencia en cada proceso de adopción.",
    "Colaboración con veterinarios certificados.",
    "Ambiente limpio y seguro.",
    "Seguimiento post-adopción responsable.",
];

export default function MissionHistory() {
    return (
        <>
            <section className="w-full bg-gradient-to-r from-white to-gray-50 shadow-md">
                <div className="relative w-full h-80 sm:h-96 lg:h-[22rem] overflow-hidden">
                    <img
                    src={happy}
                    alt="Publicidad"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    {/* Overlay oscuro para contraste */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-10" />

                    {/* Contenido centrado */}
                    <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center px-4 sm:px-8 max-w-3xl text-white">
                        <p className="text-center text-lg">Albergue</p>
                        <h1 className="text-3xl sm:text-5xl font-bold leading-tight font-fam-desk">
                            Adopta Salva Vidas
                        </h1>
                    </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-28 items-center">
                    {/* LADO IZQUIERDO: Imagen principal + secundaria */}
                    <div className="relative h-[700px] w-full">
                        <img
                            src={DogTest}
                            alt="Perrito principal"
                            className="rounded-xl w-full h-full object-cover"
                        />
                        <img
                            src={ImgDog}
                            alt="Perrito decorativo"
                            className="absolute bottom-8 right-[-40px] w-52 md:w-64 rounded-xl shadow-xl object-cover"
                        />
                    </div>

                    {/* LADO DERECHO: Título, descripción, características */}
                    <div className="font-fam">
                    <h2 className="text-5xl font-bold text-[#cb3240] mb-4 font-fam-desk">
                        ¿Quiénes Somos?
                    </h2>
                    <p className="text-gray-700 mb-6 font-fam-two text-lg">
                        Somos una organización sin fines de lucro dedicada al rescate, cuidado y adopción
                        de perritos en situación de abandono. Nuestro compromiso es brindarles amor, salud
                        y un nuevo hogar.
                    </p>
                    <ul className="space-y-3">
                        {features.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 font-fam-two">
                            <span className="text-[#cb3240] text-xl"><i className="fa-solid fa-circle-check"></i></span>
                            <span className="text-gray-800">{item}</span>
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </section>
            <section className="bg-white pt-0 px-6 font-fam-ge">
                <div className="max-w-6xl mx-auto text-center font-fam-two">
                    {/* Texto principal */}
                    <p className="text-base md:text-lg text-gray-700 mb-9 text-justify">
                        Nuestro albergue nació del amor incondicional hacia los animales. Comenzamos con un solo rescate, 
                        en una pequeña casa, sin más recursos que el corazón lleno de esperanza.
                        Hoy somos una familia comprometida con brindar segundas oportunidades a perritos que han sido 
                        abandonados, maltratados o ignorados. Los rehabilitamos física y emocionalmente y les buscamos 
                        un hogar lleno de cariño.
                        Cada ladrido, cada cola moviéndose, cada adopción… es un paso más hacia un mundo mejor. 
                        <span className="font-semibold text-red-400"> ¡Gracias por ser parte de esta misión!</span>
                    </p>

                    {/* Imagen de equipo o del albergue Falta */}
                    <img
                    src={equipo}
                    alt="Foto del equipo del albergue"
                    className="rounded-xl shadow-lg w-full max-w-6xl mx-auto object-cover"
                    />
                </div>

            </section>
        </>
    );
}
