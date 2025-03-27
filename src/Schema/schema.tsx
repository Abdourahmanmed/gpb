import * as z from "zod";

// schema pour la connexion du systeme
export const LoginSchema = z.object({
  email: z.string().email({
    message: "l'email est obligatoire",
  }),
  password: z.string().min(1, {
    message: "le password est obligatoire.",
  }),
});

// shema pour ajouter un utilisateur sur le systeme
export const RegisterSchema = z.object({
  Nom: z.string().min(1, { message: "le Nom  est obligatoire." }),
  Email: z.string().email({
    message: "l'email est obligatoire",
  }),
  Password: z.string().min(1, {
    message: "le password est obligatoire.",
  }),
  Telephone: z.string().min(1, {
    message: "le Telephone est obligatoire.",
  }),
  Adresse: z.string().min(1, {
    message: "l'adresse est obligatoire.",
  }),
  Role: z.string().min(1, {
    message: "choisir un role.",
  }),
});

// shema pour editer un agent sur le systeme
export const EditAgentSchema = z.object({
  Nom: z.string().min(1, { message: "le Nom  est obligatoire." }),
  Email: z.string().email({
    message: "l'email est obligatoire",
  }),
  password: z.string().min(1, {
    message: "le password est obligatoire.",
  }),
  Telephone: z.string().min(1, {
    message: "le Telephone est obligatoire.",
  }),
  Adresse: z.string().min(1, {
    message: "l'adresse est obligatoire.",
  }),
  Role: z.string().min(1, {
    message: "le role  est obligatoire.",
  }),
});

// shema pour ajouter et editer un utilisateur sur le systeme
export const EditUserSchema = z.object({
  Nom: z.string().min(1, { message: "le Nom  est obligatoire." }),
  Email: z.string().email({
    message: "l'email est obligatoire",
  }),
  Password: z.string().min(1, {
    message: "le password est obligatoire.",
  }),
  Telephone: z.string().min(1, {
    message: "le Telephone est obligatoire.",
  }),
  Adresse: z.string().min(1, {
    message: "l'adresse est obligatoire.",
  }),
  role: z.string().min(1, {
    message: "l'adresse est obligatoire.",
  }),
});

// schema pour le ajouter un nouveau client
export const NouveauClientSchemaStepOne = z.object({
  BoitePostale: z
    .string()
    .min(1, { message: "Le numéro de boîte postale est obligatoire." }),
  Nom: z.string().min(1, { message: "Le nom est obligatoire." }),
  Email: z.string().email({ message: "L'email est obligatoire." }),
  Telephone: z.string().min(1, { message: "Le téléphone est obligatoire." }),
  Adresse: z.string().min(1, { message: "L'adresse est obligatoire." }),
  Role: z.string().min(1, { message: "Choisir un type de client." }),
  montantRd: z.number().optional(),
  Reference_Rdv: z.string().optional(),
});

//schema pour le ajouter un nouveau client

// Schéma pour les différentes méthodes de paiement
const TypeMethodePaiement = z.discriminatedUnion("Methode_de_paiement", [
  // Méthode par chèque
  z.object({
    Methode_de_paiement: z.literal("cheque"),
    Numero_cheque: z.string().min(1, "Le numéro du chèque est requis."),
    Nom_Banque: z.string().min(1, "Le nom de la banque est requis."),
  }),
  // Méthode par cash
  z.object({
    Methode_de_paiement: z.literal("cash"),
  }),
  // Méthode par wallet
  z.object({
    Methode_de_paiement: z.literal("wallet"),
    wallet: z.enum(["cac_pay", "waafi", "d_money", "sabapay", "dahabplaces"]),
    Numero_wallet: z
      .string()
      .min(1, "Le numéro de wallet est requis.")
      .regex(
        /^[0-9\s]+$/,
        "Le numéro de wallet doit contenir uniquement des chiffres."
      ),
  }),
]);

// Schéma pour ajouter un nouveau client avec des fichiers scannés

const allowedExtensions = ["pdf", "jpg", "jpeg", "png"];
const minFileSize = 10 * 1024; // 10 KB;

