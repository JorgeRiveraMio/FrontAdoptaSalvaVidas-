//src/components/home/PerritoModal/ModalWrapper.tsx
interface Props {
  children: React.ReactNode;
  onClose: () => void;
  canCloseOutside?: boolean; // nuevo
}

export default function ModalWrapper({
  children,
  onClose,
  canCloseOutside = false,
}: Props) {
  const handleBackgroundClick = () => {
    if (canCloseOutside) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 overflow-y-auto"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white text-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl relative"
        onClick={(e) => e.stopPropagation()} // evita cerrar si clic dentro
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar modal"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
        {children}
      </div>
    </div>
  );
}
