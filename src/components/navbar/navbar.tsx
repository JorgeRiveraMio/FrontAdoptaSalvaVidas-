//src/components/navbar/navbar.tsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { routes } from "@/config/routes";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/authService";
import LogoHeader from "@/assets/image/home/Logo_header.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, setUser, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const mainLinks = routes.filter((r) =>
    ["/", "/adopta", "/mision", "/voluntariado", "/contacto"].includes(r.path)
  );
  const userLinks = routes.filter((r) =>
    ["/iniciar-sesion", "/registrarse"].includes(r.path)
  );

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  /* Scroll & click-outside listeners */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`top-0 w-full z-50 transition-all duration-300 ${
        isHome
          ? `fixed ${scrolled ? "bg-white shadow-md" : "bg-neutral-20/30 backdrop-blur-md"}`
          : `sticky bg-white shadow-md`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/">
          <img src={LogoHeader} alt="Logo" className="h-16 w-auto" />
        </Link>

        {/* Botón móvil */}
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Links desktop */}
        <div className="hidden sm:flex space-x-6">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`link-underline font-fam-one transition ${
                isHome
                  ? scrolled
                    ? "text-gray-900 link-underline-two"
                    : "text-white"
                  : "text-gray-900 link-underline-two"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Usuario */}
        <div className="hidden sm:flex items-center space-x-4">
          {loading ? (
            <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-primary rounded-full" />
          ) : user ? (
            <>
              {user.rol.id === 1 && (
                <Link to="/admin" className="bg-secondary text-white px-3 py-1 rounded font-fam-one">
                  Admin
                </Link>
              )}

              {/* Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://ui-avatars.com/api/?name=ASV&background=0D8ABC&color=fff"
                    alt={user.name}
                  />
                </button>

                <div
                  className={`absolute right-0 mt-1 w-48 bg-white/90 backdrop-blur-sm border rounded-md shadow-lg z-50 ${
                    isDropdownOpen ? "block" : "hidden"
                  }`}
                >
                  <div className="px-4 py-2 text-sm text-gray-800">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </>
          ) : (
            userLinks.map((link) =>
              link.path === "/registrarse" ? (
                <Link
                  key={link.path}
                  to={link.path}
                  className="bg-primary text-white px-4 py-2 rounded-full font-fam-one"
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`link-underline font-fam-one transition ${
                    isHome
                      ? scrolled
                        ? "text-gray-900 hover:text-primary link-underline-two"
                        : "text-white"
                      : "text-gray-900"
                  }`}
                >
                  <i className="fa-regular fa-user"></i>
                </Link>
              )
            )
          )}
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2 bg-neutral-100/80 backdrop-blur-md">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block text-gray-800 font-fam-one"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <hr className="my-2" />
          {user ? (
            <>
              {user.rol.id === 1 && (
                <Link
                  to="/admin"
                  className="block text-secondary font-fam-one"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block text-red-600 font-fam-one"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            userLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block font-fam-one"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))
          )}
        </div>
      )}
    </nav>
  );
}
