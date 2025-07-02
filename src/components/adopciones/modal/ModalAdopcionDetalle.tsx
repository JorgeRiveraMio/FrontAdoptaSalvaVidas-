//src/components/adopciones/modal/ModalAdopcionDetalle.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Adopcion } from "@/interfaces/adopcion.interface";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  adopcion: Adopcion;
}

export default function ModalAdopcionDetalle({
  isOpen,
  onClose,
  adopcion,
}: Props) {
  const {
    nombreCompleto,
    telefono,
    direccion,
    tipoVivienda,
    tienePatios,
    viveEnFamilia,
    otrasMascotas,
    experienciaMascotas,
    tiempoDisponible,
    razonesAdopcion,
    comentario,
    estado,
    usuario,
    perro,
    fechaSolicitud,
  } = adopcion;

  const formatBool = (val?: boolean) => (val ? "Sí" : "No");
  const showOrDash = (val?: string) => val?.trim() || "-";

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("es-PE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold text-gray-900 mb-4"
                >
                  Detalles de la Solicitud de Adopción
                </Dialog.Title>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
                  <h4 className="md:col-span-2 font-semibold text-gray-700 border-b pb-1">
                    📋 Datos del solicitante
                  </h4>
                  <p>
                    <strong>Nombre:</strong> {showOrDash(nombreCompleto)}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {showOrDash(telefono)}
                  </p>
                  <p className="md:col-span-2">
                    <strong>Dirección:</strong> {showOrDash(direccion)}
                  </p>

                  <h4 className="md:col-span-2 font-semibold text-gray-700 border-b pb-1 mt-2">
                    🏠 Detalles de vivienda
                  </h4>
                  <p>
                    <strong>Tipo de vivienda:</strong>{" "}
                    {showOrDash(tipoVivienda)}
                  </p>
                  <p>
                    <strong>¿Tiene patio?:</strong> {formatBool(tienePatios)}
                  </p>
                  <p>
                    <strong>¿Vive con familia?:</strong>{" "}
                    {formatBool(viveEnFamilia)}
                  </p>
                  <p>
                    <strong>¿Tiene otras mascotas?:</strong>{" "}
                    {formatBool(otrasMascotas)}
                  </p>

                  <h4 className="md:col-span-2 font-semibold text-gray-700 border-b pb-1 mt-2">
                    🐶 Experiencia y motivación
                  </h4>
                  <p>
                    <strong>Experiencia con mascotas:</strong>{" "}
                    {showOrDash(experienciaMascotas)}
                  </p>
                  <p>
                    <strong>Tiempo disponible:</strong>{" "}
                    {showOrDash(tiempoDisponible)}
                  </p>
                  <p className="md:col-span-2">
                    <strong>Razones para adoptar:</strong>{" "}
                    {showOrDash(razonesAdopcion)}
                  </p>
                  <p className="md:col-span-2">
                    <strong>Comentario adicional:</strong>{" "}
                    {showOrDash(comentario)}
                  </p>

                  <h4 className="md:col-span-2 font-semibold text-gray-700 border-b pb-1 mt-2">
                    ✅ Confirmación y estado
                  </h4>
                  <p>
                    <strong>Estado:</strong> {showOrDash(estado)}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {formatDate(fechaSolicitud)}
                  </p>

                  <h4 className="md:col-span-2 font-semibold text-gray-700 border-b pb-1 mt-2">
                    📎 Relacionado
                  </h4>
                  <p>
                    <strong>Usuario:</strong> {showOrDash(usuario?.name)}
                  </p>
                  <p>
                    <strong>Nombre del perrito:</strong>{" "}
                    {showOrDash(perro?.nombre)}
                  </p>
                </section>

                <div className="mt-6 text-right">
                  <button
                    onClick={onClose}
                    className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                    aria-label="Cerrar modal"
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
