import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    userId: number | string;
    username: string;
    email: string;
  }
}
declare module "next-auth" {
  // Extend the built-in session user
  interface Session {
    user: {
      username: string;
      userId: number | string;
    } & DefaultSession["user"];
  }

  // Extend the built-in user type returned by authorize
  interface User {
    id: number;
  }
}
