import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <section className="flex absolute inset-0 size-full flex-col items-center justify-center">
      <h1 className="text-center mb-8">Oops! 404 Page not found</h1>
      <a href="/"><Button>Go back home</Button></a>
    </section>
  );
}
