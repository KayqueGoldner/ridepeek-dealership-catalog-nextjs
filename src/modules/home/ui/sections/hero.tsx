import Image from "next/image";
import Link from "next/link";

import { Slider } from "@/components/slider";
import { SliderArrows, SliderCount } from "@/components/slider/slider-controls";
import { SliderParallax } from "@/components/slider/slider-parallax";
import { HeroGetManyOutput } from "@/modules/hero/types";
import { Button } from "@/components/ui/button";

interface HeroProps {
  data: HeroGetManyOutput;
  isLoading: boolean;
}

export const Hero = ({ data, isLoading }: HeroProps) => {
  const items = data.docs.map((doc) => doc);

  const SliderItem = ({ item }: { item: (typeof items)[number] }) => {
    return (
      <div className="embla__parallax size-full">
        <div className="embla__parallax__layer size-full">
          <Image
            src={item.image.url!}
            width={item.image.width ?? 1980}
            height={item.image.height ?? 1080}
            alt={item.image.alt}
            className="embla__slide__img size-full object-cover"
          />
          <div className="absolute inset-x-20 top-20 flex flex-col gap-5 sm:top-30">
            {item.title && (
              <h1 className="line-clamp-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                {item.title}
              </h1>
            )}
            {item.description && (
              <p className="line-clamp-3 text-base font-medium text-white sm:text-lg">
                {item.description}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {item.cta &&
                item.cta.length > 0 &&
                item.cta.map((cta, index) => (
                  <Button key={cta.id ?? index} variant="secondary" asChild>
                    <Link href={cta.url}>{cta.label}</Link>
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative h-96 bg-cyan-900 md:h-screen">
      <Slider
        items={items}
        isLoading={isLoading}
        renderItem={(item) => <SliderItem item={item} />}
        getItemId={(item) => item.id}
        containerClassName="h-full"
        className="h-full"
      >
        <div className="slider-controls">
          <SliderCount
            className="absolute bottom-5 left-20"
            render={(selectedIndex, totalCount) => (
              <div className="text-white">
                <span className="min-w-0 text-2xl font-bold">
                  {selectedIndex + 1}
                </span>
                {" / "}
                <span className="text-lg">{totalCount}</span>
              </div>
            )}
          />
          <SliderArrows
            variant="ghost"
            size="lg"
            buttonClassName="size-12 rounded-full text-white"
            className="absolute inset-x-5 top-1/2 -translate-y-1/2 justify-between"
          />
          <SliderParallax />
        </div>
      </Slider>
    </section>
  );
};
