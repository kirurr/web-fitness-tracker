"use client";
import { Menu} from "lucide-react";
import {
	Sheet,
  SheetTrigger,
  SheetPortal,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarMobileMenu({ isUser }: { isUser: boolean }) {
	const [currentPathname, setCurrentPathname] = useState("");
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		if (currentPathname !== pathname) {
			setCurrentPathname(pathname);
			setOpen(false);
		}
	}, [pathname, currentPathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="block lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetPortal>
        <SheetContent>
          <SheetHeader className="sr-only">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Mobile menu</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <a
              href="/"
              className="font-semibold text-foreground hover:underline"
            >
              Home
            </a>
            <a
              href="/about"
              className="font-semibold text-foreground hover:underline"
            >
              About
            </a>
            {isUser ? (
              <>
                <a
                  href="/dashboard"
                  className="font-semibold text-foreground hover:underline"
                >
                  Dashboard
                </a>
                <a
                  href="/profile"
                  className="font-semibold text-foreground hover:underline"
                >
                  Profile
                </a>
              </>
            ) : (
              <a
                href="/signin"
                className="font-semibold text-foreground hover:underline"
              >
                Sign in
              </a>
            )}
          </div>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
}
