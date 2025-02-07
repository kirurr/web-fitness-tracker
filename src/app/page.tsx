import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Baby } from "lucide-react";
import MainPageCarousel from "@/components/main-page-carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Carousel />
      <Info />
    </>
  );
}

function Hero() {
  return (
    <section className="grid text-center md:text-start grid-cols-1 grid-rows-[repeat(4,minmax(20rem,1fr))] items-center gap-8 md:grid-cols-2 md:grid-rows-[repeat(2,minmax(20rem,1fr))]">
      <div>
        <h1 className="mb-2 text-4xl md:text-6xl">Lorem ipsum dolor sit amet.</h1>
        <p className="md:text-xl text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quae
          enim quisquam ipsam! Labore, ullam voluptatem placeat fuga tempore
          cumque.
        </p>
        <Link href="/signin" className="mx-auto mt-8 block size-fit">
          <Button size="lg">Start tracking now</Button>
        </Link>
      </div>
      <div>
        <Image
          className="mx-auto"
          src={"/images/hero-1.png"}
          alt="fitness tracker"
          width={450}
          height={450}
        />
      </div>
      <div className="row-start-4 md:row-start-auto">
        <Image
          className="mx-auto"
          src={"/images/hero-2.png"}
          alt="fitness tracker"
          width={450}
          height={450}
        />
      </div>
      <div>
        <h2 className="mb-2 text-4xl">
          Lorem, ipsum dolor sit amet consectetur adipisicing.
        </h2>
        <p className="text-xl text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quae
          enim quisquam ipsam! Labore, ullam voluptatem placeat fuga tempore
          cumque.
        </p>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="py-24 text-center">
      <h2 className="my-8">Lorem ipsum dolor sit.</h2>
      <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="size-fit rounded-full bg-card p-2 ring ring-accent">
            <Baby size={130} />
          </div>
          <h3>Lorem ipsum dolor sit amet.</h3>
          <p className="text-muted-foreground">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis,
            aspernatur.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="size-fit rounded-full bg-card p-2 ring ring-accent">
            <Baby size={130} />
          </div>
          <h3>Lorem ipsum dolor sit amet.</h3>
          <p className="text-muted-foreground">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis,
            aspernatur.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="size-fit rounded-full bg-card p-2 ring ring-accent">
            <Baby size={130} />
          </div>
          <h3>Lorem ipsum dolor sit amet.</h3>
          <p className="text-muted-foreground">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis,
            aspernatur.
          </p>
        </div>
      </div>
    </section>
  );
}

function Carousel() {
  return (
    <section className="py-24 text-center">
      <h2>Lorem ipsum dolor sit.</h2>
      <MainPageCarousel />
      <Link href="/signin" className="mx-auto mt-8 block size-fit">
        <Button size="lg">Start tracking now</Button>
      </Link>
    </section>
  );
}

function Info() {
  return (
    <section className="py-24">
      <h2 className="text-center">Lorem ipsum dolor sit.</h2>
      <Card className="mx-auto mt-8 lg:w-2/3">
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent className="text-lg">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent className="text-lg">
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent className="text-lg">
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}
