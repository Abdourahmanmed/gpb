import * as z from "zod";


export const LoginSchema = z.object({
    email: z.string().email({
        message: "l'email est obligatoire"
    }),
    password: z.string().min(1, {
        message: "le password est obligatoire."
    })
});


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

export const NouveauClientSchema = z.object({
    BoitePostale: z.string().min(1, { message: "Le numéro de boîte postale est obligatoire." }),
    Nom: z.string().min(1, { message: "Le nom est obligatoire." }),
    Email: z.string().email({ message: "L'email est obligatoire." }),
    Telephone: z.string().min(1, { message: "Le téléphone est obligatoire." }),
    Adresse: z.string().min(1, { message: "L'adresse est obligatoire." }),
    Role: z.string().min(1, { message: "Choisir un type de client." }),
});
