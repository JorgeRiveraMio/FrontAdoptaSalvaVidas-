// src/components/home/adoptable-friends.tsx
import { useEffect, useRef, useState } from "react";
import { PerritoDisponible } from "@/interfaces/PerritosDisponibles";
import { getPerritosDisponibles } from "@/services/PerritosDisponibles/perritosdisponibles";
import PerritoCard from "./PerritoCard";
import PerritoModal from "./PerritoModal";
import { Link } from "react-router-dom";

export default function AdoptableFriends() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [perritos, setPerritos] = useState<PerritoDisponible[]>([]);
  const [activeImageIndexes, setActiveImageIndexes] = useState<{ [id: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerrito, setSelectedPerrito] = useState<{ id: number; nombre: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPerritosDisponibles();
        setPerritos(data);

        const initialIndexes: { [id: number]: number } = {};
        data.forEach((p) => {
          initialIndexes[p.id] = 0;
        });
        setActiveImageIndexes(initialIndexes);
      } catch (error) {
        console.error("Error al obtener perritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndexes((prevIndexes) => {
        const updated: typeof prevIndexes = {};
        perritos.forEach((p) => {
          const current = prevIndexes[p.id] ?? 0;
          const next = (current + 1) % p.imagenes.length;
          updated[p.id] = next;
        });
        return updated;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [perritos]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const handleCardClick = (id: number, nombre: string) => {
    setSelectedPerrito({ id, nombre });
    setIsModalOpen(true);
  };

  return (
    <section className="w-full px-4 md:px-8 lg:px-16 bg-[#cb3240] py-14">
      <div className="max-w-7xl mx-auto text-white font-fam-ge">
        <div className="flex flex-col md:flex-row items-start justify-start gap-10 pt-12">
          <div className="md:w-auto">
            <h2 className="font-fam-desk text-5xl font-bold">
              Huellitas <br />
              <span>en adopción</span>
            </h2>
          </div>
          <div className="md:max-w-md">
            <p className="text-base md:text-lg font-fam-two">
              Adoptar no solo transforma la vida de un animal rescatado, también llena tu hogar de amor, alegría y lealtad incondicional.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white font-medium">Cargando perritos...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-2 z-10 pb-5 justify-end mt-6">
              <button
                onClick={() => scroll("left")}
                className="border p-4 rounded-full text-white transition hover:bg-white hover:text-[#cb3240]"
              >
                <i className="w-6 h-5 fa-solid fa-arrow-left"></i>
              </button>
              <button
                onClick={() => scroll("right")}
                className="border p-4 rounded-full shadow text-white hover:text-[#cb3240] hover:bg-white transition"
              >
                <i className="w-6 h-5 fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-6 px-6 scroll-smooth overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            >
              {perritos.map((perro) => (
                <PerritoCard
                  key={perro.id}
                  perro={perro}
                  imageIndex={activeImageIndexes[perro.id] || 0}
                  onClick={handleCardClick}
                />
              ))}
            </div>

            <div className="flex justify-center mt-10 mb-10 font-fam-desk">
              <Link
                to="/adopta"
                className="bg-white text-[#cb3240] px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
              >
                Ver todos los perritos <i className="ml-2 fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Modal de detalle */}
      {selectedPerrito && (
        <PerritoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          id={selectedPerrito.id}
          nombre={selectedPerrito.nombre}
        />
      )}
    </section>
  );
}
