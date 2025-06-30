import React from "react";
import { HelpCircle } from "lucide-react";

const PageAideResponsableCommercial = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-800">Aide - Responsable Commercial</h1>
      </div>

      <p className="text-gray-600">
        Cette vidéo vous guide dans l'utilisation des fonctionnalités destinées au <strong>Responsable Commercial</strong> dans l'application.
        Elle vous explique comment suivre les performances, gérer les agents et accéder aux statistiques clés.
      </p>

      {/* 🎥 Vidéo intégrée : YouTube ou vidéo locale */}
      <div className="aspect-w-16 aspect-h-9 w-full">
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src="https://www.youtube.com/embed/ABC123xyz" // Remplace ABC123xyz par l'ID réel
          title="Tutoriel Responsable Commercial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <p className="text-sm text-gray-500">
        En cas de difficulté, contactez l'équipe support ou l'administrateur de la plateforme.
      </p>
    </div>
  );
};

export default PageAideResponsableCommercial;
