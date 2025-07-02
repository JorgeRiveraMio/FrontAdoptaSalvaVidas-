import { useState } from "react";
import { sendRegisterCode, RegisterPayload } from "@/services/register";
// import { useNavigate } from "react-router-dom"; // Solo si usas redirección

export function useRegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate(); // Solo si rediriges

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // Validación básica
    const { name, email, password, confirmPassword } = form;
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      return setError("Todos los campos son obligatorios.");
    }

    // Validar email con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return setError("El correo electrónico no es válido.");
    }

    // Validar contraseñas
    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden.");
    }

    const payload: RegisterPayload = {
      name: name.trim(),
      email: email.trim(),
      password,
      rol: { id: 2 }, // rol fijo de usuario
    };

    try {
      setLoading(true);
      const msg = await sendRegisterCode(payload);
      setSuccessMsg(msg);

      // Si usas ruta de verificación:
      // setTimeout(() => navigate("/verificar-codigo"), 2000);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err.message || "Error desconocido.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    error,
    successMsg,
    loading,
    handleChange,
    handleSubmit,
  };
}
