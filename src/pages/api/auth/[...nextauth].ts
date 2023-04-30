import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "passord",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    jwt({ token, user, account, profile, isNewUser, session, trigger }) {
      // if (trigger)console.log("🚀 jwt ~ trigger:", trigger);
      // if (session)console.log("🚀 jwt ~ session:", session);
      // if (isNewUser)console.log("🚀 jwt ~ isNewUser:", isNewUser);
      // if (profile)console.log("🚀 jwt ~ profile:", profile);
      // if (account)console.log("🚀 jwt ~ account:", account);
      // if (user) console.log("🚀 jwt ~ user:", user);
      // if (token) console.log("🚀 jwt ~ token:", token);

      // token is not undefined when session is strategy is set to "jwt"

      // The arguments user, account, profile and isNewUser are only passed the first time this callback is called on a new session, after the user signs in. In subsequent calls, only token will be available.
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    session({ session, user, newSession, token, trigger }) {
      // if (trigger) console.log("🚀 session ~ trigger:", trigger);
      // if (newSession) console.log("🚀 session ~ newSession:", newSession);
      //  if (session) console.log("🚀 session ~ session:", session);
      // if (token) console.log("🚀 session ~ token:", token);
      // if (user) console.log("🚀 session ~ user:", user);

      //   user is not undefined when session is strategy is set to "database"

      // strategy is set to "database"
      session.user.id = user.id;
      session.user.role = user.role;

      // strategy is set to "jwt"
      // session.user.id = token.id;
      // session.user.role = token.role;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
