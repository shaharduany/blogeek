import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import getClient from "../../../lib/db/db";
import User from "../../../lib/db/models/User";
import { comparePassword } from "../../../lib/hashing";

const secret = process.env.SECRET;

export default NextAuth({
  secret,
  session: {
    strategy: "jwt",
    maxAge: 60 * 80 * 24 * 3, //3 days
    updateAge: (60 * 60) & 24,
  },
  providers: [
    GoogleProvider({
      clientId: "GOOGLE_CLIENT_ID",
      clientSecret: "GOOGLE_CLIENT_SECRET",
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
    CredentialsProvider({
      async authorize(credentials) {
        await getClient();
        const { email, password } = credentials;

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }

        const passwordValid = await comparePassword(password, user.password);
       
        if (!passwordValid) {
          throw new Error("Password is incorrect");
        }

        return {
          email,
          id: user._id,
        };
      },
    }),
  ],
});
