// src/components/adopciones/modal/ModalAprobarRechazarAdopcion.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { makePutRequest } from "@/services/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  adopcionId: number;
  nombrePerrito: string;
  onUpdated: () => void;
}

export default function ModalAprobarRechazarAdopcion({
  isOpen,
  onClose,
  adopcionId,
  nombrePerrito,
  onUpdated,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleAccion = async (accion: "aprobar" | "rechazar") => {
    try {
      setLoading(true);
      await makePutRequest(`/formulario/${adopcionId}/${accion}`);
      onClose();
      onUpdated();
    } catch (error) {
      console.error(`Error al ${accion} adopción`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
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
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-xl">
            <Dialog.Title className="text-lg font-semibold text-gray-800">
              Gestionar adopción
            </Dialog.Title>
            <p className="mt-2 text-sm text-gray-600">
              ¿Qué acción deseas tomar con la solicitud de adopción de <b>{nombrePerrito}</b>?
            </p>

            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => handleAccion("aprobar")}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Procesando...
                  </>
                ) : (
                  "Aprobar"
                )}
              </button>
              <button
                onClick={() => handleAccion("rechazar")}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Procesando...
                  </>
                ) : (
                  "Rechazar"
                )}
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={onClose}
                className="text-gray-500 hover:underline text-sm"
              >
                Cancelar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
