"use client";
import TravelMenu from "@/components/Navegation";
import { createClient } from "@/utils/supabase/server";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [clases, setClases] = useState([]);
  const [entrenadores, setEntrenadores] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    hora: "",
    dias: "",
    identrenador: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      const supabase = await createClient();

      // Cargar entrenadores
      const { data: entrenadoresData, error: entrenadoresError } = await supabase
        .from("entrenadores")
        .select("identrenador, nombre");
      if (entrenadoresError) {
        console.error("Error al cargar entrenadores:", entrenadoresError.message);
      } else {
        setEntrenadores(entrenadoresData || []);
      }

      // Cargar clases
      const { data: clasesData, error: clasesError } = await supabase
        .from("clases")
        .select("*");
      if (clasesError) {
        console.error("Error al cargar clases:", clasesError.message);
      } else {
        setClases(clasesData || []);
      }
    };

    fetchData();
  }, []);

  // Maneja los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const supabase = await createClient();
    const { nombre, hora, dias, identrenador } = formData;

    if (!nombre || !hora || !dias || !identrenador) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      if (selectedIndex !== null) {
        // Actualizar clase
        const claseId = clases[selectedIndex].idclase;
        const { error } = await supabase
          .from("clases")
          .update(formData)
          .eq("idclase", claseId);
        if (error) throw error;
    
        const updatedClases = [...clases];
        updatedClases[selectedIndex] = { ...formData, idclase: claseId };
        setClases(updatedClases);
        alert("Clase actualizada correctamente.");
      } else {
        const { error } = await supabase.from("clases").insert([
          { nombre, hora, dias, identrenador },
        ]);
        if (error) throw error;
    
        // Como Supabase no devuelve los datos insertados, creamos el nuevo objeto de clase manualmente
        const newClase = { nombre, hora, dias, identrenador, idclase: Date.now() };  // Usamos Date.now() como ejemplo de ID
        setClases((prevClases) => [...prevClases, newClase]);
        alert("Clase agregada correctamente.");
      }
      resetForm();
    } catch (error) {
      console.error("Error al guardar la clase:", error.message);
      alert("Error al guardar la clase. Inténtalo de nuevo.");
    }
    
    
  };

  const handleDelete = async () => {
    if (selectedIndex !== null) {
      const supabase = await createClient();
      const claseId = clases[selectedIndex].idclase;

      try {
        const { error } = await supabase
          .from("clases")
          .delete()
          .eq("idclase", claseId);
        if (error) throw error;

        setClases(clases.filter((_, i) => i !== selectedIndex));
        alert("Clase eliminada correctamente.");
        resetForm();
      } catch (error) {
        console.error("Error al eliminar la clase:", error.message);
        alert("Error al eliminar la clase. Inténtalo de nuevo.");
      }
    } else {
      alert("Selecciona una clase para eliminar.");
    }
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setFormData(clases[index]);
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

  return (
    <div className="flex justify-between items-start h-screen bg-gray-300 p-5 font-sans">
      {/* Contenedor del formulario */}
      <TravelMenu/>
      <div className="w-2/5 bg-gray-400 p-5 rounded-lg shadow-lg max-h-[90vh] ">
        <h2 className="text-white text-center mb-4 text-lg font-semibold">Gestionar Clases</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white text-sm font-medium mb-2" htmlFor="nombre">
              Nombre de la clase:
            </label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2" htmlFor="identrenador">
              Entrenador:
            </label>
            <select
              id="identrenador"
              name="identrenador"
              value={formData.identrenador}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Selecciona un entrenador</option>
              {entrenadores.map((entrenador) => (
                <option key={entrenador.identrenador} value={entrenador.identrenador}>
                  {entrenador.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2" htmlFor="hora">
              Hora:
            </label>
            <input
              id="hora"
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2" htmlFor="dias">
              Días:
            </label>
            <input
              id="dias"
              type="text"
              name="dias"
              value={formData.dias}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Ejemplo: Lunes, Miércoles, Viernes"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            {selectedIndex !== null ? "Actualizar" : "Agregar"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            Eliminar
          </button>
        </form>
      </div>

      {/* Contenedor de la lista */}
      <div className="w-3/5 bg-gray-300 p-5 rounded-lg shadow-lg max-h-full overflow-auto">
        <h2 className="text-gray-800 text-center mb-4 text-lg font-semibold">Lista de Clases</h2>
        {clases.length === 0 ? (
          <p className="text-center text-gray-600">No hay clases registradas.</p>
        ) : (
          <ul className="space-y-4">
            {clases.map((clase, index) => (
              <li
                key={index}
                className={`p-4 rounded-lg ${
                  selectedIndex === index ? "bg-green-600 text-white" : "bg-white text-black"
                } cursor-pointer`}
                onClick={() => handleSelect(index)}
              >
                <p><strong>Nombre:</strong> {clase.nombre}</p>
                <p><strong>Entrenador:</strong> {entrenadores.find(e => e.identrenador === clase.identrenador)?.nombre || "N/A"}</p>
                <p><strong>Hora:</strong> {clase.hora}</p>
                <p><strong>Días:</strong> {clase.dias}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
