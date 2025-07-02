//src/components/home/PerritoModal/ModalLoginMessage.tsx
interface Props {
  nombre: string;
  onClose: () => void;
}

export default function ModalLoginMessage({ nombre, onClose }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Inicia sesión para adoptar a{" "}
        <span className="text-primary">{nombre}</span>
      </h2>
      <p className="mb-4">
        Para postular a la adopción debes iniciar sesión. También puedes
        contactarnos directamente por WhatsApp.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Cerrar
        </button>
        <a
          href="/contacto"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
          Contactar
        </a>
      </div>
    </div>
  );
}
