import * as z from "zod";

// schema pour la connexion du systeme 
export const LoginSchema = z.object({
    email: z.string().email({
        message: "l'email est obligatoire"
    }),
    password: z.string().min(1, {
        message: "le password est obligatoire."
    })
});

// shema pour ajouter un utilisateur sur le systeme
export const RegisterSchema = z.object({
    Nom: z.string().min(1, { message: "le Nom  est obligatoire." }),
    Email: z.string().email({
        message: "l'email est obligatoire"
    }),
    Password: z.string().min(1, {
        message: "le password est obligatoire."
    }),
    Telephone: z.string().min(1, {
        message: "le Telephone est obligatoire."
    }),
    Adresse: z.string().min(1, {
        message: "l'adresse est obligatoire."
    }),
    Role: z.string().min(1, {
        message: "choisir un role."
    })
});

// schema pour le ajouter un nouveau client
export const NouveauClientSchemaStepOne = z.object({
    BoitePostale: z.string().min(1, { message: "Le numéro de boîte postale est obligatoire." }),
    Nom: z.string().min(1, { message: "Le nom est obligatoire." }),
    Email: z.string().email({ message: "L'email est obligatoire." }),
    Telephone: z.string().min(1, { message: "Le téléphone est obligatoire." }),
    Adresse: z.string().min(1, { message: "L'adresse est obligatoire." }),
    Role: z.string().min(1, { message: "Choisir un type de client." }),
});

// Schéma pour ajouter un nouveau client avec des fichiers scannés

const allowedExtensions = ["pdf", "jpg", "jpeg", "png"];
const minFileSize = 10 * 1024; // 10 KB;



export const NouveauClientSchemaStepTwo = z.object({
    Abonnement: z
        .instanceof(File)
        .refine(
            (file) => {
                const fileName = file.name || "";
                const fileExtension = fileName.split('.').pop()?.toLowerCase();
                return (
                    allowedExtensions.includes(fileExtension || "") && file.size >= minFileSize
                );
            },
            {
                message: "Le fichier d'abonnement doit être un PDF, JPG ou PNG et supérieur à 10 KB.",
            }
        ),
    patent_quitance: z
        .instanceof(File)
        .refine(
            (file) => {
                const fileName = file.name || "";
                const fileExtension = fileName.split('.').pop()?.toLowerCase();
                return (
                    allowedExtensions.includes(fileExtension || "") && file.size >= minFileSize
                );
            },
            {
                message: "Le fichier de quittance patente doit être un PDF, JPG ou PNG et supérieur à 10 KB.",
            }
        ),
    Identiter: z
        .instanceof(File)
        .refine(
            (file) => {
                const fileName = file.name || "";
                const fileExtension = fileName.split('.').pop()?.toLowerCase();
                return (
                    allowedExtensions.includes(fileExtension || "") && file.size >= minFileSize
                );
            },
            {
                message: "Le fichier d'identité doit être un PDF, JPG ou PNG et supérieur à 10 KB.",
            }
        ),
});
//schema pour le changement du nom
export const ChangeNameSchema = z.object({
    Nom: z.string().min(1, { message: "Le nom est obligatoire." }),
    Montant: z.literal(5000),
    Methode_de_paiement: z.enum(["cheque", "cash", "wallet"], {
        required_error: "Veuillez sélectionner une méthode de paiement.",
    }),
    Wallet: z.enum(["cac_pay", "waafi", "d_money", "sabapay", "dahabplaces"]).optional(),
    Numero_wallet: z.string().optional(),
    Numero_cheque: z.string().optional(),
    Nom_Banque: z.string().optional(),
});

//schema pour la livraison a domicile
export const LivreDoSchema = z.object({
    Adresse_Livraison_Domicile: z.string().min(1, { message: "Le nom est obligatoire." }),
    Montant: z.literal(5000),
    Methode_de_paiement: z.enum(["cheque", "cash", "wallet"], {
        required_error: "Veuillez sélectionner une méthode de paiement.",
    }),
    Wallet: z.enum(["cac_pay", "waafi", "d_money", "sabapay", "dahabplaces"]).optional(),
    Numero_wallet: z.string().optional(),
    Numero_cheque: z.string().optional(),
    Nom_Banque: z.string().optional(),
});

//schema pour la collections 
export const CollectionSchema = z.object({
    Adresse_collection: z.string().min(1, { message: "Le nom est obligatoire." }),
    Montant: z.literal(5000),
    Methode_de_paiement: z.enum(["cheque", "cash", "wallet"], {
        required_error: "Veuillez sélectionner une méthode de paiement.",
    }),
    Wallet: z.enum(["cac_pay", "waafi", "d_money", "sabapay", "dahabplaces"]).optional(),
    Numero_wallet: z.string().optional(),
    Numero_cheque: z.string().optional(),
    Nom_Banque: z.string().optional(),
});


// Schéma de validation du formulaire de saisi de sous couverte
// Schéma de validation pour les sous-couvertures
export const SousCouvertSchema = z.object({
    sousCouvertures: z
        .array(
            z.object({
                societe: z.string().min(1, { message: "Nom de société requis." }),
                personne: z.string().min(1, { message: "Nom de la personne requis." }),
                adresse: z.string().min(1, { message: "Adresse requise." }),
                telephone: z.string().min(10, { message: "Numéro de téléphone invalide." }),
            })
        )
        .max(5, { message: "Vous ne pouvez pas ajouter plus de 5 sous-couvertures." }),
    Methode_de_paiement: z.string().min(1, { message: "Méthode de paiement requise." }),
    wallet: z.string().optional(),
    Numero_wallet: z.string().optional(),
    Numero_cheque: z.string().optional(),
    Nom_Banque: z.string().optional(),
    totalMontant: z.string().min(1, { message: "Le numéro de l'étape est requis." }),
});

//schema pour verification le montant saisi et le montant gener
export const MontantSaiasiSchema = z.object({
    montantSaisi: z.string().min(1, 'Le montant doit être supérieur à zéro'),
});


// Schéma de validation avec zod
export const PaiementSchema = z.object({
    Montant: z.literal(2000),
    Methode_de_paiement: z.enum(["credit", "cheque", "cash", "wallet"], {
        required_error: "Veuillez sélectionner une méthode de paiement.",
    }),
    Wallet: z.enum(["cac_pay", "waafi", "d_money", "sabapay", "dahabplaces"]).optional(),
    Numero_wallet: z.string().optional(),
    Numero_cheque: z.string().optional(),
    Nom_Banque: z.string().optional(),
});



// Schéma global pour le formulaire multi-étapes
export const MultiFormeSchema = NouveauClientSchemaStepOne
    .merge(SousCouvertSchema)
    .merge(NouveauClientSchemaStepTwo)
    .extend({
        step: z.number().min(1, { message: "Le numéro de l'étape est requis." }),
    });

