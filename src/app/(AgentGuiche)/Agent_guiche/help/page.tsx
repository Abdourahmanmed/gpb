import React from "react";
import { HelpCircle } from "lucide-react";

const PageAide = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-800">Aide - Agent Guichet</h1>
      </div>

      <p className="text-gray-600">
        Cette vidéo vous guide à travers l'utilisation de la partie <strong>Agent Guichet</strong> de l'application.
        Suivez les étapes pour comprendre comment effectuer les opérations principales.
      </p>

      {/* ▶️ Vidéo intégrée - Vous pouvez soit utiliser un lien externe, soit héberger une vidéo locale */}
      <div className="aspect-w-16 h-80 w-full">
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src="https://www.youtube.com/embed/UuapClCEMrM"
          title="Tutoriel Agent Guichet"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* 📌 Footer ou rappel */}
      <p className="text-sm text-gray-500">
        Si vous avez des questions supplémentaires, veuillez contacter l'administrateur ou le support technique.
      </p>
    </div>
  );
};

export default PageAide;
