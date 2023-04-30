import { Role } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  // id: string;
  role: Role;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends IUser {}
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
