import { XCircle } from "lucide-react";

export default function Failure() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-red-700 mb-2">¡Pago fallido!</h1>
            <p className="text-gray-600">Ocurrió un problema al procesar tu donación. Intenta nuevamente o contáctanos si persiste el error.</p>
        </div>
        </div>
    );
}
