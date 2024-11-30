"use client";

import TravelMenu from '@/components/NavegationAlumno';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; // Asegúrate de usar el cliente correcto
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AlumnPage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient(); // Inicializa el cliente de Supabase

  // Efecto para cargar datos de la tabla alumnos
  useEffect(() => {
    if (session?.id) {
      const fetchData = async () => {
        try {
          const { data, error } = await supabase
            .from("alumnos") // Nombre de la tabla
            .select("*")
            .eq("idalumno", session.id); // Usamos el idalumno de la sesión para filtrar

          if (error) {
            console.error("Error al cargar los datos:", error);
          } else {
            setUserData(data); // Guarda los datos obtenidos en el estado
          }
        } catch (err) {
          console.error("Error inesperado:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [session?.id]);

  // Renderizado condicional basado en el estado de carga y los datos obtenidos
  if (!session) return <p>Cargando sesión...</p>;
  if (loading) return <p>Cargando datos...</p>;
  if (!userData || userData.length === 0) return <p>No se encontraron datos para este usuario.</p>;

  return (
    <div className="p-6">
      <TravelMenu />
      <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-center">Hola {session.name}</h2>

        <h3 className="mt-4 text-lg font-semibold text-center">Datos del usuario:</h3>
        <ul className="mt-2">
          {userData.map((item) => (
            <li key={item.idalumno} className="text-gray-700">
              <p><strong>Nombre:</strong> {item.nombre}</p>
              <p><strong>Fecha de Nacimiento:</strong> {item.fecha_nacimiento}</p>
              <p><strong>Teléfono:</strong> {item.telefono}</p>
              <p><strong>Usuario:</strong> {item.usuario}</p>
              <hr className="my-2" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
