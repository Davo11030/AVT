"use client";
import { useEffect, useRef, useState } from "react";

const TravelMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);  // Estado para verificar si estamos en el cliente
  const [router, setRouter] = useState(null);
  const menuRef = useRef(null); // Referencia al menú para detectar clics fuera

  useEffect(() => {
    setIsClient(true); // Confirmamos que estamos en el cliente
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    if (router) {
      router.push(path); // Navegar a la ruta
      setIsOpen(false); // Cerrar el menú después de la navegación
    }
  };

  // Cerrar el menú cuando se haga clic fuera de él
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Agregar el event listener para cerrar el menú al hacer clic fuera
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

  if (!isClient) {
    return null; // No renderizamos nada en el servidor
  }

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
        <div ref={menuRef} className="fixed top-0 left-0 h-full w-1/2 bg-white shadow-lg z-50 flex  items-center ">
          <ul className="w-full space-y-4 -ml-12">
            <li>
              <button 
                className="w-full text-center py-4 text-lg hover:bg-gray-200 "
                onClick={() => handleNavigation("pages/admin/entrenadores")}
              >
                Entrenadores
              </button>
            </li>
            <li>
              <button 
                className="w-full text-center py-4 text-lg hover:bg-gray-200"
                onClick={() => handleNavigation("/montana")}
              >
                Montaña
              </button>
            </li>
            <li>
              <button 
                className="w-full text-center py-4 text-lg hover:bg-gray-200"
                onClick={() => handleNavigation("/ciudad")}
              >
                Ciudad
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TravelMenu;