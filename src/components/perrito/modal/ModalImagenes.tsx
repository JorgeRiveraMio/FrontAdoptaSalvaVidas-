// src/components/Perrito/modal/ModalImagenes.tsx
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

interface Imagen {
  id?: number;
  url: string;
}

interface ModalImagenesProps {
  isOpen: boolean;
  onClose: () => void;
  imagenes: Imagen[];
}

export default function ModalImagenes({ isOpen, onClose, imagenes }: ModalImagenesProps) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} backdrop="blur">
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="text-lg font-semibold text-center">
              Imágenes del Perrito
            </ModalHeader>
            <ModalBody className="grid grid-cols-2 gap-2 max-h-[60vh] overflow-auto">
              {imagenes.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt="Foto del perrito"
                  className="w-full h-40 object-cover rounded border"
                />
              ))}
            </ModalBody>
            <ModalFooter className="justify-center">
              <Button onPress={onCloseModal}>Cerrar</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
