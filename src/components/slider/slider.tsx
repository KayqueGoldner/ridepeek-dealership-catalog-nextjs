import useEmblaCarousel from "embla-carousel-react";
import React, { useState, useEffect, useCallback } from "react";

import { cn } from "@/lib/utils";
import { SliderContext } from "@/hooks/use-carousel-context";

interface SliderProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getItemId: (item: T) => string | number;
  getItemHeight?: (item: T) => number;
  containerClassName?: string;
}

export const Slider = <T,>({
  items,
  renderItem,
  getItemId,
  containerClassName,
  className,
  children,
  ...props
}: SliderProps<T> & { children?: React.ReactNode }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const contextValue = {
    emblaApi,
    canScrollPrev: !prevBtnDisabled,
    canScrollNext: !nextBtnDisabled,
    scrollPrev,
    scrollNext,
    selectedIndex,
    scrollSnaps,
    scrollTo,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      <div className={cn("embla", containerClassName)} {...props}>
        <div
          className={cn("embla__viewport overflow-hidden", className)}
          ref={emblaRef}
        >
          <div className="embla__container flex">
            {items.map((item) => (
              <div
                key={getItemId(item)}
                className="embla__slide min-w-0 shrink-0 grow-0 basis-full"
              >
                {renderItem(item)}
              </div>
            ))}
          </div>
        </div>
        {children}
      </div>
    </SliderContext.Provider>
  );
};
