import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Usuario } from "@/interfaces/user.interface"; // ajusta si usas otro path o nombre

interface Props {
  isOpen: boolean;
  onClose: () => void;
  usuario: Usuario;
  cantidadSolicitudes: number;
}

export default function ModalUserDetalle({ isOpen, onClose, usuario, cantidadSolicitudes }: Props) {

  const {
    name,
    email,   
    rol, 
  } = usuario;

  const showOrDash = (val?: string) => val?.trim() || "-";


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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold text-gray-900 mb-4"
                >
                  Detalles del Usuario
                </Dialog.Title>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
                  <p>
                    <strong>Nombre:</strong> {showOrDash(name)}
                  </p>
                  <p>
                    <strong>Email:</strong> {showOrDash(email)}
                  </p>               
               
                  <p>
                    <strong>Rol:</strong> {showOrDash(rol.name)}
                  </p>
                 
                <p>
                    <strong>Cantidad de solicitudes:</strong> {cantidadSolicitudes}
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
