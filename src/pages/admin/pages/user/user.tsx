import { useEffect, useState } from "react";
import { FaEye, FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@heroui/react";
import TableGeneralCustom from "@/components/shared/TableGeneralCustom";
import { makeGetRequest } from "@/services/api";
import ModalUserDetalle from "@/components/user/modal/ModalUserDetalle";
import { Usuario } from "@/interfaces/user.interface";

export default function UsuariosAdmin() {
  const [data, setData] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Usuario | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [solicitudesMap, setSolicitudesMap] = useState<Record<number, number>>({});
  const [filtroGeneral, setFiltroGeneral] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const result = await makeGetRequest("/usuarios");
      setData(result);

      const counts: Record<number, number> = {};
      await Promise.all(
        result.map(async (usuario: Usuario) => {
          try {
            const res = await makeGetRequest(`/formulario/usuario/${usuario.id}`);
            counts[usuario.id] = Array.isArray(res) ? res.length : 0;
          } catch {
            counts[usuario.id] = 0;
          }
        })
      );
      setSolicitudesMap(counts);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = data.filter((item) => {
    const search = filtroGeneral.toLowerCase();
    return (
      item.name?.toLowerCase().includes(search) ||
      item.email?.toLowerCase().includes(search) ||
      item.username?.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { name: "ID", uid: "id", weight: 0.2 },
    { name: "Nombre", uid: "name", weight: 1 },
    { name: "Email", uid: "email", weight: 1 },
    { name: "Rol", uid: "rol", weight: 1 },
    { name: "Solicitudes", uid: "solicitudes", weight: 1 },
    { name: "Acciones", uid: "actions" },
  ];

  const renderCell = (item: Usuario, key: string): React.ReactNode => {
    switch (key) {
      case "name":
        return item.name;
      case "email":
        return item.email;
      case "rol":
        return item.rol?.name ?? "—";
      case "solicitudes":
        return solicitudesMap[item.id] ?? "—";
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
              as="a"
              href={`mailto:${item.email}`}
              className="p-1 text-green-600 min-w-0 h-7 w-7 flex items-center justify-center"
              title="Enviar correo"
            >
              📧
            </Button>
          </div>
        );
      default:
        return "—";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Listado de Usuarios</h1>

      <input
        type="text"
        placeholder="Buscar por nombre, email o username"
        value={filtroGeneral}
        onChange={(e) => {
          setCurrentPage(1);
          setFiltroGeneral(e.target.value);
        }}
        className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm mb-4"
      />

      <div className="bg-white rounded shadow-md p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-3xl text-gray-500" />
            <span className="mt-2 text-gray-500">Cargando usuarios...</span>
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
                Mostrando {currentData.length} de {filteredData.length} resultados
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

      {isOpen && selectedItem && (
        <ModalUserDetalle
          isOpen={true}
          onClose={() => setIsOpen(false)}
          usuario={selectedItem}
          cantidadSolicitudes={solicitudesMap[selectedItem.id] ?? 0}
        />
      )}
    </div>
  );
}
