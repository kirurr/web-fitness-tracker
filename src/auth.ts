import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import userRepository from "@/user/user-repository";
import 'next-auth/jwt'

declare module "next-auth" {
  interface Session {
    user: { id: number; } & DefaultSession["user"];
    error?: "RefreshTokenError"
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    access_token: string
    expires_at: number
    refresh_token?: string
    error?: "RefreshTokenError"
  }
}

const providers: Provider[] = [
  Google({
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
      },
    },
    profile: async (profile) => {
      const user = await userRepository.getByEmail(profile.email!);
      if (user) {
        profile.id = user.id;
        return profile;
      }

      const newUser = await userRepository.create({
        name: profile.name ?? "UnknownMonkey",
        email: profile.email!,
        image_url: profile.picture,
      });
      profile.id = newUser.id;
      return profile;
    },
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // @ts-ignore
    async jwt({ token, account, profile }) {
      if (profile?.id) {
        token.id = profile.id;
        token.picture = profile.picture
      }
      if (account) {
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        }
      } else if (Date.now() < token.expires_at * 1000) {
        // Subsequent logins, but the `access_token` is still valid
        return token
      } else {
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refresh_token) throw new TypeError("Missing refresh_token")
 
        try {
          // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
          // at their `/.well-known/openid-configuration` endpoint.
          // i.e. https://accounts.google.com/.well-known/openid-configuration
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID!,
              client_secret: process.env.AUTH_GOOGLE_SECRET!,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token!,
            }),
          })
 
          const tokensOrError = await response.json()
 
          if (!response.ok) throw tokensOrError
 
          const newTokens = tokensOrError as {
            access_token: string
            expires_in: number
            refresh_token?: string
          }
 
          return {
            ...token,
            access_token: newTokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
            // Some providers only issue refresh tokens once, so preserve if we did not get a new one
            refresh_token: newTokens.refresh_token
              ? newTokens.refresh_token
              : token.refresh_token,
          }
        } catch (error) {
          console.error("Error refreshing access_token", error)
          // If we fail to refresh the token, return an error so we can handle it on the page
          token.error = "RefreshTokenError"
          return token
        }
      }
    },
    async session({ session, token }) {
      session.error = token.error
			// @ts-ignore: session.user is not defined
      session.user.id = token.id;
      return session;
      return session
    },
    async signIn({ profile }) {
      if (!profile) return false;
      return true;
    },
  },
});
