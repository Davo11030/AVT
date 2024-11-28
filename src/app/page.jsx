"use client"; // Asegúrate de que este archivo sea un Client Component

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Cambiar navegación aquí

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError('Usuario o contraseña incorrectos');
    } else if (result?.url) {
      router.push("/pages/admin"); // Cambiar ruta usando next/navigation
    }
  };


  return (
    <div className="flex flex-col items-center justify-center">
      {/* Barra superior */}
      <div className="w-full bg-[#707070] py-4 text-center">
        <h1 className="text-xl text-black font-semibold">AVT WARRIORS</h1>
      </div>
      
      {/* Formulario */}
      <div className="bg-white shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">Iniciar Sesión</h2>
        {error && (
          <div className="mb-4 text-red-600 text-center bg-red-100 p-2 rounded-md">
            {error}  {/* Muestra el mensaje de error */}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-600">Usuario:</label>
            <input
              type="text"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-3 bg-[#707070] rounded-full text-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Contraseña:</label>
            <input
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-3 bg-[#707070] rounded-full text-white focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#707070] text-white py-3 rounded-full hover:bg-gray-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>

      {/* Barra inferior */}
      <div className="w-full bg-[#707070] py-9"></div>
      </div>
  );
}