import type { CollectionConfig } from "payload";

export const Hero: CollectionConfig = {
  slug: "hero",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "cta",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
