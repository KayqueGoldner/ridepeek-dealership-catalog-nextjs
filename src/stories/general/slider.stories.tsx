import React, { useCallback } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Slider, SliderArrows, SliderCount } from "@/components/slider";
import { SliderParallax } from "@/components/slider/slider-parallax";
import useEmblaCarousel from "embla-carousel-react";

// Define types for our sample items
interface TextSlideItem {
  id: number;
  content: string;
}

interface ImageSlideItem {
  id: number;
  imageUrl: string;
}

// Type for the Slider component with generic type parameter
type SliderComponent = typeof Slider;

const meta: Meta<SliderComponent> = {
  title: "General/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<SliderComponent>;

// Sample data for the slider
const sampleItems: TextSlideItem[] = [
  { id: 1, content: "Slide 1" },
  { id: 2, content: "Slide 2" },
  { id: 3, content: "Slide 3" },
  { id: 4, content: "Slide 4" },
  { id: 5, content: "Slide 5" },
];

// Base story that shows default usage
export const Default: Story = {
  args: {
    items: sampleItems,
    renderItem: (item: any) => (
      <div className="flex h-40 w-full items-center justify-center rounded-md bg-gray-100 p-8">
        <span className="text-lg font-medium">{item.content}</span>
      </div>
    ),
    getItemId: (item: any) => item.id,
    containerClassName: "max-w-md",
  },
};

// Story with SliderArrows
export const WithArrowControls: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Slider {...args}>
        <div className="mt-4">
          <SliderArrows variant="outline" />
        </div>
      </Slider>
    </div>
  ),
};

// Story with SliderCount
export const WithCountIndicator: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Slider {...args}>
        <div className="mt-4 flex items-center justify-between">
          <SliderCount className="text-gray-700" />
          <SliderArrows variant="outline" size="sm" />
        </div>
      </Slider>
    </div>
  ),
};

// Story with custom count rendering
export const WithCustomCount: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Slider {...args}>
        <div className="mt-4 flex items-center justify-between">
          <SliderCount
            className="font-medium text-gray-700"
            render={(selectedIndex, totalCount) => (
              <span>
                Slide {selectedIndex + 1} of {totalCount}
              </span>
            )}
          />
          <SliderArrows variant="outline" size="sm" />
        </div>
      </Slider>
    </div>
  ),
};

// Story with parallax effect
export const WithParallaxEffect: Story = {
  args: {
    items: sampleItems,
    renderItem: (item: any) => (
      <div className="relative h-60 w-full overflow-hidden">
        <div className="embla__parallax">
          <div className="embla__parallax__layer">
            <div className="flex h-80 items-center justify-center rounded-md bg-gray-800 p-8">
              <span className="text-3xl font-bold text-white">
                {item.content}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    getItemId: (item: any) => item.id,
    containerClassName: "max-w-md",
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Slider {...args}>
        <SliderParallax parallaxFactorBase={0.7} />
        <div className="mt-4 flex items-center justify-between">
          <SliderCount className="text-gray-700" />
          <SliderArrows variant="outline" />
        </div>
      </Slider>
    </div>
  ),
};

// Sample image items
const imageItems: ImageSlideItem[] = [
  { id: 1, imageUrl: "https://placehold.co/600x400" },
  { id: 2, imageUrl: "https://placehold.co/600x400" },
  { id: 3, imageUrl: "https://placehold.co/600x400" },
  { id: 4, imageUrl: "https://placehold.co/600x400" },
];

// Story with images as slider items
export const WithImages: Story = {
  args: {
    items: imageItems,
    renderItem: (item: any) => (
      <div className="h-auto w-full p-2">
        <img
          src={item.imageUrl}
          alt={`Slide ${item.id}`}
          className="h-auto w-full rounded-md"
        />
      </div>
    ),
    getItemId: (item: any) => item.id,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Slider {...args}>
        <div className="mt-4 flex items-center justify-between">
          <SliderCount className="text-gray-700" />
          <SliderArrows variant="outline" />
        </div>
      </Slider>
    </div>
  ),
};
