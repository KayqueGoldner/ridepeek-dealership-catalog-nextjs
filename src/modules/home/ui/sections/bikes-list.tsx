"use client";

import Image from "next/image";
import Link from "next/link";

import { Slider, SliderArrows, SliderCount } from "@/components/slider";
import { Motorcycle } from "@/payload-types";
import { Skeleton } from "@/components/ui/skeleton";
import { InteractiveHoverButton } from "@/components/interactive-hover-button";

interface BikesListProps {
  bikes: Motorcycle[];
  isLoading: boolean;
}

export const BikesList = ({ bikes, isLoading }: BikesListProps) => {
  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  if (isLoading) {
    const items = Array.from({ length: 5 }, () => ({
      id: generateRandomId(),
    }));

    return (
      <section className="relative mt-20 overflow-hidden">
        <div className="flex items-center justify-between px-10 py-5">
          <h1 className="text-3xl font-bold">Bikes</h1>
          <InteractiveHoverButton>View all</InteractiveHoverButton>
        </div>
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
      <div className="flex items-center justify-between px-10 py-5">
        <h1 className="text-3xl font-bold">Bikes</h1>
        <Link href="/bikes">
          <InteractiveHoverButton>View all</InteractiveHoverButton>
        </Link>
      </div>
      <Slider
        items={bikes}
        renderItem={(item) => <BikeCard bike={item} />}
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

const BikeCard = ({ bike }: { bike: Motorcycle }) => {
  const image =
    typeof bike.images?.[0]?.image === "string"
      ? bike.images?.[0]?.image
      : bike.images?.[0]?.image?.url;

  return (
    <Link href={`/bikes/${bike.id}`}>
      <div className="size-full">
        <Image
          src={image || ""}
          alt={bike.images?.[0]?.caption || ""}
          width={760}
          height={760}
          className="aspect-video w-full object-cover"
        />
        <div className="py-5 text-center">
          <h1 className="text-xl font-bold">{bike.name}</h1>
        </div>
      </div>
    </Link>
  );
};
