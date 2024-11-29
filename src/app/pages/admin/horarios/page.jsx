"use client";

import { useState } from "react";

export default function Clases() {
    const [clases, setClases] = useState([]);
    const [formData, setFormData] = useState({
        nombre: "",
        hora: "",
        dias: "",
        identrenador: ""
    });
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { nombre, hora, dias, identrenador } = formData;

        // Validación para asegurar que todos los campos estén completos
        if (!nombre || !hora || !dias || !identrenador) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (selectedIndex !== null) {
            // Actualizar una clase existente
            const updatedClases = [...clases];
            updatedClases[selectedIndex] = formData;
            setClases(updatedClases);
            setSelectedIndex(null);
        } else {
            // Agregar una nueva clase
            setClases([...clases, formData]);
        }
        resetForm();
    };

    const handleDelete = () => {
        if (selectedIndex !== null) {
            const updatedClases = clases.filter((_, i) => i !== selectedIndex);
            setClases(updatedClases);
            resetForm();
        } else {
            alert("Selecciona una clase para eliminar.");
        }
    };

    const handleSelect = (index) => {
        setFormData(clases[index]);
        setSelectedIndex(index);
    };

    const resetForm = () => {
        setFormData({
            nombre: "",
            hora: "",
            dias: "",
            identrenador: ""
        });
        setSelectedIndex(null);
    };

    const styles = {
        container: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "100vh",
            backgroundColor: "#c4c4c4",
            padding: "10px",
            boxSizing: "border-box",
            fontFamily: "Arial, sans-serif",
            overflow: "hidden"
        },
        formContainer: {
            width: "40%",
            backgroundColor: "#808080",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            overflowY: "auto",
            maxHeight: "90vh"
        },
        listContainer: {
            width: "55%",
            backgroundColor: "#c4c4c4",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            overflowY: "auto",
            maxHeight: "100%"
        },
        listItem: (selected) => ({
            backgroundColor: selected ? "#006400" : "#808080",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer"
        }),
        button: (color) => ({
            padding: "10px",
            backgroundColor: color,
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
        })
    };

    return (
        <div style={styles.container}>
            {/* Contenedor del formulario */}
            <div style={styles.formContainer}>
                <h2 style={{ textAlign: "center", marginBottom: "15px", color: "white", fontSize: "18px" }}>
                    Clases o Horarios
                </h2>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    {[
                        { label: "Nombre de la clase", name: "nombre", type: "text" },
                        { label: "ID del entrenador", name: "identrenador", type: "text" },
                        { label: "Hora", name: "hora", type: "time" },
                        { label: "Días", name: "dias", type: "text", placeholder: "Ejemplo: Lunes, Miércoles, Viernes" }
                    ].map((field, index) => (
                        <label htmlFor={field.name} key={index} style={{ color: "white", fontSize: "14px" }}>
                            {field.label}:
                            <input
                                id={field.name}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder || ""}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    marginTop: "5px",
                                    color: "black"
                                }}
                                required
                            />
                        </label>
                    ))}
                    <button type="submit" style={styles.button("#008000")}>
                        {selectedIndex !== null ? "Actualizar" : "Agregar"}
                    </button>
                    <button type="button" onClick={handleDelete} style={styles.button("#dc3545")}>
                        Eliminar
                    </button>
                </form>
            </div>

            {/* Contenedor de la lista */}
            <div style={styles.listContainer}>
                <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#333", fontSize: "18px" }}>
                    Lista de Clases
                </h2>
                <div>
                    {clases.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#777" }}>No hay clases registradas.</p>
                    ) : (
                        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                            {clases.map((clase, index) => (
                                <li
                                    key={index}
                                    style={styles.listItem(selectedIndex === index)}
                                    onClick={() => handleSelect(index)}
                                >
                                    <div style={{ color: "white" }}>
                                        <p><strong>Nombre:</strong> {clase.nombre}</p>
                                        <p><strong>ID del entrenador:</strong> {clase.identrenador}</p>
                                        <p><strong>Hora:</strong> {clase.hora}</p>
                                        <p><strong>Días:</strong> {clase.dias}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
