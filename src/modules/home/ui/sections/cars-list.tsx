"use client";

import Image from "next/image";

import { Slider, SliderArrows, SliderCount } from "@/components/slider";
import { Car } from "@/payload-types";
import { Skeleton } from "@/components/ui/skeleton";

interface CarsListProps {
  cars: Car[];
  isLoading: boolean;
}

export const CarsList = ({ cars, isLoading }: CarsListProps) => {
  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  if (isLoading) {
    const items = Array.from({ length: 5 }, () => ({
      id: generateRandomId(),
    }));

    return (
      <section className="relative mt-20 overflow-hidden">
        <h1 className="mb-10 pl-10 text-3xl font-bold">Cars</h1>
        <Slider
          items={items}
          renderItem={(item) => (
            <Skeleton className="aspect-video flex-1 rounded-lg" />
          )}
          getItemId={(item) => item.id}
          emblaOptions={{ loop: false, containScroll: false }}
          containerClassName="gap-10 transition-all duration-500"
          itemClassName="basis-auto w-full sm:w-2/3 md:w-1/2"
        >
          <div className="flex items-center justify-center gap-10 pt-10">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="size-12 rounded-full" />
          </div>
        </Slider>
      </section>
    );
  }

  return (
    <section className="relative mt-20 overflow-hidden">
      <h1 className="mb-10 pl-10 text-3xl font-bold">Cars</h1>
      <Slider
        items={cars}
        renderItem={(item) => <CarCard car={item} />}
        getItemId={(item) => generateRandomId()}
        emblaOptions={{ loop: false, containScroll: false }}
        containerClassName="gap-10 transition-all duration-500"
        itemClassName="basis-auto w-full sm:w-2/3 md:w-1/2"
      >
        <SliderArrows
          className="gap-10"
          variant="outline"
          buttonClassName="text-black rounded-full size-12"
        >
          <SliderCount className="font-bold text-black" />
        </SliderArrows>
      </Slider>
    </section>
  );
};

const CarCard = ({ car }: { car: Car }) => {
  const image =
    typeof car.images?.[0]?.image === "string"
      ? car.images?.[0]?.image
      : car.images?.[0]?.image?.url;

  return (
    <div className="size-full">
      <Image
        src={image || ""}
        alt={car.images?.[0]?.caption || ""}
        width={760}
        height={760}
        className="aspect-video w-full object-cover"
      />
      <div className="py-5 text-center">
        <h1 className="text-xl font-bold">{car.name}</h1>
      </div>
    </div>
  );
};
