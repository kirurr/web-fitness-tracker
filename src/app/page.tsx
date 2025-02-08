import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Flame, GlassWater, LucideProps, Ham } from "lucide-react";
import ReviewsCarousel from "@/components/reviews-carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ForwardRefExoticComponent, RefAttributes } from "react";
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Reviews />
      <Info />
    </>
  );
}

function Hero() {
  return (
    <section className="grid grid-cols-1 grid-rows-[repeat(4,minmax(20rem,1fr))] items-center lg:gap-8 gap-2 text-center md:grid-cols-2 md:grid-rows-[repeat(2,minmax(20rem,1fr))] md:text-start">
      <div>
        <h1 className="text-4xl md:text-5xl">
          Reach your goals with the Fitness
          <span className="text-primary">Tracker</span>
        </h1>
        <p className="my-8 text-muted-foreground md:text-xl">
          Track your activity, sleep, and health in real-time. Personalized
          recommendations and motivation will help you become better every day.
          Start your journey to the best shape of your life today!
        </p>
        <a href="/signin" className="mx-auto block size-fit">
          <Button size="lg">Start tracking now</Button>
        </a>
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
        <h2 className="mb-8 text-4xl">
          Your personal fitness companion for a healthier lifestyle
        </h2>
        <p className="text-xl text-muted-foreground">
          Stay motivated, track progress, and achieve results with our advanced
          fitness tracker. Whether you&apos;re working out, resting, or on the
          go, it’s designed to keep up with your life.
        </p>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="lg:py-24 py-12 text-center">
      <h2 className="mb-12">
        Why our fitness tracker is your perfect companion
      </h2>
      <div className="grid grid-cols-1 grid-rows-3 gap-8 md:grid-cols-3 md:grid-rows-1">
        <Feature
          heading="Tracking Calories Intake"
          paragraph="Count your calories intake by our smart meals system"
          Icon={Ham}
        />
        <Feature
          heading="Tracking Calories Burnt"
          paragraph="Keep track of your calories burnt by wide range of activities"
          Icon={Flame}
        />
        <Feature
          heading="Tracking Water Intake"
          paragraph="Track your water intake by our smart water system"
          Icon={GlassWater}
        />
      </div>
    </section>
  );
}

type FeatureProps = {
  heading: string;
  paragraph: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

function Feature({ heading, paragraph, Icon }: FeatureProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex size-fit items-center justify-center rounded-full bg-card p-4 ring ring-accent">
        <Icon size={130} className="text-primary" />
      </div>
      <h3>{heading}</h3>
      <p className="text-muted-foreground">{paragraph}</p>
    </div>
  );
}
function Reviews() {
  return (
    <section className="lg:py-24 py-12 text-center">
      <h2>See reviews from our users</h2>
      <ReviewsCarousel />
      <a href="/signin" className="mx-auto mt-8 block size-fit">
        <Button size="lg">Start tracking now</Button>
      </a>
    </section>
  );
}

function Info() {
  return (
    <section className="lg:py-24 py-12">
      <h2 className="text-center">Frequently asked questions</h2>
      <Card className="mx-auto mt-12 lg:w-2/3">
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How does the web app track my fitness?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Our web app uses advanced algorithms to sync with your fitness
                tracker or manually input data. It tracks your activity, heart
                rate, sleep, and more, providing detailed insights and
                personalized recommendations to help you reach your goals.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Is the web app compatible with my device?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Yes, the web app is fully responsive and works seamlessly on
                desktops, tablets, and smartphones. Whether you&apos;re using Chrome,
                Safari, or any other modern browser, you&apos;ll have access to all
                features.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How secure is my data?</AccordionTrigger>
              <AccordionContent className="text-lg">
                Your data security is our top priority. All information is
                encrypted and stored securely. We comply with the latest privacy
                regulations to ensure your personal and fitness data is always
                protected.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}
