// /app/context/ClasesContext.js
"use client";

import { createContext, useState, useContext } from "react";

// Crear el contexto
const ClasesContext = createContext();

// Componente proveedor del contexto
export const ClasesProvider = ({ children }) => {
    const [clases, setClases] = useState([]);

    // Función para agregar una clase
    const agregarClase = (nuevaClase) => {
        setClases((prevClases) => [...prevClases, nuevaClase]);
    };

    // Función para eliminar una clase
    const eliminarClase = (index) => {
        setClases((prevClases) => prevClases.filter((_, i) => i !== index));
    };

    return (
        <ClasesContext.Provider value={{ clases, agregarClase, eliminarClase }}>
            {children}
        </ClasesContext.Provider>
    );
};

// Hook para acceder al contexto desde otros componentes
export const useClases = () => {
    return useContext(ClasesContext);
};
