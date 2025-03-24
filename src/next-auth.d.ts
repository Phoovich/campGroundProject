import NextAuth from "next-auth";
import { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
      token: string;
    };
  }
  interface User {
    token?: string;
    role?: string;
  }
}

