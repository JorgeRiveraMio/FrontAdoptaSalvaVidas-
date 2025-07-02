//src/pages/contacto/ContactoForm.tsx
import React, { useState } from "react";
import { enviarContacto } from "@/services/contactoService";

const initialState = {
  nombre: "",
  email: "",
  telefono: "",
  asunto: "",
  mensaje: "",
};

const ContactoForm: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!form.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "El correo no tiene un formato válido.";
    }
    if (form.telefono && !/^\+?\d{9,15}$/.test(form.telefono)) {
      newErrors.telefono = "Número de teléfono no válido.";
    }
    if (!form.asunto.trim()) newErrors.asunto = "El asunto es obligatorio.";
    if (!form.mensaje.trim()) newErrors.mensaje = "El mensaje es obligatorio.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await enviarContacto({
        nombreCompleto: form.nombre,
        correoElectronico: form.email,
        telefono: form.telefono || undefined,
        asunto: form.asunto || undefined,
        mensaje: form.mensaje,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error al enviar contacto", error);
      setServerError("Hubo un problema al enviar tu mensaje. Inténtalo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 bg-white p-8 rounded-xl shadow-lg"
    >
      <div>
        <h2 className="text-3xl font-bold text-gray-800 font-fam-desk">
          ¿Tienes alguna pregunta?
        </h2>
        <p className="text-gray-600 font-fam-two mt-2">
          Por favor, completa el siguiente formulario
        </p>
      </div>

      {[
        { id: "nombre", label: "Nombre completo", type: "text" },
        { id: "email", label: "Correo electrónico", type: "email" },
        { id: "telefono", label: "Teléfono", type: "tel" },
        { id: "asunto", label: "Asunto", type: "text" },
      ].map(({ id, label, type }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={id}
            value={form[id as keyof typeof form]}
            onChange={handleChange}
            className={`w-full border ${
              errors[id] ? "border-red-500" : "border-gray-300"
            } p-3 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
          {errors[id] && (
            <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          value={form.mensaje}
          onChange={handleChange}
          className={`w-full border ${
            errors.mensaje ? "border-red-500" : "border-gray-300"
          } p-3 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500`}
        />
        {errors.mensaje && (
          <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>
        )}
      </div>

      {serverError && (
        <p className="text-red-600 text-sm font-medium">{serverError}</p>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting || submitted}
          className="bg-red-700 text-white font-semibold px-6 py-3 rounded-full w-full transition duration-300 disabled:opacity-60"
        >
          {submitted ? "Mensaje enviado" : isSubmitting ? "Enviando..." : "Enviar mensaje"}
        </button>
        {submitted && (
          <p className="mt-4 text-green-600 font-fam-two">
            ¡Gracias! Tu mensaje ha sido enviado.
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactoForm;
