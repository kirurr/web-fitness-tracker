import { Button } from "@/components/ui/button";
import Image from "next/image";

export const metadata = {
  title: "About",
};

export default function About() {
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="self-auto md:self-center">
        <Image
          className="mx-auto"
          src={"/images/hero-1.png"}
          alt="fitness tracker"
          width={450}
          height={450}
        />
      </div>
      <div className="self-auto md:self-center">
        <h1><span className="text-primary">About us:</span> Your journey to a healthier life starts here</h1>
        <p className="my-8 text-muted-foreground md:text-xl">
          We are passionate about helping you achieve your fitness goals. Our
          mission is to provide innovative tools and insights that empower you
          to live a healthier, more active lifestyle.
        </p>
        <a href="/signin">
          <Button size="lg">Start Tracking Now</Button>
        </a>
      </div>
      <div>
        <h2>Our mission</h2>
        <p className="mt-4 text-muted-foreground md:text-xl">
          To make fitness tracking simple, accessible, and effective for
          everyone. We believe that small, consistent steps lead to big
          transformations.
        </p>
      </div>
      <div>
        <h2>Who we are</h2>
        <p className="mt-4 text-muted-foreground md:text-xl">
          We are a team of fitness enthusiasts, developers, and designers who
          came together to create a solution that combines cutting-edge
          technology with a user-friendly experience. Our goal is to inspire and
          support you on your fitness journey.
        </p>
      </div>
      <div className="md:col-span-2 md:mt-16">
        <h2 className="text-center">Why choose us?</h2>
        <ul className="list-disc space-y-4 p-8">
          <li>
            <h3>Innovative technology</h3>
            <p>
              We use the latest advancements in fitness tracking to provide
              accurate and actionable insights.
            </p>
          </li>
          <li>
            <h3>User-centric design</h3>
            <p>
              Our platform is designed with you in mind—simple, intuitive, and
              easy to use.
            </p>
          </li>
          <li>
            <h3>Community support</h3>
            <p>
              Join a global community of fitness enthusiasts who motivate and
              inspire each other.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
