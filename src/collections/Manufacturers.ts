import type { CollectionConfig } from "payload";

export const Manufacturers: CollectionConfig = {
  slug: "manufacturers",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "country"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "The name of the manufacturer (e.g., Toyota, Ford, BMW)",
      },
    },
    {
      name: "country",
      type: "text",
      admin: {
        description: "The country of origin for the manufacturer",
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "The manufacturer's logo",
      },
    },
    {
      name: "description",
      type: "richText",
      admin: {
        description: "A brief description of the manufacturer",
      },
    },
  ],
};
