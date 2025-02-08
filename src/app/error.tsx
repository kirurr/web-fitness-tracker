"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section>
      <h1 className="text-center">Something went wrong!</h1>
      <Button onClick={() => reset()}>Try again</Button>
      <a href="/" className="text-center">
        Go back home
      </a>
    </section>
  );
}
