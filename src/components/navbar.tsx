import type React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, User2 } from "lucide-react";
import { auth } from "@/auth";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

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
                  <Link href="profile">
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
          <Sheet>
            <SheetTrigger className="block lg:hidden">
              <Menu />
            </SheetTrigger>
            <SheetPortal>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sheet Title</SheetTitle>
                  <SheetDescription>Sheet Description</SheetDescription>
                </SheetHeader>

                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  <Link
                    href="/"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:text-gray-600"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:text-gray-600"
                  >
                    About
                  </Link>
                  <Link
                    href="/services"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:text-gray-600"
                  >
                    Services
                  </Link>
                  <Link
                    href="/contact"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:text-gray-600"
                  >
                    Contact
                  </Link>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </SheetPortal>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
