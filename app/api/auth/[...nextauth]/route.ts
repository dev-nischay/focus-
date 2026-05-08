import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/prisma/db";
import bcrypt from "bcrypt";
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Enter your credentials",

      credentials: {
        email: { label: "email", type: "email", placeholder: "johnwick@gmail.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
          select: { id: true, email: true, password: true, username: true },
        });

        if (user) {
          const compare = await bcrypt.compare(credentials.password, user.password);

          if (!compare) {
            return null;
          }

          return {
            id: String(user.id),
            userId: user.id,
            username: user.username,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.userId !== undefined && token.email && token.username) {
        session.user = {
          ...session.user,
          userId: token.userId,
          email: token.email,
          username: token.username,
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
