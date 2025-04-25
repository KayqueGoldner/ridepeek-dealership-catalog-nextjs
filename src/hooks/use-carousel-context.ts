import { createContext, useContext } from "react";
import { type UseEmblaCarouselType } from "embla-carousel-react";

type SliderContextType = {
  emblaApi: UseEmblaCarouselType[1];
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  selectedIndex: number;
  scrollSnaps: number[];
  scrollTo: (index: number) => void;
};

export const SliderContext = createContext<SliderContextType | null>(null);

export function useSlider() {
  const context = useContext(SliderContext);

  if (!context) {
    throw new Error("useSlider must be used within a <Slider /> component");
  }

  return context;
}
