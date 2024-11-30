
const UserProfile = ({ name, age, discipline }) => (
  <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
    
    <h2 className="text-xl font-semibold text-center">Nombre: {name}</h2>
    <p className="text-center text-gray-600">Edad: {age}</p>
    <p className="text-center text-gray-600">Disciplina: {discipline}</p>
  </div>
);

export default UserProfile;

