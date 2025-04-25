"use client";

import { useCallback, useEffect, useRef } from "react";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";

import { useSlider } from "@/hooks/use-carousel-context";

interface SliderParallaxProps {
  parallaxFactorBase?: number;
}

export const SliderParallax = ({
  parallaxFactorBase = 0.5,
}: SliderParallaxProps) => {
  const { emblaApi } = useSlider();
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi
      .slideNodes()
      .map((slideNode) => {
        return slideNode.querySelector(
          ".embla__parallax__layer",
        ) as HTMLElement | null;
      })
      .filter((node) => node !== null) as HTMLElement[];
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = parallaxFactorBase * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
          const tweenNode = tweenNodes.current[slideIndex];
          if (tweenNode) {
            tweenNode.style.transform = `translateX(${translate}%)`;
          }
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    const handleReInit = () => {
      setTweenNodes(emblaApi);
      setTweenFactor(emblaApi);
      tweenParallax(emblaApi);
    };

    emblaApi
      .on("reInit", handleReInit)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax);

    return () => {
      emblaApi
        .off("reInit", handleReInit)
        .off("scroll", tweenParallax)
        .off("slideFocus", tweenParallax);
    };
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenParallax]);

  return null;
};
