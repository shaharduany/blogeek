import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import getClient from "../../../lib/db/db";
import User from "../../../lib/db/models/User";
import { comparePassword } from "../../../lib/hashing";

const secret = process.env.SECRET;

const THREE_DAYS = 60 * 80 * 24 * 3;
const ONE_DAY = 60 * 60 * 24;

export default NextAuth({
  secret,
  session: {
    strategy: "jwt",
    jwt: true,
    maxAge: THREE_DAYS, //3 days
    updateAge: ONE_DAY,
  },
  jwt:{
    maxAge: THREE_DAYS,
    secret,
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
  callbacks: {
    async jwt ({ token, account }){
      if(account){
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }){
      session.accessToken = token.accessToken;
      return session;
    }
  }
});
