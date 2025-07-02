import { useRef } from "react";
import pack_one from "@/assets/image/home/park_one.jpg";
import pack_two from "@/assets/image/home/park_two.jpg";
import pack_tree from "@/assets/image/home/park_tree.jpg";
import pack_four from "@/assets/image/home/park_four.jpg";
import pack_five from "@/assets/image/home/park_five.jpg";
const galleryImages = [
    pack_one,
    pack_two,
    pack_tree,
    pack_four,
    pack_five,
];

export default function EquipoOp() {
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

    return (
        <section className="pb-20 bg-white px-4">
            <div className="max-w-7xl mx-auto text-center">
                <div className="bg-green px-0 pb-0 pt-12">
                    <div className="flex flex-col md:flex-row items-start justify-start gap-10">
                        {/* Título */}
                        <div className="md:w-auto">
                            <h2 className="font-fam-desk text-black text-5xl font-bold md:text-5xl leading-snug">
                            <span className="block">Participación</span>
                            <span className="block text-left">en Ferias</span>
                            </h2>
                        </div>

                        {/* Párrafo */}
                        <div className="md:max-w-lg">
                            <p className="text-gray-700 text-base md:text-lg font-fam-two text-left">
                                Muchos de nuestras actividades involucra acercanos a las personas para que conozcan
                                los perfiles y cuidados de los perritos. Asimismo, nos ayuda a recaudar fondos mediante actividades 
                                para vender
                            </p>
                        </div>
                    </div>
                </div>

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
    );
}
