"use client";

import TravelMenu from '@/components/NavegationTrainer';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; // Asegúrate de usar el cliente correcto
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TrainerPage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient(); // Inicializa el cliente de Supabase

  // Efecto para cargar datos de la tabla entrenadores
  useEffect(() => {
    if (session?.id) {
      const fetchData = async () => {
        try {
          const { data, error } = await supabase
            .from("entrenadores") // Nombre de la tabla
            .select("*")
            .eq("identrenador", session.id); // Usamos el identrenador de la sesión para filtrar

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
        <h2 className="text-xl font-semibold text-center">Hola  {session.name}</h2>

        <h3 className="mt-4 text-lg font-semibold text-center">Datos del entrenador:</h3>
        <ul className="mt-2">
        {userData.map((item) => (
            <li key={item.identrenador} className="text-gray-700">
            <p><strong>Nombre:</strong> {item.nombre}</p>
            <p><strong>Disciplina:</strong> {item.disciplina}</p> {/* Añadido el campo disciplina */}
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
