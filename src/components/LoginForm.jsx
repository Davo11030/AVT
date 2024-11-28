export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">AVT WARRIORS</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Usuario:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña:</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
