"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="absolute inset-0 flex size-full flex-col items-center justify-center">
      <h1 className="mb-8 text-center">Oops! 500 Something went wrong</h1>
      <a href="/">
        <Button>Go back home</Button>
      </a>
    </section>
  );
}
