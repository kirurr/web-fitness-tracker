import { auth } from "@/auth";
import userRepository from "@/user/user-repository";
import { redirect } from "next/navigation";

export default async function () {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const data = await userRepository.getDataByUserId(session.user.id);
  if (data["user_data"]) redirect("/dashboard");

  return (
    <>
      <input type="text" />
    </>
  );
}
