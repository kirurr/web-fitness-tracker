import { auth } from "@/auth";
import SignOut from "@/components/sign-out";

export default async function Home() {
  const session = await auth();
	
  return (
    <>
      landing page
      {session && session.user ? (
				<>
					<a href="/dashboard">go to dashboard</a>
					<SignOut />
				</>
      ) : (
        <a href="/signin">sign in</a>
      )}
    </>
  );
}
