import { auth } from "@/auth";
import SignOut from "@/components/sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { dietRepository } from "@/diet/diet-repository";
import userDataRepository from "@/user-data/user-data-repository";
import { User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const [userData, diets] = await Promise.all([
    userDataRepository.getByUserId(session.user.id),
    dietRepository.getByUserId(session.user.id),
  ]);
  const currentDiet = diets.find((diet) => diet.diet.expired !== null)!;

  return (
    <>
      <section className="mx-auto max-w-screen-md">
        <h1 className="hidden text-center lg:block">Your profile</h1>
        <div className="flex flex-col gap-4 p-4 lg:flex-row">
          <div className="flex flex-col items-center gap-4 space-y-2 rounded-lg p-4 shadow-xl lg:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src={session.user.image ?? ""} />
              <AvatarFallback>
                <User2 />
              </AvatarFallback>
            </Avatar>
            <div>
              <p>
                <span className="text-muted-foreground">Name:</span>{" "}
                {session.user.name}
              </p>
              <p>
                <span className="text-muted-foreground">Email:</span>{" "}
                {session.user.email}
              </p>
              <div className="mt-4 flex justify-center gap-4 lg:justify-start">
                <SignOut />
                <Link href="/profile/update">
                  <Button>Update</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-2 rounded-lg p-4 shadow-xl">
            <p>
              <span className="text-muted-foreground">Height:</span>{" "}
              {userData.user_data.height}
            </p>
            <p>
              <span className="text-muted-foreground">Weight:</span>{" "}
              {userData.user_data.weight}
            </p>
            <p>
              <span className="text-muted-foreground">Date of birth:</span>{" "}
              {new Date(userData.user_data.birth_date).toDateString()}
            </p>
          </div>
        </div>
      </section>
      <section className="mt-8 space-y-2">
        <h2>
          Your goal is:{" "}
          <span className="text-primary">
            {currentDiet?.goal?.name.toLowerCase()}
          </span>
        </h2>
        <p>
          <span className="text-muted-foreground">
            Calories to consume daily:
          </span>{" "}
          {Math.round(currentDiet?.diet.calories * currentDiet.goal!.value)}
        </p>
        <p>
          <span className="text-muted-foreground">Calories to burn daily:</span>{" "}
          {currentDiet?.diet.calories}
        </p>
        <p>
          <span className="text-muted-foreground">Water to drink daily:</span>{" "}
          {currentDiet?.diet.water} L
        </p>
      </section>
    </>
  );
}
