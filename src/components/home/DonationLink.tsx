import { useState } from "react";
import DonationModal from "./MercadoPagoCheckout/DonationModal";

export default function DonationLink() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
        <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-yellow-400 text-gray-900 font-semibold shadow-md hover:bg-yellow-500 transition duration-300"
        >
            Donar
            <i className="ml-2 fa-solid fa-heart"></i>
        </button>

        <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
