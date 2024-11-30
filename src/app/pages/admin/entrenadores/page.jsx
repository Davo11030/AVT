"use client";

import TravelMenu from '@/components/Navegation';
import { createClient } from "@/utils/supabase/server";
import { useEffect, useState } from "react";

export default function Entrenadores() {
    const [entrenadores, setEntrenadores] = useState([]);
    const [formData, setFormData] = useState({
        nombre: "",
        disciplina: "",
        telefono: "",
        usuario: "",
        contraseña: "",
    });
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Cargar entrenadores desde la base de datos
    useEffect(() => {
        const fetchEntrenadores = async () => {
        const supabase = await createClient();

        const { data, error } = await supabase.from("entrenadores").select("*");
        if (error) {
            console.error("Error al obtener entrenadores:", error.message);
        } else {
            setEntrenadores(data);
        }
        };
        fetchEntrenadores();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        const { name, value } = e.target;
    
        // Restringe el campo "telefono" para aceptar solo números
        if (name === "telefono") {
            const numericValue = value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter que no sea un número
            setFormData({ ...formData, [name]: numericValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, disciplina, telefono, usuario, contraseña } = formData;
    
        // Validaciones
        if (!/^\d+$/.test(telefono)) {
            alert("El número de teléfono debe contener solo dígitos.");
            return;
        }
        if (!nombre || !disciplina || !telefono || !usuario || !contraseña) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }
    
        try {
            const supabase = await createClient();
    
            if (selectedIndex !== null) {
                // Actualizar entrenador existente
                const identrenador = entrenadores[selectedIndex].identrenador;
                const { error } = await supabase
                    .from("entrenadores")
                    .update(formData)
                    .eq("identrenador", identrenador);
    
                if (error) throw error;
    
                const updatedEntrenadores = [...entrenadores];
                updatedEntrenadores[selectedIndex] = { ...formData, identrenador };
                setEntrenadores(updatedEntrenadores);
                alert("Entrenador actualizado.");
            } else {
                // Agregar nuevo entrenador
                const { error } = await supabase.from("entrenadores").insert([formData]);

                if (error) throw error;

                // Como Supabase no devuelve los datos insertados, creamos el nuevo objeto manualmente
                const newEntrenador = { ...formData, identrenador: Date.now() };  // Usamos Date.now() como ejemplo de ID único

                // Actualizamos el estado local de entrenadores
                setEntrenadores((prevEntrenadores) => [...prevEntrenadores, newEntrenador]);

                alert("Entrenador agregado correctamente.");
                                
            }
    
            resetForm();
        } catch (error) {
            console.error("Error al guardar entrenador:", error.message);
        }
    };
    
    

    const handleDelete = async () => {
        if (selectedIndex !== null) {
        try {
            const supabase = await createClient();
            const id = entrenadores[selectedIndex].identrenador;
            const { error } = await supabase.from("entrenadores").delete().eq("identrenador", id);
            if (error) throw error;

            const updatedEntrenadores = entrenadores.filter((_, i) => i !== selectedIndex);
            setEntrenadores(updatedEntrenadores);
            resetForm();
            alert("Entrenador eliminado.");

        } catch (error) {
            console.error("Error al eliminar entrenador:", error.message);
        }
        } else {
        alert("Selecciona un entrenador para eliminar.");
        }
    };

    const handleSelect = (index) => {
        setFormData(entrenadores[index]);
        setSelectedIndex(index);
    };

    const resetForm = () => {
        setFormData({
        nombre: "",
        disciplina: "",
        telefono: "",
        usuario: "",
        contraseña: "",
        });
        setSelectedIndex(null);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-300">
        {/* Formulario */}
        <TravelMenu/>
        <div className="w-full md:w-2/5 bg-gray-400  text-white p-6 rounded-lg shadow-lg md:sticky md:top-0 h-fit">

            <h2 className="text-center text-xl font-bold mb-4">Entrenadores</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {[
                { label: "Nombre", name: "nombre", type: "text" },
                { label: "Disciplina", name: "disciplina", type: "text" },
                { label: "Teléfono", name: "telefono", type: "tel" },
                { label: "Usuario", name: "usuario", type: "text" },
                { label: "Contraseña", name: "contraseña", type: "password" },
            ].map((field, index) => (
                <div key={index}>
                <label htmlFor={field.name} className="block text-sm font-medium mb-1 text-black">
                    {field.label}
                </label>
                <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full p-2 rounded border border-gray-300 text-black"
                    required
                />
                </div>
            ))}
            <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
                {selectedIndex !== null ? "Actualizar" : "Agregar"}
            </button>
            <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
                Eliminar
            </button>
            </form>
        </div>

        {/* Lista */}
        <div className="w-full md:w-3/5 bg-gray-200 p-6 rounded-lg shadow-lg overflow-y-auto">
            <h2 className="text-center text-xl font-bold mb-4">Lista de Entrenadores</h2>
            <div>
            {entrenadores.length === 0 ? (
                <p className="text-center text-gray-500">No hay entrenadores registrados.</p>
            ) : (
                <ul className="space-y-4">
                {entrenadores.map((entrenador, index) => (
                    <li
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={`p-4 rounded shadow cursor-pointer ${
                        selectedIndex === index ? "bg-green-600 text-white" : "bg-white"
                    }`}
                    >
                    <p><strong>Nombre:</strong> {entrenador.nombre}</p>
                    <p><strong>Disciplina:</strong> {entrenador.disciplina}</p>
                    <p><strong>Teléfono:</strong> {entrenador.telefono}</p>
                    <p><strong>Usuario:</strong> {entrenador.usuario}</p>
                    </li>
                ))}
                </ul>
            )}
            </div>
        </div>
        </div>
    );
    }
