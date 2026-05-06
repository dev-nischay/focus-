import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/db";
import bcrypt from "bcrypt";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Enter your credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "email", placeholder: "johnwick@gmail.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const rawData = credentials;

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
          select: { id: true, email: true, password: true, username: true },
        });

        if (user && rawData) {
          const compare = await bcrypt.compare(rawData.password, user.password);

          if (!compare) {
            return null;
          }

          return {
            id: user.id,
            name: user.username,
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user && user.email && user.name) {
        token.userId = user.id;
        token.email = user.email;
        token.username = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          userId: token.userId,
          username: token.username,
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/`;
    },
  },
});

export { handler as GET, handler as POST };
