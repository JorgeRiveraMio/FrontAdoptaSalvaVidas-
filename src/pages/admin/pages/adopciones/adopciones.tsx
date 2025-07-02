//src/pages/admin/subpages/adopciones.tsx
import { useEffect, useState, Fragment } from "react";
import { FaEye, FaSpinner, FaPencilAlt } from "react-icons/fa";
import { Button } from "@heroui/react";
import TableGeneralCustom from "@/components/shared/TableGeneralCustom";
import { makeGetRequest, makePutRequest } from "@/services/api";
import ModalAdopcionDetalle from "@/components/adopciones/modal/ModalAdopcionDetalle";
import { Adopcion } from "@/interfaces/adopcion.interface";
import { Dialog, Transition } from "@headlessui/react";

export default function AdopcionesAdmin() {
  const [data, setData] = useState<Adopcion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Adopcion | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalGestionOpen, setModalGestionOpen] = useState(false);
  const [gestionItem, setGestionItem] = useState<Adopcion | null>(null);

  const [filtroGeneral, setFiltroGeneral] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  useEffect(() => {
    fetchAdopciones();
  }, []);

  const fetchAdopciones = async () => {
    try {
      const result = await makeGetRequest("/formulario");
      setData(result);
    } catch (err) {
      console.error("Error al cargar adopciones:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGestion = async (accion: "aprobar" | "rechazar") => {
    if (!gestionItem) return;
    try {
      await makePutRequest(`/formulario/${gestionItem.id}/${accion}`);
      setModalGestionOpen(false);
      fetchAdopciones();
    } catch (err) {
      console.error(`Error al ${accion} adopción`, err);
    }
  };

  const filteredData = data.filter((item) => {
    const usuario = item.usuario?.name?.toLowerCase() ?? "";
    const perrito = item.perro?.nombre?.toLowerCase() ?? "";
    const estado = item.estado ?? "";
    const search = filtroGeneral.toLowerCase();

    return (
      (usuario.includes(search) || perrito.includes(search)) &&
      (filtroEstado === "" || estado === filtroEstado)
    );
  });

  const columns = [
    { name: "ID", uid: "id", weight: 0.2 },
    { name: "Usuario", uid: "usuario", weight: 1 },
    { name: "Perrito", uid: "perro", weight: 1 },
    { name: "Fecha", uid: "fechaSolicitud", weight: 1 },
    { name: "Estado", uid: "estado", weight: 1 },
    { name: "Teléfono", uid: "telefono", weight: 1 },
    { name: "Acciones", uid: "actions" },
  ];

  const renderCell = (item: Adopcion, key: string): React.ReactNode => {
    const typedKey = key as keyof Adopcion;

    switch (key) {
      case "usuario":
        return item.usuario?.name ?? "—";
      case "perro":
        return item.perro?.nombre ?? "—";
      case "fechaSolicitud":
        return new Date(item.fechaSolicitud).toLocaleString();
      case "actions":
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setSelectedItem(item);
                setIsOpen(true);
              }}
              className="p-1 text-blue-600 min-w-0 h-7 w-7 flex items-center justify-center"
              title="Ver detalles"
            >
              <FaEye className="text-sm" />
            </Button>
            <Button
              onClick={() => {
                setGestionItem(item);
                setModalGestionOpen(true);
              }}
              className="p-1 text-orange-600 min-w-0 h-7 w-7 flex items-center justify-center"
              title="Aprobar / Rechazar"
            >
              <FaPencilAlt className="text-sm" />
            </Button>
          </div>
        );
      default:
        const value = item[typedKey];
        return typeof value === "object" ? JSON.stringify(value) : value ?? "—";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        Gestión de Adopciones
      </h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Buscar por usuario o perrito"
          value={filtroGeneral}
          onChange={(e) => setFiltroGeneral(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
        />
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
        >
          <option value="">Todos los estados</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="APROBADO">Aprobado</option>
          <option value="RECHAZADO">Rechazado</option>
        </select>
      </div>

      <div className="bg-white rounded shadow-md p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-3xl text-gray-500" />
            <span className="mt-2 text-gray-500">Cargando adopciones...</span>
          </div>
        ) : (
          <TableGeneralCustom
            master={{ data: filteredData, columns }}
            renderCellPadre={renderCell}
          />
        )}
      </div>

      {isOpen && selectedItem && (
        <ModalAdopcionDetalle
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          adopcion={selectedItem}
        />
      )}

      <Transition show={modalGestionOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setModalGestionOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-xl">
              <Dialog.Title className="text-lg font-semibold text-gray-800">
                ¿Qué acción deseas tomar?
              </Dialog.Title>
              <p className="mt-2 text-sm text-gray-600">
                Solicitud para adoptar a <b>{gestionItem?.perro.nombre}</b>
              </p>

              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => handleGestion("aprobar")}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => handleGestion("rechazar")}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded"
                >
                  Rechazar
                </button>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setModalGestionOpen(false)}
                  className="text-gray-500 hover:underline text-sm"
                >
                  Cancelar
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
