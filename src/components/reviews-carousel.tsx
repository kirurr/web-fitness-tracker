"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import Image from "next/image";
const reviews: ReviewProp[] = [
  {
    image: "/images/review-1.jpg",
    name: "Elena Golovach",
    review:
      "I absolutely love this fitness tracker! It’s been a game-changer for me. I’ve always struggled to stay consistent with my workouts, but the personalized reminders and progress tracking keep me motivated.",
  },
  {
    image: "/images/review-2.jpg",
    name: "John Doe",
    review:
      "As a professional athlete, I need a fitness tracker that can keep up with my intense training, and this one exceeds all expectations. The accuracy of the activity tracking is unmatched—whether I’m running, cycling, or in the gym, it captures every detail.",
  },
  {
    image: "/images/review-3.jpg",
    name: "Eric Cartman",
    review:
      "I've been using this fitness tracker for a few weeks now, and I must say, I'm impressed! The app is so easy to use and understand, and the personalized recommendations have been a game-changer for my fitness journey. I love that it tracks my calories and water intake, and it even suggests healthy meal options based on my goals.",
  },
];

export default function ReviewsCarousel() {
  return (
    <Carousel
      className="mx-auto mt-12 w-full max-w-3xl"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
				align: "center",
				loop: true,
			}}
    >
      <CarouselContent>
        {reviews.map((review) => (
          <Review key={review.name} {...review} />
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:inline-flex" />
      <CarouselNext className="hidden lg:inline-flex" />
    </Carousel>
  );
}

type ReviewProp = {
  image: string;
  name: string;
  review: string;
};

function Review({ image, name, review }: ReviewProp) {
  return (
    <CarouselItem>
        <Card>
          <CardContent className="flex flex-col items-center p-6 md:flex-row">
            <div className="relative h-full min-h-[20rem] w-full min-w-[5rem] overflow-hidden rounded-xl md:w-1/2">
              <Image
                src={image}
                className="object-cover"
                sizes="100vw"
                alt={`${name} review`}
                fill
              />
            </div>
            <div className="mt-4 flex h-full flex-col p-1 md:mt-0 md:w-1/2 lg:p-4">
              <p className="text-start">{review}</p>
              <p className="mt-auto text-2xl font-bold md:text-end">{name}</p>
            </div>
          </CardContent>
        </Card>
    </CarouselItem>
  );
}
