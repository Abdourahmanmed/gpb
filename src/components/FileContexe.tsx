"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Définition du type de l'objet fichier
type FileObject = {
    Abonnement: File;
    Identiter: File;
    patent_quitance?: File;
};

// Définition du type du contexte
type FileContextType = {
    files: FileObject[]; // Tableau d'objets contenant plusieurs fichiers
    addFile: (fileObject: FileObject) => void; // Ajoute un objet de fichiers
    removeFile: (index: number) => void;
};

// Création du contexte avec une valeur par défaut
const FileContext = createContext<FileContextType | undefined>(undefined);

// Provider du contexte
export const FileProvider = ({ children }: { children: ReactNode }) => {
    const [files, setFiles] = useState<FileObject[]>([]);

    // Ajouter un objet contenant plusieurs fichiers
    const addFile = (fileObject: FileObject) => {
        setFiles((prevFiles) => [...prevFiles, fileObject]);
    };

    // Supprimer un fichier par son index
    const removeFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <FileContext.Provider value={{ files, addFile, removeFile }}>
            {children}
        </FileContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useFileContext = () => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error("useFileContext doit être utilisé dans un FileProvider");
    }
    return context;
};
