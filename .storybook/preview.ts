import type { Preview } from "@storybook/react";
import "../src/app/(app)/globals.css"; // Import tailwind styles

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;
