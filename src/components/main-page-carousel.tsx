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

export default function MainPageCarousel() {
  return (
    <Carousel
      className="mx-auto mt-8 w-full max-w-3xl"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{ align: "center", loop: true }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center p-6 md:aspect-video md:flex-row">
                  <div className="h-full min-h-[10rem] w-full bg-red-200 md:w-1/2"></div>
                  <div className="flex h-full flex-col justify-between p-4 md:w-1/2">
                    <p className="text-start">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Sequi eos perspiciatis itaque incidunt provident
                      blanditiis beatae modi? Repudiandae beatae, maxime odit
                      veritatis totam dolorem iusto quia fugiat, placeat ut cum
                      perferendis doloremque, consectetur molestiae.
                    </p>
                    <p className="mt-8 self-end text-2xl font-bold md:text-end">
                      Eric Cartman
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
