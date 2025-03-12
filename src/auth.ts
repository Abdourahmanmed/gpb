import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./Schema/schema";
import bcrypt from "bcryptjs";
import { GetUserByEmail } from "./actions/login/FetchUers";

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const validCredentials = LoginSchema.safeParse(credentials);

                if (!validCredentials.success) {
                    throw new Error("Invalid credentials format.");
                }

                const { email, password } = validCredentials.data;

                // Recherche de l'utilisateur dans la base de données
                const user = await GetUserByEmail(email);

                if (!user) {
                    throw new Error("No user found with this email.");
                }

                // Comparaison du mot de passe haché
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    throw new Error("Invalid password.");
                }

                return {
                    id: user.id,
                    name: user.Nom,
                    email: user.Email,
                    role: user.Role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            // console.log(token);
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
});
