import React from "react";
import { HelpCircle } from "lucide-react";

const PageAideCommercial = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-800">Aide - Agent Commercial</h1>
      </div>

      <p className="text-gray-600">
        Cette vidéo vous explique comment utiliser l’interface dédiée aux <strong>Agents Commerciaux</strong> de l’application.
      </p>

      {/* 📽️ Vidéo YouTube ou locale */}
      <div className="aspect-w-16 aspect-h-9 w-full">
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src="https://www.youtube.com/embed/ABC123xyz" // Remplace ABC123xyz par l'ID réel de ta vidéo
          title="Tutoriel Agent Commercial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <p className="text-sm text-gray-500">
        Besoin d'aide supplémentaire ? Contactez l’administrateur ou le support.
      </p>
    </div>
  );
};

export default PageAideCommercial;
