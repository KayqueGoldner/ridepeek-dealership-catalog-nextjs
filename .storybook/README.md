# Storybook for RidePeek Dealership Catalog

This project uses Storybook to develop and test UI components in isolation.

## Running Storybook

To start Storybook locally:

```bash
# Using npm
npm run storybook

# Using yarn
yarn storybook

# Using bun
bun run storybook
```

Storybook will be available at http://localhost:6006

## Building Storybook

To build a static version of Storybook:

```bash
# Using npm
npm run build-storybook

# Using yarn
yarn build-storybook

# Using bun
bun run build-storybook
```

## Project Structure

- Components are located in `src/components`
- Stories are located in `src/stories` to keep the component files clean
- UI component stories are in `src/stories/ui`

## Creating Stories

Stories are organized by component type. For example:

- `src/components/ui/button.tsx` - Component 
- `src/stories/ui/button.stories.tsx` - Stories for the Button component

### Story Template

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '../../components/ui/your-component';

const meta: Meta<typeof YourComponent> = {
  component: YourComponent,
  title: 'UI/YourComponent',
  tags: ['autodocs'], // Enables automatic documentation
  argTypes: {
    // Define the controls for your component props
  },
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const Default: Story = {
  args: {
    // Props for your component
  },
};

// Additional variants
export const Variant: Story = {
  args: {
    // Props for this variant
  },
};
```

## Documentation

For more information, check out the [Storybook documentation](https://storybook.js.org/docs). 