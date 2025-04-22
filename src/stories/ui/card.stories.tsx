import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const meta: Meta<typeof Card> = {
  component: Card,
  title: "UI/Card",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const WithCustomContent: Story = {
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>Notification</CardTitle>
        <CardDescription>You have a new message</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            Hello there! This is a sample message to demonstrate the card
            component.
          </p>
          <p>You can customize this content in any way you need.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Dismiss</Button>
        <Button>View</Button>
      </CardFooter>
    </Card>
  ),
};
