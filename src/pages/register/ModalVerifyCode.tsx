// src/pages/register/ModalVerifyCode.tsx
import { useRef, useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { validateCode } from "@/services/register/validateCodeService";

interface ModalVerifyCodeProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onSuccess: () => void;
}

export default function ModalVerifyCode({
  isOpen,
  onClose,
  email,
  onSuccess,
}: ModalVerifyCodeProps) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (isOpen) {
      // Limpiar estado cada vez que se abre
      setDigits(Array(6).fill(""));
      setErrorMsg(null);
      setSuccessMsg(null);
      setIsDisabled(false);
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (successMsg) {
      // Si ya fue exitoso, ahora solo cierra
      onSuccess();
      onClose();
      return;
    }

    const code = digits.join("");
    if (code.length !== 6) {
      setErrorMsg("El código debe tener 6 dígitos");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await validateCode({ email, code });
      setSuccessMsg(res.message || "¡Código validado con éxito!");
      setIsDisabled(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.response?.data?.message || "Código incorrecto o expirado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg space-y-4">
          <Dialog.Title className="text-lg font-bold text-gray-800 text-center">
            Verifica tu código
          </Dialog.Title>
          <p className="text-sm text-gray-600 text-center">
            Ingresa el código de 6 dígitos enviado a tu correo.
          </p>

          {errorMsg && (
            <p className="text-sm text-red-600 text-center">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-sm text-green-600 text-center">{successMsg}</p>
          )}

          <div className="flex justify-center gap-2">
            {digits.map((digit, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => (inputsRef.current[i] = el)}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                disabled={loading || isDisabled}
                className="w-10 h-12 text-center text-xl border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-red-700 text-white py-2 rounded-full font-semibold hover:bg-red-800 transition disabled:opacity-50"
          >
            {loading
              ? "Verificando..."
              : successMsg
              ? "Aceptar"
              : "Verificar código"}
          </button>

          <button
            onClick={onClose}
            disabled={loading || isDisabled}
            className="w-full text-gray-500 text-sm hover:underline text-center"
          >
            Cancelar
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