export const NouveauClientSchemaStepTwo = z
  .discriminatedUnion("TypeClient", [
    // Schéma pour les clients "entreprise"
    z.object({
      TypeClient: z.literal(true),
      Abonnement: z.instanceof(File).refine(
        (file) => {
          const fileName = file.name || "";
          const fileExtension = fileName.split(".").pop()?.toLowerCase();
          return (
            allowedExtensions.includes(fileExtension || "") &&
            file.size >= minFileSize
          );
        },
        {
          message:
            "Le fichier d'abonnement doit être un PDF, JPG ou PNG et supérieur à 10 KB.",
        }
      ),
      patent_quitance: z.instanceof(File).refine(
        (file) => {
          const fileName = file.name || "";
          const fileExtension = fileName.split(".").pop()?.toLowerCase();
          return (
            allowedExtensions.includes(fileExtension || "") &&
            file.size >= minFileSize
          );
        },
        {
          message:
            "Le fichier de quittance patente doit être un PDF, JPG ou PNG et supérieur à 10 KB.",
        }
      ),
      Identiter: z.instanceof(File).refine(
        (file) => {
          const fileName = file.name || "";
          const fileExtension = fileName.split(".").pop()?.toLowerCase();
          return (
            allowedExtensions.includes(fileExtension || "") &&
            file.size >= minFileSize
          );
        },
        {
          message:
            "Le fichier d'identité doit être un PDF, JPG ou PNG et supérieur à 10 KB.",
        }
      ),
    }),

    // Schéma pour les clients "particulier"
    z.object({
      TypeClient: z.literal(false),
      Abonnement: z.instanceof(File).refine(
        (file) => {
          const fileName = file.name || "";
          const fileExtension = fileName.split(".").pop()?.toLowerCase();
          return (
            allowedExtensions.includes(fileExtension || "") &&
            file.size >= minFileSize
          );
        },
        {
          message:
            "Le fichier d'abonnement doit être un PDF, JPG ou PNG et supérieur à 10 KB.",
        }
      ),
      Identiter: z.instanceof(File).refine(
        (file) => {
          const fileName = file.name || "";
          const fileExtension = fileName.split(".").pop()?.toLowerCase();
          return (
            allowedExtensions.includes(fileExtension || "") &&
            file.size >= minFileSize
          );
        },
        {
          message:
            "Le fichier d'identité doit être un PDF, JPG ou PNG et supérieur à 10 KB.",
        }
      ),
    }),
  ])
  .and(TypeMethodePaiement);

//schema pour le changement du nom
export const ChangeNameSchema = z.object({
  Nom: z.string().min(1, { message: "Le nom est obligatoire." }),
  Montant: z.literal(5000),
  Methode_de_paiement: z.enum(["cheque", "cash", "wallet"], {
    required_error: "Veuillez sélectionner une méthode de paiement.",
  }),
  Wallet: z
    .enum(["cac_pay", "waafi", "d_money", "sabapay", "dahabplaces"])
    .optional(),
  Numero_wallet: z.string().optional(),
  Numero_cheque: z.string().optional(),
  Nom_Banque: z.string().optional(),
  ReferenceId: z.string().optional(),
});

//schema pour la livraison a domicile
export const LivreDoSchema = z.object({
  Adresse_Livraison_Domicile: z
    .string()
    .min(1, { message: "L'adresse est obligatoire." }),
  Montant: z.literal(5000),
  Methode_de_paiement: z.enum(["cheque", "cash", "wallet"], {
    required_error: "Veuillez sélectionner une méthode de paiement.",
  }),
  Wallet: z
    .enum(["cac_pay", "waafi", "d_money", "sabapay", "dahabplaces"])
    .optional(),
  Numero_wallet: z.string().optional(),
  Numero_cheque: z.string().optional(),
  Nom_Banque: z.string().optional(),
  ReferenceId: z.string().optional(),
});

//schema pour la collections
export const CollectionSchema = z.object({
  Adresse_collection: z
    .string()
    .min(1, { message: "L'adresse est obligatoire." }),
  Montant: z.literal(5000),
  Methode_de_paiement: z.enum(["cheque", "cash", "wallet"], {
    required_error: "Veuillez sélectionner une méthode de paiement.",
  }),
  Wallet: z
    .enum(["cac_pay", "waafi", "d_money", "sabapay", "dahabplaces"])
    .optional(),
  Numero_wallet: z.string().optional(),
  Numero_cheque: z.string().optional(),
  Nom_Banque: z.string().optional(),
  ReferenceId: z.string().optional(),
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
        telephone: z
          .string()
          .min(10, { message: "Numéro de téléphone invalide." }),
      })
    )
    .max(5, {
      message: "Vous ne pouvez pas ajouter plus de 5 sous-couvertures.",
    }),
  Methode_de_paiement: z
    .string()
    .min(1, { message: "Méthode de paiement requise." }),
  Wallet: z.string().optional(),
  Numero_wallet: z.string().optional(),
  Numero_cheque: z.string().optional(),
  Nom_Banque: z.string().optional(),
  totalMontant: z.number(),
});

