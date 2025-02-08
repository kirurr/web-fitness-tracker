import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <section>
      <h1>About Us: Your Journey to a Healthier Life Starts Here</h1>
      <p>
        We are passionate about helping you achieve your fitness goals. Our
        mission is to provide innovative tools and insights that empower you to
        live a healthier, more active lifestyle.
      </p>
      <a href="/signin">
        <Button size="lg">Start Tracking Now</Button>
      </a>
    </section>
  );
}
