import { useState } from "react";
import { createPortal } from "react-dom";

export default function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [nombreDonante, setNombreDonante] = useState("");
    const [monto, setMonto] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [tipoDonacion, setTipoDonacion] = useState("DINERO");
    const [tipoDonante, setTipoDonante] = useState("PERSONA");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("accessToken");
    const isLoggedIn = !!token;

    const handleDonate = async () => {
        if (!isLoggedIn && !nombreDonante) {
            alert("Por favor, ingresa tu nombre si no has iniciado sesión.");
            return;
        }

        if (tipoDonacion === "DINERO" && (!monto || parseFloat(monto) <= 0)) {
            alert("Por favor, ingresa un monto válido.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("https://backadoptasalvavidas.onrender.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    monto: tipoDonacion === "DINERO" ? parseFloat(monto) : null,
                    mensaje,
                    tipoDonacion,
                    tipoDonante,
                    ...(isLoggedIn ? {} : { nombreDonante }),
                }),
            });

            const data = await res.json();

            if (data.linkPago) {
                window.open(data.linkPago, "_blank");
                onClose();
            } else {
                alert("No se pudo generar el link de pago.");
            }
        } catch (error) {
            console.error("Error al donar:", error);
            alert("Ocurrió un error al generar el pago.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl relative">
                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-4 text-red-700 text-center">Realizar Donación</h2>

                {!isLoggedIn && (
                    <>
                        <label className="block mb-2 text-sm font-medium">Tu nombre</label>
                        <input
                            type="text"
                            value={nombreDonante}
                            onChange={(e) => setNombreDonante(e.target.value)}
                            className="w-full px-4 py-2 border rounded mb-4"
                            placeholder="Ej. Ana Pérez"
                        />
                    </>
                )}

                <label className="block mb-2 text-sm font-medium">Tipo de donación</label>
                <select
                    value={tipoDonacion}
                    onChange={(e) => setTipoDonacion(e.target.value)}
                    className="w-full px-4 py-2 border rounded mb-4"
                >
                    <option value="DINERO">Dinero</option>
                    <option value="ALIMENTO">Alimento</option>
                    <option value="MEDICINA">Medicina</option>
                    <option value="ROPA">Ropa</option>
                    <option value="OTROS">Otros</option>
                </select>

                {tipoDonacion === "DINERO" && (
                    <>
                        <label className="block mb-2 text-sm font-medium">Monto (S/)</label>
                        <input
                            type="number"
                            min="1"
                            value={monto}
                            onChange={(e) => setMonto(e.target.value)}
                            className="w-full px-4 py-2 border rounded mb-4"
                            placeholder="Ej. 20"
                        />
                    </>
                )}

                <label className="block mb-2 text-sm font-medium">Tipo de donante</label>
                <select
                    value={tipoDonante}
                    onChange={(e) => setTipoDonante(e.target.value)}
                    className="w-full px-4 py-2 border rounded mb-4"
                    disabled={isLoggedIn}
                >
                    <option value="PERSONA">Persona</option>
                    <option value="ORGANIZACION">Organización</option>
                </select>

                <label className="block mb-2 text-sm font-medium">Mensaje (opcional)</label>
                <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    className="w-full px-4 py-2 border rounded mb-4"
                    placeholder="Escribe un mensaje para la organización"
                />

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDonate}
                        disabled={loading}
                        className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 disabled:opacity-50"
                    >
                        {loading ? "Procesando..." : "Donar"}
                    </button>
                </div>
            </div>
        </div>,
        modalRoot
    );
}
