import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useSlider } from "@/hooks/use-carousel-context";
import { Button, buttonVariants } from "@/components/ui/button";

interface SliderArrowsProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  buttonClassName?: string;
}

export const SliderArrows = React.forwardRef<HTMLDivElement, SliderArrowsProps>(
  ({ className, variant, size, buttonClassName, ...props }, ref) => {
    const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
      useSlider();

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-2", className)}
        {...props}
      >
        <Button
          variant={variant}
          size={size}
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous slide"
          className={cn(
            "cursor-pointer disabled:opacity-50 [&_svg]:!size-6",
            buttonClassName,
          )}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant={variant}
          size={size}
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next slide"
          className={cn(
            "cursor-pointer disabled:opacity-50 [&_svg]:!size-6",
            buttonClassName,
          )}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    );
  },
);
SliderArrows.displayName = "SliderArrows";

interface SliderCountProps extends React.HTMLAttributes<HTMLDivElement> {
  render?: (selectedIndex: number, totalCount: number) => React.ReactNode;
}

export const SliderCount = React.forwardRef<HTMLDivElement, SliderCountProps>(
  ({ className, render, ...props }, ref) => {
    const { selectedIndex, scrollSnaps } = useSlider();
    const totalCount = scrollSnaps.length;

    return (
      <div ref={ref} className={cn("text-sm text-white", className)} {...props}>
        {render
          ? render(selectedIndex, totalCount)
          : `${selectedIndex + 1} / ${totalCount}`}
      </div>
    );
  },
);
SliderCount.displayName = "SliderCount";
