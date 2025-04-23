import type { Meta, StoryObj } from "@storybook/react";
import {
  ListHoverEffect,
  ListHoverEffectItem,
} from "../../components/list-hover-effect";

const meta: Meta<typeof ListHoverEffect> = {
  component: ListHoverEffect,
  title: "General/ListHoverEffect",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ListHoverEffect>;

export const Default: Story = {
  args: {
    className: "space-y-2 w-64",
    children: (
      <>
        <ListHoverEffectItem>
          <div className="cursor-pointer rounded-md bg-gray-100 p-4">
            Item 1
          </div>
        </ListHoverEffectItem>
        <ListHoverEffectItem>
          <div className="cursor-pointer rounded-md bg-gray-100 p-4">
            Item 2
          </div>
        </ListHoverEffectItem>
        <ListHoverEffectItem>
          <div className="cursor-pointer rounded-md bg-gray-100 p-4">
            Item 3
          </div>
        </ListHoverEffectItem>
      </>
    ),
  },
};

export const WithCustomTransitionDuration: Story = {
  args: {
    className: "space-y-2 w-64",
    children: (
      <>
        <ListHoverEffectItem transitionDuration={600}>
          <div className="cursor-pointer rounded-md bg-gray-100 p-4">
            Slow transition (600ms)
          </div>
        </ListHoverEffectItem>
        <ListHoverEffectItem transitionDuration={300}>
          <div className="cursor-pointer rounded-md bg-gray-100 p-4">
            Default transition (300ms)
          </div>
        </ListHoverEffectItem>
        <ListHoverEffectItem transitionDuration={100}>
          <div className="cursor-pointer rounded-md bg-gray-100 p-4">
            Fast transition (100ms)
          </div>
        </ListHoverEffectItem>
      </>
    ),
  },
};

export const WithNonChildItems: Story = {
  args: {
    className: "space-y-2 w-64",
    children: (
      <>
        <ListHoverEffectItem asChild={false}>
          <span>Direct content item 1</span>
        </ListHoverEffectItem>
        <ListHoverEffectItem asChild={false}>
          <span>Direct content item 2</span>
        </ListHoverEffectItem>
        <ListHoverEffectItem asChild={false}>
          <span>Direct content item 3</span>
        </ListHoverEffectItem>
      </>
    ),
  },
};

export const WithCustomStyling: Story = {
  args: {
    className: "space-y-2 w-64",
    children: (
      <>
        <ListHoverEffectItem>
          <div className="cursor-pointer rounded-md bg-blue-100 p-4 font-medium text-blue-800">
            Styled item 1
          </div>
        </ListHoverEffectItem>
        <ListHoverEffectItem>
          <div className="cursor-pointer rounded-md bg-green-100 p-4 font-medium text-green-800">
            Styled item 2
          </div>
        </ListHoverEffectItem>
        <ListHoverEffectItem>
          <div className="cursor-pointer rounded-md bg-purple-100 p-4 font-medium text-purple-800">
            Styled item 3
          </div>
        </ListHoverEffectItem>
      </>
    ),
  },
};

export const NavigationExample: Story = {
  args: {
    className: "space-y-2 w-64",
    children: (
      <>
        <ListHoverEffectItem>
          <a
            href="#"
            className="block rounded-md bg-gray-100 p-4 hover:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Home</span>
            </div>
          </a>
        </ListHoverEffectItem>
        <ListHoverEffectItem>
          <a
            href="#"
            className="block rounded-md bg-gray-100 p-4 hover:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Users</span>
            </div>
          </a>
        </ListHoverEffectItem>
        <ListHoverEffectItem>
          <a
            href="#"
            className="block rounded-md bg-gray-100 p-4 hover:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <span>Settings</span>
            </div>
          </a>
        </ListHoverEffectItem>
      </>
    ),
  },
};
