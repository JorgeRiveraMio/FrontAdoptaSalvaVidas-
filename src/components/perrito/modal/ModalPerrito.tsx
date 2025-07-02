// src/components/ModalPerrito.tsx

import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as HeroButton,
  Input,
  Switch,
} from "@heroui/react";

import ModalImagenes from "./ModalImagenes";
import Perrito from "@/interfaces/Perrito";
import { uploadImagesToCloudinary } from "@/utils/cloudinaryUploader";

interface ModalPerritoProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: Perrito;
  handleChange: (e: { target: { name: string; value: any } }) => void;
  handleConfirm: () => void;
  selectedAction: 0 | 1 | 2 | 3;
}

export default function ModalPerrito({
  isOpen,
  onClose,
  selectedItem,
  handleChange,
  handleConfirm,
  selectedAction,
}: ModalPerritoProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [viewImages, setViewImages] = useState(false);
  const isReadOnly = selectedAction === 1 || selectedAction === 3;

  useEffect(() => {
    if (isOpen) setErrors({});
  }, [isOpen]);

  const toInputValue = (v: string | number | null | undefined) =>
    v != null ? String(v) : "";

  const titulo =
    {
      0: "Registrar un Perrito",
      1: "Detalles del Perrito",
      2: "Editar Perrito",
      3: "Eliminar Perrito",
    }[selectedAction] || "Acción Perrito";

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange({ target: { name, value } });

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSwitchChange = (value: boolean) =>
    handleChange({ target: { name: "disponible", value } });

  const handleSubirImagenes = async () => {
    try {
      const urls = await uploadImagesToCloudinary();
      if (urls.length) {
        const nuevas = [...(selectedItem.imagenes || []), ...urls];
        handleChange({ target: { name: "imagenes", value: nuevas } });
      }
    } catch (error) {
      alert("Error al subir imágenes.");
    }
  };

  const handleLocalConfirm = () => {
    console.log("🐶 Formulario listo para enviar:", selectedItem); // ✅ log 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (selectedAction === 0 || selectedAction === 2) {
      const { nombre, edad, tamañoPerro, descripcion } = selectedItem || {};
      const newErrors: Record<string, string> = {};
      if (!nombre?.trim()) newErrors.nombre = "El nombre es obligatorio.";
      if (!edad || isNaN(Number(edad)))
        newErrors.edad = "La edad es obligatoria.";
      if (!tamañoPerro?.trim()) newErrors.tamañoPerro = "Tamaño requerido.";
      if (!descripcion?.trim())
        newErrors.descripcion = "Descripción obligatoria.";

      if (Object.keys(newErrors).length) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});
    handleConfirm();
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        backdrop="blur"
        radius="md"
        classNames={{
          backdrop: "bg-black/40 backdrop-blur-sm",
          base: "border-amber-300 bg-white text-gray-800",
          header: "border-b border-amber-300",
          body: "py-4",
          footer: "border-t border-amber-300",
          closeButton: "hover:bg-amber-100 active:bg-amber-200",
        }}
      >
        <ModalContent>
          {(onCloseModal) => (
            <>
              <ModalHeader className="text-lg font-semibold text-amber-600">
                {titulo}
              </ModalHeader>

              <ModalBody className="flex flex-col gap-3 text-sm">
                <label>
                  ID:
                  <Input
                    name="id"
                    value={toInputValue(selectedItem?.id)}
                    disabled
                  />
                </label>

                <label>
                  Nombre:
                  <Input
                    name="nombre"
                    value={toInputValue(selectedItem?.nombre)}
                    onChange={handleFieldChange}
                    disabled={isReadOnly}
                    isInvalid={!!errors.nombre}
                    errorMessage={errors.nombre}
                  />
                </label>

                <label>
                  Edad:
                  <Input
                    name="edad"
                    type="number"
                    value={toInputValue(selectedItem?.edad)}
                    onChange={handleFieldChange}
                    disabled={isReadOnly}
                    isInvalid={!!errors.edad}
                    errorMessage={errors.edad}
                  />
                </label>

                <label className="flex flex-col gap-1">
                  Tamaño:
                  <select
                    name="tamañoPerro"
                    value={toInputValue(selectedItem?.tamañoPerro)}
                    onChange={(e) => handleFieldChange(e as any)}
                    disabled={isReadOnly}
                    className={`border px-3 py-2 rounded ${
                      errors.tamañoPerro ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Seleccionar tamaño</option>
                    <option value="PEQUEÑO">Pequeño</option>
                    <option value="MEDIANO">Mediano</option>
                    <option value="GRANDE">Grande</option>
                  </select>
                  {errors.tamañoPerro && (
                    <span className="text-red-600 text-xs">
                      {errors.tamañoPerro}
                    </span>
                  )}
                </label>

                <label>
                  Descripción:
                  <Input
                    name="descripcion"
                    value={toInputValue(selectedItem?.descripcion)}
                    onChange={handleFieldChange}
                    disabled={isReadOnly}
                    isInvalid={!!errors.descripcion}
                    errorMessage={errors.descripcion}
                  />
                </label>

                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="disponible" className="text-sm">
                    Disponible:
                  </label>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="disponible"
                      isSelected={selectedItem?.disponible ?? false}
                      onValueChange={handleSwitchChange}
                      isDisabled={isReadOnly}
                    />
                    <span className="text-sm">
                      {selectedItem?.disponible ? "Sí" : "No"}
                    </span>
                  </div>
                </div>

                {selectedAction === 0 ? (
                  <div className="flex justify-end mt-2">
                    <HeroButton
                      variant="ghost"
                      color="warning"
                      onClick={handleSubirImagenes}
                    >
                      Subir imágenes ({selectedItem?.imagenes?.length || 0})
                    </HeroButton>
                  </div>
                ) : (
                  <div className="flex justify-end mt-2">
                    <HeroButton
                      variant="ghost"
                      color="warning"
                      onClick={() => setViewImages(true)}
                      disabled={!selectedItem?.imagenes?.length}
                    >
                      Ver imágenes ({selectedItem?.imagenes?.length || 0})
                    </HeroButton>
                  </div>
                )}
              </ModalBody>

              <ModalFooter>
                <HeroButton
                  variant="light"
                  color="default"
                  onPress={onCloseModal}
                >
                  Cerrar
                </HeroButton>
                {selectedAction !== 1 && (
                  <HeroButton color="warning" onPress={handleLocalConfirm}>
                    {selectedAction === 0
                      ? "Guardar"
                      : selectedAction === 2
                        ? "Editar"
                        : "Eliminar"}
                  </HeroButton>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <ModalImagenes
        isOpen={viewImages}
        onClose={() => setViewImages(false)}
        imagenes={selectedItem?.imagenes || []}
      />
    </>
  );
}
