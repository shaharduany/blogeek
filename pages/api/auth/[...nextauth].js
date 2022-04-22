import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
    secret: "thisisweirdiHopeItWorks",
    session: {
        strategy: "jwt",
        maxAge: 60*80*24*3, //3 days
        updateAge: 60*60&24,
    },
    providers: {
        
    },
});