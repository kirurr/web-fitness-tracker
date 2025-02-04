import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import userDataRepository from "@/user-data/user-data-repository";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const userData = await userDataRepository.getByUserId(session.user.id);
  return (
    <main className="mx-auto max-w-screen-md">
      <h1>Profile</h1>
      {session.user.name}
      <pre>{JSON.stringify(userData)}</pre>
      <Link href="/profile/update">
        <Button>Update</Button>
      </Link>
    </main>
  );
}
