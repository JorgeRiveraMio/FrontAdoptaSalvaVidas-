//src/components/home/PerritoModal/PerritoModal.tsx
import { useEffect, useState } from "react";
import { makePostRequest } from "@/services/api";
import { useUser } from "@/context/UserContext";
import ModalWrapper from "./ModalWrapper";
import ModalLoginMessage from "./ModalLoginMessage";
import AdoptionForm from "./AdoptionForm";
import FormSuccessMessage from "./FormSuccessMessage";

interface PerritoModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  nombre: string;
}

export default function PerritoModal({
  isOpen,
  onClose,
  id,
  nombre,
}: PerritoModalProps) {
  const { user, loading } = useUser();

  const [form, setForm] = useState({
    comentario: "",
    nombreCompleto: "",
    telefono: "",
    direccion: "",
    tipoVivienda: "CASA",
    tienePatios: false,
    viveEnFamilia: false,
    otrasMascotas: false,
    experienciaMascotas: "",
    tiempoDisponible: "MUCHO",
    razonesAdopcion: "",
    condicionesAceptadas: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
  const originalOverflow = document.body.style.overflow;

  if (isOpen) {
    document.body.style.overflow = "hidden";
  }

  return () => {
    document.body.style.overflow = originalOverflow;
  };
}, [isOpen]);


  useEffect(() => {
    if (isOpen) {
      setForm({
        comentario: "",
        nombreCompleto: "",
        telefono: "",
        direccion: "",
        tipoVivienda: "CASA",
        tienePatios: false,
        viveEnFamilia: false,
        otrasMascotas: false,
        experienciaMascotas: "",
        tiempoDisponible: "MUCHO",
        razonesAdopcion: "",
        condicionesAceptadas: false,
      });
      setErrors({});
      setSubmitting(false);
      setSuccess(false);
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.nombreCompleto.trim()) newErrors.nombreCompleto = "Este campo es obligatorio.";
    if (!form.telefono.trim()) {
      newErrors.telefono = "Este campo es obligatorio.";
    } else if (!/^\d{9}$/.test(form.telefono)) {
      newErrors.telefono = "Debe contener exactamente 9 dígitos numéricos.";
    }
    if (!form.direccion.trim()) newErrors.direccion = "Este campo es obligatorio.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const body = {
        ...form,
        condicionesAceptadas: false,
        usuarioId: user?.id,
        perroId: id,
      };

      await makePostRequest("/formulario", body);
      setSuccess(true);
    } catch (error) {
      console.error("❌ Error al enviar formulario:", error);
      alert("Hubo un error al enviar tu solicitud. Intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || loading) return null;

  return (
    <ModalWrapper onClose={onClose} canCloseOutside={success}>
      {!user ? (
        <ModalLoginMessage nombre={nombre} onClose={onClose} />
      ) : success ? (
        <FormSuccessMessage />
      ) : (
        <AdoptionForm
          nombre={nombre}
          form={form}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={submitting}
          success={success}
        />
      )}
    </ModalWrapper>
  );
}
