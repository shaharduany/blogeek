import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: "thisisweirdiHopeItWorks",
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
      name: "Email & password",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials;
        if (email) {
          return true;
        } else {
          return false;
        }
      },
    }),
  ],
});
