import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function Success() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        console.log("Pago exitoso:", Object.fromEntries(params.entries()));
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-700 mb-2">¡Gracias por tu donación!</h1>
            <p className="text-gray-600">Tu pago fue procesado con éxito. Estamos muy agradecidos por tu apoyo.</p>
        </div>
        </div>
    );
}
