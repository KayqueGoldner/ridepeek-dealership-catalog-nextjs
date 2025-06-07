import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "The name of the product",
      },
    },
    {
      name: "description",
      type: "richText",
      admin: {
        description: "A brief description of the product",
      },
    },
    {
      name: "images",
      type: "array",
      required: true,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
        },
        {
          name: "primary",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "Use this image as the main image for the product",
          },
        },
      ],
      admin: {
        description: "Product images",
      },
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Price in dollars (USD)",
      },
    },
  ],
};
