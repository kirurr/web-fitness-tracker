import { cn } from "@/lib/utils";
import type React from "react";

interface BurgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center border-none bg-transparent focus:outline-none lg:hidden"
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <span
        className={cn('h-0.5 w-6 rounded-sm bg-current transition-all duration-300 ease-out',
          isOpen ? "translate-y-1.5 rotate-45" : ""
				)}
      />
      <span
        className={cn('h-0.5 w-6 rounded-sm bg-current transition-all duration-300 ease-out',
          isOpen ? "opacity-0" : ""
				)}
      />
      <span
        className={cn('h-0.5 w-6 rounded-sm bg-current transition-all duration-300 ease-out',
          isOpen ? "-translate-y-1.5 -rotate-45" : ""
        )}
      />
    </button>
  );
};

export default BurgerButton;
