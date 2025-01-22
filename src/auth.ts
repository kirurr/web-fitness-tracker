import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import userRepository from "@/user/user-repository";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: { id: number; } & DefaultSession["user"];
  }
}

const providers: Provider[] = [
  Google({
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    },
    profile: async (profile) => {
      const user = await userRepository.getByEmail(profile.email!);
      if (user) {
        profile.id = user.id;
        return profile;
      }

      const newUser = await userRepository.create({
        name: profile.name!,
        email: profile.email!,
        image_url: profile.picture!,
      });
      profile.id = newUser.id;
      return profile;
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt({ token, profile }) {
      if (profile?.id) {
        token.id = profile.id;
      }
      return token;
    },
    session({ session, token }) {
			// @ts-ignore: session.user is not defined
      session.user.id = token.id;
      return session;
    },
    async signIn({ profile }) {
      if (!profile) return false;
      return true;
    },
  },
});
