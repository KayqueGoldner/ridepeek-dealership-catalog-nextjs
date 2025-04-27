import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "url",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "fileId",
      type: "text",
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
  ],
  upload: {
    disableLocalStorage: true, // Disable local storage in favor of UploadThing
    mimeTypes: [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/svg+xml",
      "image/webp",
    ],
  },
};
