import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../components/ui/input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "UI/Input",
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    placeholder: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Email address",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter a number",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
    value: "You can't edit this",
  },
};

export const WithValidationError: Story = {
  render: (args) => (
    <Input {...args} aria-invalid placeholder="Invalid input" />
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input {...args} type="email" id="email" placeholder="Email address" />
    </div>
  ),
};
