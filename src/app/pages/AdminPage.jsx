import React from 'react';
import StudentList from '../components/StudentList';
import TrainerCard from '../components/TrainerCard';

const students = [
  { id: 1, name: "Pedro Sánchez", age: 25, discipline: "MMA" },
  { id: 2, name: "María López", age: 22, discipline: "Kick Boxing" },
  { id: 3, name: "Luis Rodríguez", age: 28, discipline: "Jiu Jitsu" },
];

const trainers = [
  { id: 1, name: "Carlos López", age: 35, discipline: "MMA", photo: "/trainer1.png" },
  { id: 2, name: "Ana Pérez", age: 29, discipline: "Kick Boxing", photo: "/trainer2.png" },
];

const AdminPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Entrenadores</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer.id} {...trainer} />
        ))}
      </div>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2">Alumnos Inscritos</h2>
      <StudentList students={students} />
    </div>
  </div>
);

export default AdminPage;
