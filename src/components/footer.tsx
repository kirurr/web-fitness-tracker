import Link from "next/link";
import { auth } from "@/auth";

export default async function Footer() {
  const session = await auth();
  return (
    <footer className="bg-accent p-4">
      <section className="mx-auto divide-x-0 divide-y-2 lg:divide-y-0 lg:divide-x-2 flex flex-col lg:flex-row max-w-screen-lg gap-4 text-muted-foreground">
        <div className="lg:w-1/2 py-4 lg:py-0 px-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum quas
          aperiam doloremque delectus. Nam sit, ea itaque laudantium obcaecati
          pariatur.
        </div>
        <div className="lg:w-1/2 lg:py-0 py-4 px-4">
          <h3>Navigation</h3>
          <nav>
            <ul>
              <li>
                <Link href="/" className="underline-offset-2 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="underline-offset-2 hover:underline"
                >
                  About
                </Link>
              </li>
              {session ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="underline-offset-2 hover:underline"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="underline-offset-2 hover:underline"
                    >
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/signin"
                    className="underline-offset-2 hover:underline"
                  >
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </section>
    </footer>
  );
}
