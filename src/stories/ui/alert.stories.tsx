import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert";

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: "UI/Alert",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is a standard informational alert.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" x2="12" y1="9" y2="13" />
        <line x1="12" x2="12.01" y1="17" y2="17" />
      </svg>
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your storage is almost full. Please delete some items to free up space.
      </AlertDescription>
    </Alert>
  ),
};

export const WithLongDescription: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        <p>This is the first paragraph of a longer alert description.</p>
        <p>This component can handle multiple paragraphs and rich content.</p>
        <p>
          You can customize it further as needed for your specific use case.
        </p>
      </AlertDescription>
    </Alert>
  ),
};
