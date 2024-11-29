"use client";

import { useState } from "react";
import TravelMenu from '@/components/Navegation'

export default function Alumnos() {
    const [alumnos, setAlumnos] = useState([]);
    const [formData, setFormData] = useState({
        nombre: "",
        fecha_nacimiento: "",
        telefono: "",
        usuario: "",
        contrasena: ""
    });
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { nombre, fecha_nacimiento, telefono, usuario, contrasena } = formData;

        // Validación para asegurar que todos los campos estén completos
        if (!nombre || !fecha_nacimiento || !telefono || !usuario || !contrasena) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (selectedIndex !== null) {
            // Actualizar un alumno existente
            const updatedAlumnos = [...alumnos];
            updatedAlumnos[selectedIndex] = formData;
            setAlumnos(updatedAlumnos);
            setSelectedIndex(null);
        } else {
            // Agregar un nuevo alumno
            setAlumnos([...alumnos, formData]);
        }
        resetForm();
    };

    const handleDelete = () => {
        if (selectedIndex !== null) {
            const updatedAlumnos = alumnos.filter((_, i) => i !== selectedIndex);
            setAlumnos(updatedAlumnos);
            resetForm();
        } else {
            alert("Selecciona un alumno para eliminar.");
        }
    };

    const handleSelect = (index) => {
        setFormData(alumnos[index]);
        setSelectedIndex(index);
    };

    const resetForm = () => {
        setFormData({
            nombre: "",
            fecha_nacimiento: "",
            telefono: "",
            usuario: "",
            contrasena: ""
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
        tableContainer: {
            width: "55%",
            backgroundColor: "#c4c4c4",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            overflowY: "auto",
            maxHeight: "100%"
        },
        button: (color) => ({
            padding: "10px",
            backgroundColor: color,
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
        }),
        table: {
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left"
        },
        th: {
            backgroundColor: "#808080",
            color: "white",
            padding: "10px",
            border: "1px solid #ccc"
        },
        td: {
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#f8f8f8"
        },
        selectedRow: {
            backgroundColor: "#006400",
            color: "white"
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.navigation}>
                <TravelMenu />
             </div>
            {/* Contenedor del formulario */}
            <div style={styles.formContainer}>
                <h2 style={{ textAlign: "center", marginBottom: "15px", color: "white", fontSize: "18px" }}>
                    Registro de Alumnos
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
                        { label: "Nombre del alumno", name: "nombre", type: "text" },
                        { label: "Fecha de nacimiento", name: "fecha_nacimiento", type: "date" },
                        { label: "Teléfono", name: "telefono", type: "text" },
                        { label: "Usuario", name: "usuario", type: "text" },
                        { label: "Contraseña", name: "contrasena", type: "password" }
                    ].map((field, index) => (
                        <label key={index} style={{ color: "white", fontSize: "14px" }}>
                            {field.label}:
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
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

            {/* Contenedor de la tabla */}
            <div style={styles.tableContainer}>
                <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#333", fontSize: "18px" }}>
                    Lista de Alumnos
                </h2>
                {alumnos.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#777" }}>No hay alumnos registrados.</p>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                {Object.keys(formData).map((key, index) => (
                                    <th key={index} style={styles.th}>
                                        {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {alumnos.map((alumno, index) => (
                                <tr
                                    key={index}
                                    style={selectedIndex === index ? styles.selectedRow : {}}
                                    onClick={() => handleSelect(index)}
                                >
                                    {Object.values(alumno).map((value, index) => (
                                        <td key={index} style={styles.td}>
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