//schema pour verification le montant saisi et le montant gener
export const MontantSaiasiSchema = z.object({
  montantSaisi: z.string().min(1, "Le montant doit être supérieur à zéro"),
});

// Schéma de validation avec zod
export const PaiementSchema = z.object({
  Montant: z.number(),
  Methode_de_paiement: z.enum(["cheque", "cash", "wallet"], {
    required_error: "Veuillez sélectionner une méthode de paiement.",
  }),
  Wallet: z
    .enum(["cac_pay", "waafi", "d_money", "sabapay", "dahabplaces"])
    .optional(),
  Numero_wallet: z.string().optional(),
  Numero_cheque: z.string().optional(),
  Nom_Banque: z.string().optional(),
  ReferenceId: z.string().optional(),
});

// Schéma de validation avec zod
export const AchatCleSchema = z.object({
  Montant: z.literal(2000),
  Methode_de_paiement: z.enum(["cheque", "cash", "wallet"], {
    required_error: "Veuillez sélectionner une méthode de paiement.",
  }),
  Wallet: z
    .enum(["cac_pay", "waafi", "d_money", "sabapay", "dahabplaces"])
    .optional(),
  Numero_wallet: z.string().optional(),
  Numero_cheque: z.string().optional(),
  Nom_Banque: z.string().optional(),
  ReferenceId: z.string().optional(),
});

// Schéma global avec condition (sans utiliser refine directement) pour la collection
const DynamicSchemaCll = z.discriminatedUnion("Have_cll", [
  z.object({
    Have_cll: z.literal(true),
    Adresse_collection: z
      .string()
      .min(1, { message: "L'adresse est obligatoire." }),
    montantCll: z.number(),
    reference_collection: z.string().optional()
  }),
  z.object({
    Have_cll: z.literal(false),
  }),
]);

// Schéma global avec condition (sans utiliser refine directement) pour livraison a domicile
const DynamicSchemaLd = z.discriminatedUnion("Have_ld", [
  z.object({
    Have_ld: z.literal(true), // Discriminant avec la valeur `true`
    Adresse_Livraison_Domicile: z
      .string()
      .min(1, { message: "L'adresse est obligatoire." }),
    montantLd: z.number(),
    reference_Ld: z.string().optional()
  }),
  z.object({
    Have_ld: z.literal(false), // Discriminant avec la valeur `false`
  }),
]);

// Schéma global avec condition (sans utiliser refine directement)
export const DynamicSchema = z
  .discriminatedUnion("Have_sous_couvert_ld_cll", [
    z.object({
      Have_sous_couvert_ld_cll: z.literal(true), // Discriminant avec la valeur `true`
      sousCouvertures: z
        .array(
          z.object({
            societe: z.string().min(1, { message: "Nom de société requis." }),
            personne: z
              .string()
              .min(1, { message: "Nom de la personne requis." }),
            adresse: z.string().min(1, { message: "Adresse requise." }),
            telephone: z
              .string()
              .min(10, { message: "Numéro de téléphone invalide." }),
          })
        )
        .max(5, {
          message: "Vous ne pouvez pas ajouter plus de 5 sous-couvertures.",
        }),
      montantSC: z.number(),
      reference_Sc: z.string().optional()
    }),
    z.object({
      Have_sous_couvert_ld_cll: z.literal(false), // Discriminant avec la valeur `false`
    }),
  ])
  .and(DynamicSchemaLd)
  .and(DynamicSchemaCll);

// Schéma global pour le formulaire multi-étapes
export const MultiFormeSchema = z
  .object({
    ...NouveauClientSchemaStepOne.shape,
    step: z.number().min(1, { message: "Le numéro de l'étape est requis." }),
    Adresse_Livraison_Domicile: z
      .string()
      .min(1, { message: "L'adresse est obligatoire." }),
    Adresse_collection: z
      .string()
      .min(1, { message: "L'adresse est obligatoire." }),
    totalMontant: z
      .string()
      .min(1, { message: "Le montant total est requis." }),
  })
  .and(DynamicSchema)
  .and(NouveauClientSchemaStepTwo);




export const DemandeSchema = z.object({
  lettreDemande: z
    .instanceof(File, { message: "Veuillez sélectionner un fichier valide." }),
  nomDemandeur: z
    .string().optional()
});

