import { signOut } from "@/auth";
import { Button } from "./ui/button";

export default function SignOut({ className }: { className?: string }) {
  return (
    <form
			className={className}
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="destructive" type="submit">Sign out</Button>
    </form>
  );
}
