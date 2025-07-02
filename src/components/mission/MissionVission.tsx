//src/components/mission/MissionVission.tsx

import Equipo from "@/assets/image/home/equipo.png";
import Responsable from "@/assets/image/home/responsable.png";
export default function MissionVission() {
    return (
        <section className="py-10 px-6 font-fam-ge">
            {/* <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-extrabold text-red-600 font-fam-two">Misión y Visión</h2>
                <p className="text-gray-700 mt-4 text-lg font-fam-two">
                El corazón de nuestro albergue late por el bienestar y futuro de nuestros peluditos.
                </p>
            </div> */}

        <div className="max-w-7xl mx-auto py-5 grid grid-cols-1 md:grid-cols-2 gap-12 font-fam-two text-center text-lg">
        {/* Misión */}
        <div className="bg-white rounded-xl p-8 transition duration-300">
            <div className="flex justify-center mb-4">
            <img
                src={Responsable}
                alt="Icono Misión"
                className="w-40 h-40"
            />
            </div>
            <h3 className="text-2xl font-bold text-red-700 mb-4">Misión</h3>
            <p className="text-gray-700 leading-relaxed">
            Rescatar, rehabilitar y reubicar a perros en situación de abandono, ofreciéndoles un hogar
            temporal lleno de amor y cuidados mientras encuentran una familia definitiva.
            </p>
        </div>

        {/* Visión */}
        <div className="bg-white rounded-xl p-8">
            <div className="flex justify-center mb-4">
            <img
                src={Equipo}
                alt="Icono Visión"
                className="w-40 h-40"
            />
            </div>
            <h3 className="text-2xl font-bold text-red-700 mb-4">Visión</h3>
            <p className="text-gray-700 leading-relaxed">
            Ser un referente en el rescate animal, promoviendo una sociedad empática, responsable y
            comprometida con el bienestar de todos los seres vivos, donde ningún perro viva en abandono.
            </p>
        </div>
        </div>


        </section>
    );
}
