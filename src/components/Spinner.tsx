export default function LoadingSpinner() {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="flex justify-center items-center">
          {/* Spinner */}
          <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
          <p className="ml-4 text-xl text-gray-700">Chargement des données...</p>
        </div>
      </div>
    );
  }
  