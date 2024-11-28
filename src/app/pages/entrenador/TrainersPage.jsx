import React from 'react';
import TrainerCard from '../components/TrainerCard';

const trainers = [
  { id: 1, name: "Carlos López", age: 35, discipline: "MMA", photo: "/trainer1.png" },
  { id: 2, name: "Ana Pérez", age: 29, discipline: "Kick Boxing", photo: "/trainer2.png" },
  { id: 3, name: "Juan García", age: 40, discipline: "Jiu Jitsu", photo: "/trainer3.png" },
];

const TrainersPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Entrenadores</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainers.map((trainer) => (
        <TrainerCard key={trainer.id} {...trainer} />
      ))}
    </div>
  </div>
);

export default TrainersPage;
