// src/components/shared/ResultModal.tsx
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as HeroButton,
} from "@heroui/react";

// ✅ Define tipos de props explícitamente
interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  success: boolean;
  message: string;
}

export default function ResultModal({
  isOpen,
  onClose,
  success,
  message,
}: ResultModalProps) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      backdrop="blur"
      radius="md"
      classNames={{
        backdrop: "bg-black/30 backdrop-blur-sm",
        base: "bg-white text-gray-800",
        header: success ? "border-b border-amber-200" : "border-b border-red-200",
        footer: success ? "border-t border-amber-200" : "border-t border-red-200",
      }}
    >
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex justify-center text-center text-xl font-semibold">
              {success ? (
                <span className="text-amber-600">¡Operación Exitosa!</span>
              ) : (
                <span className="text-red-600">Error en la Operación</span>
              )}
            </ModalHeader>
            <ModalBody className="text-center">
              <p className="text-gray-700">{message}</p>
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <HeroButton
                color={success ? "warning" : "danger"}
                onPress={onCloseModal}
              >
                Cerrar
              </HeroButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
