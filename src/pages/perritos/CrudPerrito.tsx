// src/pages/perritos/CrudPerrito.tsx
import { useEffect, useState } from "react";
import TableGeneralCustom from "@/components/shared/TableGeneralCustom";
import ModalPerrito from "@/components/perrito/modal/ModalPerrito";
import ResultModal from "@/components/shared/resultModal";

import {
  FaEye,
  FaPencilAlt,
  FaRegTrashAlt,
  FaPlusCircle,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
} from "react-icons/fa";

import { Button, Input } from "@heroui/react";

import {
  fetchPerritos,
  fetchPerritoById,
  createPerrito,
  updatePerrito,
  deletePerrito,
} from "@/services/perritosService/perrito";
import Perrito from "@/interfaces/Perrito";

// Hook de debounce
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function CrudPerrito() {
  const [data, setData] = useState<Perrito[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Perrito | null>(null);
  const [selectedAction, setSelectedAction] = useState<0 | 1 | 2 | 3>(0);

  const [isResultOpen, setIsResultOpen] = useState(false);
  const [resultSuccess, setResultSuccess] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

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
      const fetched = await fetchPerritos(); 
      console.log("Datos recibidos desde fetchPerritos():", fetched); // 👈 Agrega esto    
      setData(fetched);
    } catch (err) {
      console.error("Error al cargar perritos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (item: Perrito | null, action: 0 | 1 | 2 | 3) => {
    setSelectedItem(item);
    setSelectedAction(action);
    setIsOpen(true);

    if (item?.id && (action === 1 || action === 2)) {
      fetchPerritoById(item.id).then((p) => p && setSelectedItem(p));
    }
  };

  const closeModal = () => setIsOpen(false);

  const handleChange = (e: any) =>
    setSelectedItem((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleConfirm = async () => {
    try {
      switch (selectedAction) {
        case 0:
          await createPerrito(new Perrito(selectedItem));
          break;
        case 2:
          await updatePerrito(new Perrito(selectedItem));
          break;
        case 3:
          await deletePerrito(selectedItem?.id ?? 0);
          break;
      }
      setResultSuccess(true);
      setResultMessage("Operación completada correctamente.");
      closeModal();
      loadData();
    } catch (err) {
      console.error(err);
      setResultSuccess(false);
      setResultMessage("Error al ejecutar la operación.");
    } finally {
      setIsResultOpen(true);
    }
  };

  const searchFields = ["nombre", "descripcion", "tamañoPerro"];

  const filtered = data.filter((item) => {
    if (!debouncedSearch) return true;
    const text = debouncedSearch.toLowerCase();
    return searchFields.some((field) =>
      String(item[field as keyof Perrito]).toLowerCase().includes(text)
    );
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage
  );

  const columns = [
    { name: "ID", uid: "id" },
    { name: "Nombre", uid: "nombre" },
    { name: "Edad", uid: "edad" },
    { name: "Tamaño", uid: "tamañoPerro" },
    { name: "Descripción", uid: "descripcion" },
    { name: "Disponible", uid: "disponible" },
    { name: "Imágenes", uid: "imagenes" },       
    { name: "Acciones", uid: "actions" }
    
  ];

  const renderCell = (item: Perrito, key: string): React.ReactNode => {
    switch (key) {
      case "disponible":
        return (
          <span className={item.disponible ? "text-green-600" : "text-red-600"}>
            {item.disponible ? "Sí" : "No"}
          </span>
        );
      case "imagenes":
        return (
          <span className="text-sm">
            {item.imagenes?.length || 0} imagen
            {item.imagenes?.length === 1 ? "" : "es"}
          </span>
        );
      case "fechaRegistro":
      return item.fechaIngreso
        ? new Date(item.fechaIngreso).toLocaleString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })

        : "Sin fecha";  
      case "descripcion":
        return <span className="truncate max-w-[200px]">{item.descripcion}</span>;
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Button title="Ver" onClick={() => openModal(item, 1)} className="text-blue-600">
              <FaEye />
            </Button>
            <Button title="Editar" onClick={() => openModal(item, 2)} className="text-green-600">
              <FaPencilAlt />
            </Button>
            <Button title="Eliminar" onClick={() => openModal(item, 3)} className="text-red-600">
              <FaRegTrashAlt />
            </Button>
          </div>
        );
      default: {
        const value = item[key as keyof Perrito];
        // Only return primitives or JSX, never arrays/objects/functions
        if (
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean" ||
          value === null ||
          value === undefined
        ) {
          return value as React.ReactNode;
        }
        // For arrays or objects, render as JSON string or a placeholder
        if (Array.isArray(value)) {
          return <span>{JSON.stringify(value)}</span>;
        }
        if (typeof value === "object") {
          return <span>{JSON.stringify(value)}</span>;
        }
        return null;
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <ResultModal
        isOpen={isResultOpen}
        onClose={() => setIsResultOpen(false)}
        success={resultSuccess}
        message={resultMessage}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Gestión de Perritos</h1>
        <Button
          className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
          onClick={() => openModal({} as Perrito, 0)}
        >
          <FaPlusCircle className="w-5 h-5" />
          Registrar
        </Button>
      </div>

      <div className="bg-white rounded shadow-md p-4">
        <Input
          type="text"
          placeholder="Buscar perritos..."
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
            <span className="mt-2 text-gray-500">Cargando perritos...</span>
          </div>
        ) : (
          <>
            <TableGeneralCustom
              master={{ data: currentData, columns }}
              renderCellPadre={renderCell}
            />

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
              <span className="mb-2 sm:mb-0">
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

      {selectedItem && (
        <ModalPerrito
          isOpen={isOpen}
          onClose={closeModal}
          selectedItem={selectedItem}
          handleChange={handleChange}
          handleConfirm={handleConfirm}
          selectedAction={selectedAction}
        />
      )}
    </div>
  );
}
