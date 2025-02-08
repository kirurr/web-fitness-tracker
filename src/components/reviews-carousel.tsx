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
      "I absolutely love this fitness tracker! It’s been a game-changer for me. I’ve always struggled to stay consistent with my workouts, but the personalized reminders and progress tracking keep me motivated. The sleep analysis feature is amazing too—I finally understand my sleep patterns and have been able to improve my rest. Plus, it’s so stylish and comfortable to wear all day! Highly recommend it to anyone looking to take control of their health and fitness",
  },
  {
    image: "/images/review-2.jpg",
    name: "John Doe",
    review:
      "As a professional athlete, I need a fitness tracker that can keep up with my intense training, and this one exceeds all expectations. The accuracy of the activity tracking is unmatched—whether I’m running, cycling, or in the gym, it captures every detail. The recovery insights have been a game-changer for me, helping me optimize my rest and avoid overtraining. Plus, the durability and battery life are perfect for my busy schedule. This is a must-have tool for anyone serious about performance!",
  },
  {
    image: "/images/review-3.jpg",
    name: "Eric Cartman",
    review:
      "I've been using this fitness tracker for a few weeks now, and I must say, I'm impressed! The app is so easy to use and understand, and the personalized recommendations have been a game-changer for my fitness journey. I love that it tracks my calories and water intake, and it even suggests healthy meal options based on my goals. Plus, the sleep analysis feature is incredibly helpful, and I've noticed a significant improvement in my sleep quality since using it. I highly recommend this app to anyone looking to improve their health and well-being.",
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
      opts={{ align: "center", loop: true }}
    >
      <CarouselContent>
        {reviews.map((review) => (
          <Review key={review.name} {...review} />
        ))}
      </CarouselContent>
      <CarouselPrevious className="lg:inline-flex hidden" />
      <CarouselNext className="lg:inline-flex hidden" />
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
      <div className="p-1">
        <Card>
          <CardContent className="flex flex-col items-center p-6 md:flex-row">
            <div className="relative h-full min-h-[20rem] md:min-h-[30rem] w-full rounded-xl overflow-hidden md:w-1/2">
              <Image
                src={image}
                className="object-cover"
                sizes="100vw"
                alt={`${name} review`}
                fill
              />
            </div>
            <div className="flex h-full flex-col justify-between p-1 mt-4 lg:p-4 md:w-1/2">
              <p className="text-start">{review}</p>
              <p className="mt-8 self-end text-2xl font-bold md:text-end">
                {name}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
