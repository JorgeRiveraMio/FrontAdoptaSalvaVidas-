//src/pages/admin/subpages/adopciones.tsx
import { useEffect, useState, Fragment } from "react";
import { FaEye, FaSpinner, FaPencilAlt } from "react-icons/fa";
import { Button } from "@heroui/react";
import TableGeneralCustom from "@/components/shared/TableGeneralCustom";
import { makeGetRequest, makePutRequest } from "@/services/api";
import ModalAdopcionDetalle from "@/components/adopciones/modal/ModalAdopcionDetalle";
import { Usuario } from "@/interfaces/user.interface";
import { Dialog, Transition } from "@headlessui/react";

export default function UsuariosAdmin() {
  const [data, setData] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Usuario | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [filtroGeneral, setFiltroGeneral] = useState("");

  useEffect(() => {
    fetchUsuarios();
  }, []);

//   const fetchUsuarios = async () => {
//     try {
//       const result = await makeGetRequest("/usuarios");
//       console.log("Usuarios cargados:", result);
//       setData(result);
//     } catch (err) {
//       console.error("Error al cargar usuarios:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getCantidadSolicitudesPorUsuario = async (usuarioId: number): Promise<number> => {
//   const result = await makeGetRequest(`/formulario/usuario/${usuarioId}`);
//   return Array.isArray(result) ? result.length : 0;
//     };

    const fetchUsuarios = async () => {
    try {
        const result = await makeGetRequest("/usuarios");
        setData(result);

        // obtener solicitudes por usuario
        const counts: Record<number, number> = {};
        await Promise.all(
        result.map(async (usuario: Usuario) => {
            try {
            const res = await makeGetRequest(`/formulario/usuario/${usuario.id}`);
            counts[usuario.id] = Array.isArray(res) ? res.length : 0;
            } catch (error) {
            console.error("Error al contar solicitudes del usuario", usuario.id, error);
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

const [solicitudesMap, setSolicitudesMap] = useState<Record<number, number>>({});


    const filteredData = data.filter((item) => {
    const nombre = item.name?.toLowerCase() ?? "";
    const correo = item.email?.toLowerCase() ?? "";
    const username = item.username?.toLowerCase() ?? "";
    const search = filtroGeneral.toLowerCase();

    return (
      nombre.includes(search) ||
      correo.includes(search) ||
      username.includes(search)
    );
  });

  const columns = [
    { name: "ID", uid: "id", weight: 0.2 },
    { name: "Nombre", uid: "name", weight: 1 },
    { name: "Email", uid: "email", weight: 1 },
    // { name: "Username", uid: "username", weight: 1 },
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
          </div>
        );
      default:
        return "—";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Listado de Usuarios</h1>

      {/* Filtro de búsqueda */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Buscar por nombre, email o username"
          value={filtroGeneral}
          onChange={(e) => setFiltroGeneral(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
        />
      </div>

      <div className="bg-white rounded shadow-md p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-3xl text-gray-500" />
            <span className="mt-2 text-gray-500">Cargando usuarios...</span>
          </div>
        ) : (
          <TableGeneralCustom
            master={{ data: filteredData, columns }}
            renderCellPadre={renderCell}
          />
        )}
      </div>

      {/* Modal de detalles si quieres mostrar info extra */}
      {isOpen && selectedItem && (
        <div className="mt-6 p-4 bg-white border rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700">Detalles del Usuario</h2>
          <p><b>ID:</b> {selectedItem.id}</p>
          <p><b>Nombre:</b> {selectedItem.name}</p>
          <p><b>Email:</b> {selectedItem.email}</p>
          <p><b>Username:</b> {selectedItem.username}</p>
          <p><b>Rol:</b> {selectedItem.rol?.name}</p>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 text-blue-600 hover:underline"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}