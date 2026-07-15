import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { request } from "graphql-request";
import { LOGIN_MUTATION } from "@/app/graphql/mutation"; 

 

import { EmailPasswordLogInMutationVariables } from "../gql/graphql";
import { ROUTES } from "../constants/routes";

interface CustomUser extends User {
  accessToken?: string;
  refreshToken?: string;
} 

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log('Credentials received:', credentials)
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            return null;
          }

          const variables: EmailPasswordLogInMutationVariables = {
            data: {
              email: credentials.email,
              password: credentials.password,
            },
          };

          console.log('GraphQL URL:', process.env.BACKEND_GRAPHQL_URL);
          console.log('Variables:', variables);

          // Call your backend using your existing mutation
          const response = await request(
           {
            url:  process.env.BACKEND_GRAPHQL_URL!,
            document: LOGIN_MUTATION,
            variables: variables
           }
          );

          console.log('Full response:', JSON.stringify(response, null, 2));

          const auth = response.emailPasswordLogIn?.data;
          console.log('Auth data:', auth);

          if (!auth || !auth.token) {
            console.log('No auth data or token found');
            return null;
          }

          return {
            id: auth.user?.id || "",
            email: auth.user?.email || "",
            name: auth.user?.name || "",
            accessToken: auth.token,
            refreshToken: auth.refreshToken,
          } as CustomUser;
        } catch (err) {
          console.error("NextAuth login error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.accessToken = customUser.accessToken;
        token.refreshToken = customUser.refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
        },
      };
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: { signIn: ROUTES.LOGIN },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
