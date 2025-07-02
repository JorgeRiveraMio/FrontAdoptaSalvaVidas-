// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '@/components/navbar/navbar';
import Footer from '@/components/footer/Footer';
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
// import { Link } from '@heroui/link';
// import { Link } from 'react-router-dom'; // para navegación interna


export default function MainLayout() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setShowScrollTop(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
            <Outlet />
        </main>
        <Footer></Footer>
        {/* <Link
            to="https://wa.me/51999999999"
            target="_blank"
            rel="whatsapp"
            color="secondary"
            className="fixed bottom-0 right-0 hover:bg-green-600 text-4xl text-white bg-blue px-4 py-3 shadow-lg z-50"
            ><i className="fa-brands fa-whatsapp"></i>
        </Link> */}
        {/* <Link
            to="https://wa.me/51999999999"
            rel="noopener noreferrer"
            target='_blank'
            color='success'
            className="fixed bottom-0 color-green right-0 hover:bg-green-600 text-4xl text-white px-4 py-3 rounded-full shadow-lg z-50"
        >
            <i className="fa-brands fa-whatsapp"></i>
        </Link> */}

        {showScrollTop && (
            <button
            onClick={scrollToTop}
            className="position-flecha fixed bottom-0 right-0 hover:bg-[#103778] transition delay-300 hover:transition hover:delay-100 text-white p-3 rounded-full shadow-lg z-50 mb-2 mr-2"
            aria-label="Volver arriba"
            >
            <ArrowUp className="w-5 h-5" />
            </button>
        )}
    </div>
    
);
}
