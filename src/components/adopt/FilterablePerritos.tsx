// src/components/adopt/FilterablePerritos.tsx
import { useEffect, useState } from "react";
import { PerritoDisponible } from "@/interfaces/PerritosDisponibles";
import { getPerritosDisponibles } from "@/services/PerritosDisponibles/perritosdisponibles";
import PerritoCard from "@/components/home/PerritoCard";
import PerritoModal from "@/components/home/PerritoModal";

export default function FilterablePerritos() {
  const [perritos, setPerritos] = useState<PerritoDisponible[]>([]);
  const [filtered, setFiltered] = useState<PerritoDisponible[]>([]);
  const [imageIndexes, setImageIndexes] = useState<{ [id: number]: number }>(
    {}
  );
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selected, setSelected] = useState<{
    id: number;
    nombre: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getPerritosDisponibles();
        setPerritos(data);
        setFiltered(data);
        const initialIndexes: { [id: number]: number } = {};
        data.forEach((p) => (initialIndexes[p.id] = 0));
        setImageIndexes(initialIndexes);
      } catch (error) {
        console.error("Error cargando perritos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prev) => {
        const next: typeof prev = {};
        perritos.forEach((p) => {
          const current = prev[p.id] || 0;
          next[p.id] = (current + 1) % p.imagenes.length;
        });
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [perritos]);

  useEffect(() => {
    let result = perritos;

    if (ageFilter > 0) {
      result = result.filter((p) => p.edad >= ageFilter);
    }

    if (search.trim() !== "") {
      const lower = search.toLowerCase();
      result = result.filter((p) => p.nombre.toLowerCase().includes(lower));
    }

    setFiltered(result);
    setVisibleCount(6);
  }, [search, ageFilter, perritos]);

  const availableAges = Array.from(new Set(perritos.map((p) => p.edad))).sort(
    (a, b) => a - b
  );

  return (
    <section className="bg-white py-12 px-4 md:px-8 lg:px-16 font-fam-ge">
      <h2 className="text-4xl font-bold text-center mb-6">Búsqueda</h2>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre..."
          className="border rounded-full px-6 py-3 w-full md:w-64 shadow focus:outline-none"
        />

        <select
          value={ageFilter}
          onChange={(e) => setAgeFilter(Number(e.target.value))}
          className="border rounded-full px-6 py-3 w-full md:w-48 shadow"
        >
          <option value={0}>Edad mínima</option>
          {availableAges.map((edad) => (
            <option key={edad} value={edad}>
              Desde {edad} años
            </option>
          ))}
        </select>
      </div>

      {/* Resultados */}
      {isLoading ? (
        <div className="flex flex-col items-center py-20 gap-4 text-gray-700">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent" />
          <p className="text-lg font-medium">Cargando perritos...</p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          No se encontraron perritos.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {filtered.slice(0, visibleCount).map((perro) => (
              <PerritoCard
                key={perro.id}
                perro={perro}
                imageIndex={imageIndexes[perro.id] || 0}
                onClick={(id, nombre) => setSelected({ id, nombre })}
              />
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="bg-red-600 text-white px-6 py-3 rounded-full shadow hover:bg-red-700 transition"
              >
                Ver más
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {selected && (
        <PerritoModal
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          id={selected.id}
          nombre={selected.nombre}
        />
      )}
    </section>
  );
}
