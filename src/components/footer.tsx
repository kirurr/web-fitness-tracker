import { auth } from "@/auth";

export default async function Footer() {
  const session = await auth();
  return (
    <footer className="bg-accent p-4">
      <nav>
        <ul className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
          <li>
            <a
              href="/"
              className="text-xl font-bold underline-offset-2 hover:underline"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-xl font-bold underline-offset-2 hover:underline"
            >
              About
            </a>
          </li>
          {session ? (
            <>
              <li>
                <a
                  href="/dashboard"
                  className="text-xl font-bold underline-offset-2 hover:underline"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="text-xl font-bold underline-offset-2 hover:underline"
                >
                  Profile
                </a>
              </li>
            </>
          ) : (
            <li>
              <a
                href="/signin"
                className="text-xl font-bold underline-offset-2 hover:underline"
              >
                Sign in
              </a>
            </li>
          )}
        </ul>
      </nav>
	  <div className="mx-auto w-fit my-8 flex flex-col lg:flex-row gap-4">
		  <a href="mailto:contact@fitnesstracker.com" className="text-center text-base text-primary hover:underline underline-offset-2">contact@fitnesstracker.com</a>
		  <a href="tel:+441234567890" className="text-center text-base text-primary hover:underline underline-offset-2">+44 123 456 7890</a>
	  </div>
	  <p className="text-center text-base">© 2025 Fitness Tracker</p>
    </footer>
  );
}
