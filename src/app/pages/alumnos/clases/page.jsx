"use client";
import TravelMenu from "@/components/NavegationAlumno";
import { createClient } from "@/utils/supabase/server";
import { useSession } from "next-auth/react"; // Asegúrate de tener next-auth configurado
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const [clases, setClases] = useState([]);
    const [clasesa, setClasesa] = useState([]);
    const [entrenadores, setEntrenadores] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
        router.push("/403");
        }
    }, [status]);
    // Cargar datos iniciales
    useEffect(() => {
        const fetchData = async () => {
        const { data: entrenadoresData, error: entrenadoresError } = await supabase
            .from("entrenadores")
            .select("identrenador, nombre");
        if (entrenadoresError) {
            console.error("Error al cargar entrenadores:", entrenadoresError.message);
        } else {
            setEntrenadores(entrenadoresData || []);
        }

        
        const { data: clasesData, error: clasesError } = await supabase
            .from("clases")
            .select("*");
        if (clasesError) {
            console.error("Error al cargar clases:", clasesError.message);
        } else {
            setClases(clasesData || []);
        }

        const { data: clasesaData, error: clasesaError } = await supabase
            .from("clase_alumnos")
            .select("*");
        if (clasesaError) {
            console.error("Error al cargar clases y alumnos:", clasesError.message);
        } else {
            setClasesa(clasesaData || []);
        }

        console.log("clase session:", session)
        if (session?.id) {
            const { data, error } = await supabase
            .from("alumnos") // Tabla de alumnos
            .select("*")
            .eq("idalumno", session.id); // Filtramos por el ID del alumno en sesión

            if (error) {
            console.error("Error al cargar los datos:", error);
            } else {
            setUserData(data[0]); // Guarda la información del alumno
            }
        }
        
        setLoading(false);
        };

        fetchData();
    }, [session?.id]);

    // Función para manejar la inscripción o desinscripción
    const handleInscripcion = async (idclase) => {
        if (userData) {
        const { idalumno } = userData;

        // Comprobar si el alumno ya está inscrito en la clase
        const { data: inscripcion, error } = await supabase
            .from("clase_alumnos")
            .select("*")
            .eq("idclase", idclase)
            .eq("idalumno", idalumno);
            // .single();  // Usamos single() ya que solo debe haber un resultado
        console.log(inscripcion);
        if (error) {
            console.error("Error al verificar la inscripción:", error.message);
            return;
        }
        
        if (inscripcion.length>0) {
            // Si ya está inscrito, proceder a desinscribirlo
            const { error: deleteError } = await supabase
            .from("clase_alumnos")
            .delete()
            .eq("idclase", idclase)
            .eq("idalumno", idalumno);

            if (deleteError) {
            console.error("Error al desinscribir:", deleteError.message);
            } else {
            setClasesa((prevClasesa) => prevClasesa.filter(e => e.idclase !== idclase));
            alert("Desinscrito de la clase correctamente.");
            }
        } else {
            // Si no está inscrito, proceder a inscribirlo
            const { error: insertError } = await supabase
            .from("clase_alumnos")
            .insert([{ idclase, idalumno }]);

            if (insertError) {
            console.error("Error al inscribir:", insertError.message);
            } else {
                setClasesa((prevClasesa) => [...prevClasesa, { idclase, idalumno: session.id }]);
            alert("Inscrito en la clase correctamente.");
            }
        }
        }
    };

    return (
        <div className="flex justify-between items-start h-screen bg-gray-300 p-5 font-sans">
        <TravelMenu />
        <div className="w-full bg-gray-400 p-5 rounded-lg shadow-lg max-h-full overflow-auto">
            <h2 className="text-gray-800 text-center mb-4 text-lg font-semibold">Lista de Clases</h2>
            {loading ? (
            <p className="text-center text-gray-600">Cargando clases...</p>
            ) : clases.length === 0 ? (
            <p className="text-center text-gray-600">No hay clases registradas.</p>
            ) : (
            <ul className="space-y-4">
                {clases.map((clase, index) => (
                <li key={index} className="p-4 rounded-lg bg-white text-black">
                    <p><strong>Nombre:</strong> {clase.nombre}</p>
                    <p><strong>Entrenador:</strong> {entrenadores.find(e => e.identrenador === clase.identrenador)?.nombre || "N/A"}</p>
                    <p><strong>Hora:</strong> {clase.hora}</p>
                    <p><strong>Días:</strong> {clase.dias}</p>

                    {/* Botón para inscribirse/desinscribirse */}
                    <button
                        onClick={() => handleInscripcion(clase.idclase)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                        {clasesa.some(e => e.idclase === clase.idclase && e.idalumno === session.id)
                            ? "Desinscribirse"
                            : "Inscribirse"}

                    </button>
                </li>
                ))}
            </ul>
            )}
        </div>
        </div>
    );
    }
