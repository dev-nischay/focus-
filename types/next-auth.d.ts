import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    userId?: number;
    username?: string;
    email?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      username: string;
      userId: number;
      email: string;
    };
  }

  interface User extends DefaultUser {
    username: string;
    userId: number;
    email: string;
  }
}
