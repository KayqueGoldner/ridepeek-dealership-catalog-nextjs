import Image from "next/image";

import { Slider } from "@/components/slider";
import { SliderArrows, SliderCount } from "@/components/slider/slider-controls";
import { SliderParallax } from "@/components/slider/slider-parallax";

export const Hero = () => {
  const items = [
    {
      id: 1,
      image:
        "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986",
    },
    {
      id: 3,
      image:
        "https://plus.unsplash.com/premium_photo-1690481529191-1ad78d50daac",
    },
  ];

  const SliderItem = ({ item }: { item: (typeof items)[number] }) => {
    return (
      <div className="embla__parallax size-full">
        <div className="embla__parallax__layer size-full">
          <Image
            src={item.image}
            width={1980}
            height={1080}
            alt={item.id.toString()}
            className="embla__slide__img size-full object-cover"
          />
        </div>
      </div>
    );
  };

  return (
    <section className="relative h-96 bg-cyan-900 md:h-screen">
      <Slider
        items={items}
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
