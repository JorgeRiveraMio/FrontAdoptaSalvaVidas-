import { Clock } from "lucide-react";

export default function Pending() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
            <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-yellow-600 mb-2">Pago pendiente</h1>
            <p className="text-gray-600">Tu donación está siendo procesada. Recibirás una confirmación una vez que se apruebe.</p>
        </div>
        </div>
    );
}
