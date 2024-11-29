"use client";

import { useState } from "react";
import { useClases } from "../../../../context/ClasesContext"; // Usamos el hook del contexto

export default function StudentPage() {
    const { clases } = useClases(); // Accedemos a las clases desde el contexto
    const [clasesInscritas, setClasesInscritas] = useState([]);

    const handleInscribirse = (clase) => {
        if (!clasesInscritas.find((c) => c.nombre === clase.nombre)) {
            setClasesInscritas([...clasesInscritas, clase]);
        }
    };

    const handleDesinscribirse = (claseNombre) => {
        setClasesInscritas(clasesInscritas.filter((c) => c.nombre !== claseNombre));
    };

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#c4c4c4",
            height: "100vh",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
        },
        title: {
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#fff",
        },
        classCard: {
            backgroundColor: "#808080",
            color: "#fff",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
            width: "80%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
        },
        footer: {
            marginTop: "auto",
            fontSize: "12px",
            color: "#333",
            textAlign: "center",
            padding: "10px",
        },
        button: (color) => ({
            padding: "10px",
            backgroundColor: color,
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
            width: "100%",
        }),
        listItem: {
            backgroundColor: "#808080",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
        },
        listButtonContainer: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            width: "100%",
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Alumno: Ver Clases Disponibles</h2>
            <ul>
                {clases.length === 0 ? (
                    <p style={{ color: "#fff" }}>No hay clases disponibles.</p>
                ) : (
                    clases.map((clase, index) => (
                        <li key={index} style={styles.listItem}>
                            <p style={{ fontSize: "18px", fontWeight: "bold" }}>{clase.nombre}</p>
                            <p>{clase.identrenador}</p>
                            <p>{clase.hora}</p>
                            <p>{clase.dias}</p>
                            <div style={styles.listButtonContainer}>
                                {clasesInscritas.some((c) => c.nombre === clase.nombre) ? (
                                    <button
                                        onClick={() => handleDesinscribirse(clase.nombre)}
                                        style={styles.button("#dc3545")}
                                    >
                                        Desinscribirse
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleInscribirse(clase)}
                                        style={styles.button("#008000")}
                                    >
                                        Inscribirse
                                    </button>
                                )}
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <footer style={styles.footer}>
                © 2024 AVT WARRIORS. Todos los derechos reservados.
            </footer>
        </div>
    );
}
