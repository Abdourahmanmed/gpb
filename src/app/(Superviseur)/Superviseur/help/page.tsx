import React from "react";
import { HelpCircle } from "lucide-react";

const PageAideSuperviseurGuichet = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-800">Aide - Superviseur des Agents Guichets</h1>
      </div>

      <p className="text-gray-600">
        Cette vidéo vous explique comment le <strong>Superviseur</strong> peut suivre et gérer les activités des <strong>agents guichets</strong>.
        Elle couvre la supervision en temps réel, les rapports, et les actions disponibles depuis votre interface.
      </p>

      {/* 🎥 Vidéo intégrée : YouTube ou vidéo locale */}
      <div className="aspect-w-16 aspect-h-9 w-full">
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src="https://www.youtube.com/embed/ABC123xyz" // Remplace ABC123xyz par l’ID de ta vidéo
          title="Tutoriel Superviseur Agents Guichets"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <p className="text-sm text-gray-500">
        Pour toute question ou problème, veuillez contacter l’administrateur ou le support technique.
      </p>
    </div>
  );
};

export default PageAideSuperviseurGuichet;
