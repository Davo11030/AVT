"use client";

import { useState } from "react";

export default function Entrenadores() {
    const [entrenadores, setEntrenadores] = useState([]);
    const [formData, setFormData] = useState({
        nombre: "",
        edad: "",
        disciplina: "",
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
        const { nombre, disciplina, telefono, usuario, contrasena } = formData;

        if (!nombre || !disciplina || !telefono || !usuario || !contrasena) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (selectedIndex !== null) {
            const updatedEntrenadores = [...entrenadores];
            updatedEntrenadores[selectedIndex] = formData;
            setEntrenadores(updatedEntrenadores);
            setSelectedIndex(null);
        } else {
            setEntrenadores([...entrenadores, formData]);
        }
        resetForm();
    };

    const handleDelete = () => {
        if (selectedIndex !== null) {
            const updatedEntrenadores = entrenadores.filter((_, i) => i !== selectedIndex);
            setEntrenadores(updatedEntrenadores);
            resetForm();
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
            edad: "",
            disciplina: "",
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
                    Entrenadores
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
                        { label: "Nombre", name: "nombre", type: "text" },
                        { label: "Disciplina", name: "disciplina", type: "text" },
                        { label: "Número de teléfono", name: "telefono", type: "text" },
                        { label: "Usuario", name: "usuario", type: "text" },
                        { label: "Contraseña", name: "contrasena", type: "text" }
                    ].map((field, index) => (
                        <label htmlFor={field.name} key={index} style={{ color: "white", fontSize: "14px" }}>
                            {field.label}:
                            <input
                                id={field.name}
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

            {/* Contenedor de la lista */}
            <div style={styles.listContainer}>
                <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#333", fontSize: "18px" }}>
                    Lista de Entrenadores
                </h2>
                <div>
                    {entrenadores.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#777" }}>No hay entrenadores registrados.</p>
                    ) : (
                        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                            {entrenadores.map((entrenador, index) => (
                                <li
                                    key={index}
                                    style={styles.listItem(selectedIndex === index)}
                                    onClick={() => handleSelect(index)}
                                >
                                    <div style={{ color: "white" }}>
                                        <p><strong>Nombre:</strong> {entrenador.nombre}</p>
                                        <p><strong>Disciplina:</strong> {entrenador.disciplina}</p>
                                        <p><strong>Teléfono:</strong> {entrenador.telefono}</p>
                                        <p><strong>Usuario:</strong> {entrenador.usuario}</p>
                                        <p><strong>Contraseña:</strong> {entrenador.contrasena}</p>
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
