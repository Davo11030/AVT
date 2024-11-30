"use client";
import TravelMenu from "@/components/NavegationTrainer";
import { createClient } from "@/utils/supabase/server";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function EntrenadorClasesPage() {
    const { data: session } = useSession();  // Obtiene los datos de la sesión del alumno
    const [clases, setClases] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [alumnosPorClase, setAlumnosPorClase] = useState({});
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState({});  // Estado para controlar si el listado de alumnos está desplegado
    const supabase = createClient();

    // Cargar datos iniciales
    useEffect(() => {
        const fetchData = async () => {
            const { data: clasesData, error: clasesError } = await supabase
                .from("clases")
                .select("*");
            if (clasesError) {
                console.error("Error al cargar clases:", clasesError.message);
            } else {
                setClases(clasesData || []);
            }

            // Obtener los alumnos por clase
            const alumnosData = {};
            for (const clase of clasesData) {
                const { data: alumnos, error } = await supabase
                    .from("clase_alumnos")
                    .select("idalumno")
                    .eq("idclase", clase.idclase); // Obtener los alumnos inscritos en cada clase

                if (error) {
                    console.error(`Error al cargar alumnos para la clase ${clase.idclase}:`, error.message);
                } else {
                    alumnosData[clase.idclase] = alumnos;
                }
                
            }
            setAlumnosPorClase(alumnosData);

            const { data: alumnoData, error: alumnosError } = await supabase
            .from("alumnos")
            .select("idalumno, nombre");
            if (alumnosError) {
                console.error("Error al cargar alumnos:", alumnosError.message);
            } else {
                setAlumnos(alumnoData || []);
            }
            console.log("alupclase", alumnosPorClase)
            
            setLoading(false);
        };
        fetchData();
    }, []);

    // Función para alternar el estado de visibilidad de los alumnos
    const toggleAlumnos = (claseId) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [claseId]: !prevState[claseId],  // Alterna la visibilidad de la clase
        }));
    };

    return (
        <div className="flex justify-between items-start h-screen bg-gray-300 p-5 font-sans">
            <TravelMenu />
            <div className="w-full bg-gray-300 p-5 rounded-lg shadow-lg max-h-full overflow-auto">
                <h2 className="text-gray-800 text-center mb-4 text-lg font-semibold">Clases del Entrenador</h2>
                {loading ? (
                    <p className="text-center text-gray-600">Cargando clases...</p>
                ) : clases.length === 0 ? (
                    <p className="text-center text-gray-600">No hay clases registradas.</p>
                ) : (
                    <ul className="space-y-4">
                        {clases.map((clase) => (
                            <li key={clase.idclase} className="p-4 rounded-lg bg-white text-black">
                                <p><strong>Nombre de la Clase:</strong> {clase.nombre}</p>
                                <p><strong>Hora:</strong> {clase.hora}</p>
                                <p><strong>Días:</strong> {clase.dias}</p>

                                {/* Botón para desplegar los alumnos inscritos */}
                                <button
                                    onClick={() => toggleAlumnos(clase.idclase)}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
                                >
                                    {isOpen[clase.idclase] ? "Ocultar Alumnos" : "Mostrar Alumnos"}
                                </button>

                                {/* Listado de alumnos, solo si la clase está desplegada */}
                                {isOpen[clase.idclase] && alumnosPorClase[clase.idclase] && (
                                    <ul className="mt-2 space-y-2">
                                        {alumnosPorClase[clase.idclase].length === 0 ? (
                                            <p className="text-gray-600">No hay alumnos inscritos en esta clase.</p>
                                        ) : (
                                            alumnosPorClase[clase.idclase].map((alumno, index) => (
                                                <li key={alumno.idalumno} className="text-gray-700">
                                                    <p><strong>{index + 1}.</strong> {alumnos.find(e => e.idalumno === alumno.idalumno)?.nombre || "N/A"}</p>
                                                </li>
                                        ))
                                    )}
                                    
                                </ul>
                                
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
