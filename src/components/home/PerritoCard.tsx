// src/components/home/PerritoCard.tsx
import { PerritoDisponible } from "@/interfaces/PerritosDisponibles";

interface Props {
  perro: PerritoDisponible;
  imageIndex: number;
  onClick: (id: number, nombre: string) => void;
}

export default function PerritoCard({ perro, imageIndex, onClick }: Props) {
  const imageUrl = perro.imagenes[imageIndex]?.url || "";

  return (
    <div
      onClick={() => onClick(perro.id, perro.nombre)}
      className="cursor-pointer min-w-[350px] max-w-[320px] bg-[#d55661] rounded-lg shadow-md flex-shrink-0 overflow-hidden group snap-start flex flex-col hover:shadow-lg transition-shadow duration-300"
    >
      {/* Imagen principal */}
      <div className="h-46 overflow-hidden">
        <img
          src={imageUrl}
          alt={perro.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Contenido textual */}
      <div className="p-4 flex flex-col gap-1 justify-between flex-grow font-fam-two text-white">
        <h3 className="text-lg font-bold mb-1">{perro.nombre}</h3>
        <p className="text-sm">
          <span className="font-semibold">Edad:</span> {perro.edad} años
        </p>
        <p className="text-sm">
          <span className="font-semibold">Tamaño:</span>{" "}
          {perro.tamañoPerro.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
        </p>
        <p className="text-sm mt-1 line-clamp-3">{perro.descripcion}</p>
      </div>
    </div>
  );
}
