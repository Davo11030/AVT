"use client";

import { useState } from "react";

export default function Alumnos() {
    const [alumnos, setAlumnos] = useState([]);
    const [formData, setFormData] = useState({
        nombre: "",
        fechaNacimiento: "",
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
        const { nombre, fechaNacimiento, telefono, usuario, contrasena } = formData;

        if (!nombre || !fechaNacimiento || !telefono || !usuario || !contrasena) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (selectedIndex !== null) {
            const updatedAlumnos = [...alumnos];
            updatedAlumnos[selectedIndex] = formData;
            setAlumnos(updatedAlumnos);
            setSelectedIndex(null);
        } else {
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
            fechaNacimiento: "",
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
                        { label: "Fecha de nacimiento", name: "fechaNacimiento", type: "date" },
                        { label: "Teléfono", name: "telefono", type: "text" },
                        { label: "Usuario", name: "usuario", type: "text" },
                        { label: "Contraseña", name: "contrasena", type: "password" }
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
                    Lista de Alumnos
                </h2>
                <div>
                    {alumnos.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#777" }}>No hay alumnos registrados.</p>
                    ) : (
                        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                            {alumnos.map((alumno, index) => (
                                <li
                                    key={index}
                                    style={styles.listItem(selectedIndex === index)}
                                    onClick={() => handleSelect(index)}
                                >
                                    <div style={{ color: "white" }}>
                                        <p><strong>Nombre:</strong> {alumno.nombre}</p>
                                        <p><strong>Fecha de nacimiento:</strong> {alumno.fechaNacimiento}</p>
                                        <p><strong>Teléfono:</strong> {alumno.telefono}</p>
                                        <p><strong>Usuario:</strong> {alumno.usuario}</p>
                                        <p><strong>Contraseña:</strong> {alumno.contrasena}</p>
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
