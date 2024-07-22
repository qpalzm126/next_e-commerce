import clientPromise from "@/app/lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID?.toString() ?? "",
      clientSecret: process.env.GOOGLE_SECRET_ID?.toString() ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET?.toString() ?? "",
  adapter: MongoDBAdapter(clientPromise),
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
