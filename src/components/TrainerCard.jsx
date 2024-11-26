import React from 'react';

const TrainerCard = ({ name, age, discipline, photo }) => (
  <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
    <img
      src={photo || "/default-avatar.png"}
      alt={name}
      className="w-16 h-16 rounded-full"
    />
    <div className="ml-4">
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-gray-600">Edad: {age}</p>
      <p className="text-gray-600">Disciplina: {discipline}</p>
    </div>
  </div>
);

export default TrainerCard;
