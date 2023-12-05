import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { ApiUrl } from "@/config/Config";

export const options: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const response = await fetch(`${ApiUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        console.log("========================", response);
        const user = await response.json();
        console.log("Response:", response);
        console.log("User:", user);
        if (response.ok && user.statusCode === 200) {
          return user.data;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: "eCommerceforthisisaverygoodresulttomake",
  callbacks: {
    async jwt({ token, user }) {
      // the user present here gets the same data as received from DB call  made above -> fetchUserInfo(credentials.opt)

      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      console.log("session", session);
      session.user = token;
      const response = await fetch(`${ApiUrl}/user/fetch`, {
        method: "POST",
        headers: {
          // Be sure to include any necessary headers
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      try {
        const resp = await response.json();
        token.user = resp.data;
      } catch (e) {
        // eslint-disable-next-line no-console
        // console.error(e);
      }

      return token;
    },
  },
  // Other NextAuth configuration options
};

export default NextAuth(options);
