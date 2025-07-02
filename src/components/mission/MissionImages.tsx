import { useRef } from "react";
import dog_tree from "@/assets/image/home/dog_tree.jpg";
import dog_op from "@/assets/image/home/dog_op.jpg";
import dog_ini from "@/assets/image/home/dog_ini.jpg";
import dog_test from "@/assets/image/home/dog_test.jpg";
import dog_register from "@/assets/image/home/dog_register.jpg";
const galleryImages = [
    dog_tree,
    dog_op,
    dog_ini,
    dog_test,
    dog_register,
];

export default function MissionImages(){
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