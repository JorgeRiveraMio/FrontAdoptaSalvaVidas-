// src/components/footer/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import { routes } from "@/config/routes";

import LogoTwo from "@/assets/image/home/logo_two.png";

const Footer: React.FC = () => {
  // Reutilizamos los paths del archivo de rutas
  const footerLinks = routes.filter((r) =>
    ["/", "/adopta", "/mision","/voluntariado", "/contacto"].includes(r.path)
  );

  return (
    <footer className="bg-[#cb3240] text-white pt-10 font-fam-two">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-20">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <Link to="/" aria-label="Inicio">
            <img
              src={LogoTwo}
              alt="Logo Albergue Adopta Salva Vidas"
              className="h-16 w-auto"
            />
          </Link>
        </div>

        {/* Menú */}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-white mb-3 text-base">Menú</h2>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="link-underline"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div className="text-center md:text-left">
          <h2 className="text-base font-bold mb-3">Contacto</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-center md:justify-start items-center">
              <i className="fa-solid fa-phone mr-2"></i>
              <a
                href="tel:+51955288116"
                className="transition-colors duration-200"
              >
                +51 955 288 116
              </a>
            </li>
            <li className="flex justify-center md:justify-start items-center">
              <i className="fa-solid fa-envelope mr-2"></i>
              <a
                href="mailto:albergue.adoptasalvavidas@gmail.com"
                className="transition-colors duration-200 break-words"
              >
                albergue.adoptasalvavidas@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div className="text-center md:text-left">
          <h2 className="font-bold mb-3 text-base">Síguenos</h2>
          <ul className="flex justify-center md:justify-start gap-3 flex-wrap py-3">
            <li>
              <a
                href="https://www.facebook.com/adoptasalvavidas.pe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-md hover:text-red-700 hover:bg-white border border-white p-4 text-center rounded-full transition-colors duration-300"
              >
                <i className="w-5 h-5 fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Instagram"
                target="_blank"
                className="text-md hover:text-red-700 hover:bg-white border border-white p-4 text-center rounded-full transition-colors duration-300"
              >
                <i className="w-5 h-5 fa-brands fa-square-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@adopta.salvavidas?is_from_webapp=1&sender_device=pc"
                aria-label="TikTok"
                target="_blank"
                className="text-md hover:text-red-700 hover:bg-white border border-white p-4 text-center rounded-full transition-colors duration-300"
              >
                <i className="w-5 h-5 fa-brands fa-tiktok"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="X (Twitter)"
                target="_blank"
                className="text-md hover:text-red-700 hover:bg-white border border-white p-4 text-center rounded-full transition-colors duration-300"
              >
                <i className="w-5 h-5 fa-brands fa-x-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center text-sm text-white border-t border-gray-300 py-4 font-fam-ge px-4 gap-3">
        {/* Izquierda */}
        <div className="mb-2 md:mb-0">
          <a href="/politicas-privacidad" className="link-underline font-fam-two">Políticas de Privacidad</a>
        </div>

        {/* Centro */}
        <div className="text-center">
          &copy; {new Date().getFullYear()} Albergue Adopta Salva Vidas. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
