import React from 'react';

const UserProfile = ({ name, age, discipline }) => (
  <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
    <img
      src="/default-avatar.png"
      alt="Foto de perfil"
      className="w-24 h-24 rounded-full mx-auto mb-4"
    />
    <h2 className="text-xl font-semibold text-center">{name}</h2>
    <p className="text-center text-gray-600">Edad: {age}</p>
    <p className="text-center text-gray-600">Disciplina: {discipline}</p>
  </div>
);

export default UserProfile;

