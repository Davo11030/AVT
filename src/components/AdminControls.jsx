import React from 'react';

const AdminControls = ({ onAddTrainer, onAddStudent, onAddClass, onViewDebts }) => (
  <div className="p-4 bg-gray-100 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Panel de Control del Administrador</h2>
    <div className="space-y-4">
      {/* Botones para diferentes acciones */}
      <button
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={onAddTrainer}
      >
        Añadir Entrenador
      </button>
      <button
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        onClick={onAddStudent}
      >
        Añadir Alumno
      </button>
      <button
        className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
        onClick={onAddClass}
      >
        Crear Nueva Clase
      </button>
      <button
        className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={onViewDebts}
      >
        Ver Alumnos con Adeudos
      </button>
    </div>
  </div>
);

export default AdminControls;
