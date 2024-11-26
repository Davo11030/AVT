import React from 'react';

const LoginForm = () => (
  <div className="flex flex-col items-center bg-gray-100 h-screen justify-center">
    <h1 className="text-3xl font-bold mb-6">AVT WARRIORS</h1>
    <div className="w-80">
      <input
        type="text"
        placeholder="Usuario"
        className="mb-4 p-3 border rounded w-full"
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="mb-4 p-3 border rounded w-full"
      />
      <button className="w-full bg-blue-500 text-white py-2 px-4 rounded">
        Iniciar Sesión
      </button>
    </div>
  </div>
);

export default LoginForm;
