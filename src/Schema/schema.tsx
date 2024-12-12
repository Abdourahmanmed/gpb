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
export const NouveauClientSchema = z.object({
    BoitePostale: z.string().min(1, { message: "Le numéro de boîte postale est obligatoire." }),
    Nom: z.string().min(1, { message: "Le nom est obligatoire." }),
    Email: z.string().email({ message: "L'email est obligatoire." }),
    Telephone: z.string().min(1, { message: "Le téléphone est obligatoire." }),
    Adresse: z.string().min(1, { message: "L'adresse est obligatoire." }),
    Role: z.string().min(1, { message: "Choisir un type de client." }),
});

//schema pour le changement du nom
export const ChangeNameSchema = z.object({
    Nom: z.string().min(1, { message: "Le nom est obligatoire." }),
    Montant: z.literal(5000),
    Methode_de_paiement: z.enum(["credit", "cheque", "cash", "wallet"], {
        required_error: "Veuillez sélectionner une méthode de paiement.",
    }),
    Wallet: z.enum(["cac_pay", "waafi", "d_money"]).optional(),
});

//schema pour la livraison a domicile
export const LivreDoSchema = z.object({
    Adresse_Livraison_Domicile: z.string().min(1, { message: "Le nom est obligatoire." }),
    Montant: z.literal(5000),
    Methode_de_paiement: z.enum(["credit", "cheque", "cash", "wallet"], {
        required_error: "Veuillez sélectionner une méthode de paiement.",
    }),
    Wallet: z.enum(["cac_pay", "waafi", "d_money"]).optional(),
});

//schema pour la collections 
export const CollectionSchema = z.object({
    Adresse_collection: z.string().min(1, { message: "Le nom est obligatoire." }),
    Montant: z.literal(5000),
    Methode_de_paiement: z.enum(["credit", "cheque", "cash", "wallet"], {
        required_error: "Veuillez sélectionner une méthode de paiement.",
    }),
    Wallet: z.enum(["cac_pay", "waafi", "d_money"]).optional(),
});


// Schéma de validation du formulaire de saisi de sous couverte
export const SousCouvertSchema = z.object({
    sousCouvertures: z
        .array(
            z.object({
                societe: z.string().min(1, "Nom de société requis"),
                personne: z.string().min(1, "Nom de la personne requis"),
                adresse: z.string().min(1, "Adresse requise"),
                telephone: z.string().min(10, "Numéro de téléphone invalide"),
            })
        )
        .max(5, "Vous ne pouvez pas ajouter plus de 5 sous-couvertures."),
    methodePaiement: z.string().min(1, "Méthode de paiement requise"),
    wallet: z.string().optional(),
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

