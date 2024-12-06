"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const TravelMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Referencia al menú para detectar clics fuera
  const router = useRouter(); // Usa el enrutador moderno de Next.js

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    router.push(path); // Navega a la ruta
    setIsOpen(false); // Cierra el menú después de navegar
  };
  const handleLogout = () => {
    signOut({
      callbackUrl: "/", // Redirige al usuario a la página de inicio u otra URL después de cerrar sesión
    });
  };
  // Cerrar el menú cuando se haga clic fuera de él
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener cuando el componente se desmonte
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="p-2 text-xl bg-blue-500 text-white rounded-md focus:outline-none"
        aria-label="Toggle travel menu"
      >
        ☰
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 h-full w-1/2 bg-white shadow-lg z-50 flex items-center"
        >
          <ul className="w-full space-y-4 -ml-12">
            <li>
              <button
                className="w-full text-center py-4 text-lg hover:bg-gray-200 text-black"
                onClick={() => handleNavigation("/pages/admin/entrenadores")}
              >
                Entrenadores
              </button>
            </li>
            <li>
              <button
                className="w-full text-center py-4 text-lg hover:bg-gray-200 text-black"
                onClick={() => handleNavigation("/pages/admin/horarios")}
              >
                Horarios
              </button>
            </li>
            <li>
              <button
                className="w-full text-center py-4 text-lg hover:bg-gray-200 text-black"
                onClick={() => handleNavigation("/pages/admin/alumnos")}
              >
                Alumnos
              </button>
            </li>
            <li>
              <button
                className="w-full text-center py-4 text-lg hover:bg-gray-200 text-black"
                onClick={handleLogout}
              >
                Cerrar sesion
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TravelMenu;
