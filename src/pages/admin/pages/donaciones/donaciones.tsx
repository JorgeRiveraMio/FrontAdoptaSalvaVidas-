// Archivo adaptado: src/pages/admin/subpages/donaciones.tsx

import { useEffect, useState } from "react";
import {

  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
} from "react-icons/fa";
import { Button, Input } from "@heroui/react";
import TableGeneralCustom from "@/components/shared/TableGeneralCustom";

import {
  fetchDonaciones,
  Donacion
  // fetchDonacionById,
  // createDonacion,
  // updateDonacion,
  // deleteDonacion,
} from "@/services/donaciones/donaciones";



function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function Donaciones() {
  const [data, setData] = useState<Donacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const fetched = await fetchDonaciones();
      setData(fetched);
    } catch (err) {
      console.error("Error al cargar donaciones:", err);
    } finally {
      setIsLoading(false);
    }
  };


  const filtered = data.filter((item) => {
  if (!debouncedSearch) return true;

  const text = debouncedSearch.toLowerCase();

  return (
    (item.descripcion?.toLowerCase().includes(text)) ||
    (item.mensaje?.toLowerCase().includes(text)) ||
    (item.nombreDonante?.toLowerCase().includes(text)) ||
    (item.usuario?.name?.toLowerCase().includes(text))
  );
});


  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage
  );

  const columns = [
    { name: "ID", uid: "id" },
    { name: "Monto", uid: "monto" },
    { name: "Tipo", uid: "tipoDonacion" },
    { name: "Método Pago", uid: "metodoPago" },
    { name: "Nombre Donante", uid: "nombreDonante" },
    { name: "Tipo Donante", uid: "tipoDonante" },
    { name: "Mensaje", uid: "mensaje" },
    { name: "Fecha", uid: "fecha" }

  ];

  const renderCell = (item: Donacion, key: string): React.ReactNode => {
    switch (key) {
      case "fecha":
        return new Date(item.fecha).toLocaleString("es-PE", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      case "nombreDonante":
       return item.usuario?.name || item.nombreDonante || "Anónimo";

   
      default:
        return String(item[key as keyof Donacion] ?? "");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Gestión de Donaciones</h1>
        {/* Si se permite registrar donaciones manualmente */}
        {/* <Button className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-amber-600 text-white" onClick={...}>
          <FaPlusCircle className="w-5 h-5" /> Registrar
        </Button> */}
      </div>

      <div className="bg-white rounded shadow-md p-4">
        <Input
          type="text"
          placeholder="Buscar donaciones por Nomnbre"
          value={searchText}
          onChange={(e) => {
            setCurrentPage(1);
            setSearchText(e.target.value);
          }}
          className="mb-4"
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-3xl text-gray-500" />
            <span className="mt-2 text-gray-500">Cargando donaciones...</span>
          </div>
        ) : (
          <>
            <div className="max-w-[1200px] w-full overflow-x-auto">
              <div className="scale-[0.90] origin-top-left">
                <TableGeneralCustom
                  master={{ data: currentData, columns }}
                  renderCellPadre={renderCell}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
              <span>
                Mostrando {currentData.length} de {filtered.length} resultados
              </span>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
                >
                  <FaChevronLeft />
                </Button>
                <span>
                  Página {currentPage} de {totalPages || 1}
                </span>
                <Button
                  onClick={() => currentPage < totalPages && setCurrentPage((p) => p + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
                >
                  <FaChevronRight />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
