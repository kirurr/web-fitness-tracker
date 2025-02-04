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
import { Menu } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="left-0 right-0 top-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Logo
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-600"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-600"
              >
                About
              </Link>
              <Link
                href="/services"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-600"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-600"
              >
                Contact
              </Link>
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
