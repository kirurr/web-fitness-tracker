import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import { auth } from "@/auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import NavbarMobileMenu from "./navbar-mobile-menu";

const Navbar: React.FC = async () => {
  const session = await auth();
  return (
    <nav className="left-0 right-0 top-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-3xl font-bold">
              Fitness<span className="text-primary">Tracker</span>
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/about">
                <Button variant="link" size="sm" className="text-foreground">
                  About
                </Button>
              </Link>
              {session?.user ? (
                <>
                  <Link className="" href="/dashboard">
                    <Button
                      variant="link"
                      size="sm"
                      className="text-foreground"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Avatar>
                      <AvatarImage src={session.user.image ?? ""} />
                      <AvatarFallback className="">
                        <User2 />
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </>
              ) : (
                <Link href="/signin">
                  <Button variant="link" size="sm" className="text-foreground">
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <NavbarMobileMenu isUser={!!session?.user} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
