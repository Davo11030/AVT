'use client'
import { useState, useEffect } from "react";
import { useClases } from "../../../../context/ClasesContext";
import TravelMenu from '@/components/Navegation';

export default function AdminPage() {
  const { clases, agregarClase, eliminarClase } = useClases();
  const [formData, setFormData] = useState({
    nombre: "",
    hora: "",
    dias: "",
    identrenador: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    if (selectedIndex !== null && clases[selectedIndex]) {
      setFormData({
        nombre: clases[selectedIndex].nombre,
        hora: clases[selectedIndex].hora,
        dias: clases[selectedIndex].dias,
        identrenador: clases[selectedIndex].identrenador,
      });
    } else {
      setFormData({
        nombre: "",
        hora: "",
        dias: "",
        identrenador: "",
      });
    }
  }, [selectedIndex, clases]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, hora, dias, identrenador } = formData;

    if (!nombre || !hora || !dias || !identrenador) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (selectedIndex !== null) {
      const updatedClases = [...clases];
      updatedClases[selectedIndex] = formData;
      agregarClase(updatedClases);
      setSelectedIndex(null);
    } else {
      agregarClase(formData);
    }
    resetForm();
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const updatedClases = clases.filter((_, i) => i !== selectedIndex);
      eliminarClase(updatedClases);
      resetForm();
    } else {
      alert("Selecciona una clase para eliminar.");
    }
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      hora: "",
      dias: "",
      identrenador: "",
    });
    setSelectedIndex(null);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#c4c4c4",
      fontFamily: "Arial, sans-serif",
      overflow: "hidden",
    },
    navigation: {
      marginBottom: "10px",
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      height: "100%",
      padding: "10px",
    },
    formContainer: {
      width: "40%",
      backgroundColor: "#808080",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      overflowY: "auto",
      maxHeight: "90vh",
    },
    listContainer: {
      width: "55%",
      backgroundColor: "#c4c4c4",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      overflowY: "auto",
    },
    listItem: (selected) => ({
      backgroundColor: selected ? "#006400" : "#808080",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "10px",
      color: "white",
      cursor: "pointer",
    }),
    button: (color) => ({
      padding: "10px",
      backgroundColor: color,
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    }),
    heading: {
      textAlign: "center",
      marginBottom: "15px",
      color: "white",
      fontSize: "18px",
    },
    input: {
      width: "100%",
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginTop: "5px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navegación */}
      <div style={styles.navigation}>
        <TravelMenu />
      </div>

      {/* Contenido principal */}
      <div style={styles.content}>
        {/* Contenedor del formulario */}
        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Gestionar Clases</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Nombre de la clase", name: "nombre", type: "text" },
              { label: "ID del entrenador", name: "identrenador", type: "text" },
              { label: "Hora", name: "hora", type: "time" },
              { label: "Días", name: "dias", type: "text", placeholder: "Ejemplo: Lunes, Miércoles, Viernes" },
            ].map((field, index) => (
              <label key={index}>
                {field.label}:
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder || ""}
                  style={styles.input}
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
          <h2 style={styles.heading}>Lista de Clases</h2>
          {clases.length === 0 ? (
            <p>No hay clases registradas.</p>
          ) : (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {clases.map((clase, index) => (
                <li
                  key={index}
                  style={styles.listItem(selectedIndex === index)}
                  onClick={() => handleSelect(index)}
                >
                  <p><strong>Nombre:</strong> {clase.nombre}</p>
                  <p><strong>ID del entrenador:</strong> {clase.identrenador}</p>
                  <p><strong>Hora:</strong> {clase.hora}</p>
                  <p><strong>Días:</strong> {clase.dias}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
