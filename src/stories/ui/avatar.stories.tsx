import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "UI/Avatar",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/non-existent-image.jpg" alt="@user" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const WithCustomSizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar className="size-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="size-14">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};
