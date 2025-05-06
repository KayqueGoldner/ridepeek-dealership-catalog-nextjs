import type { CollectionConfig } from "payload";

export const Cars: CollectionConfig = {
  slug: "cars",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "make", "model", "year", "price"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "make",
      type: "relationship",
      relationTo: ["manufacturers"],
      hasMany: false,
      required: true,
      filterOptions: {
        vehicleTypes: {
          in: ["cars", "both"],
        },
      },
      admin: {
        description: "Select an existing manufacturer or create a new one",
        allowCreate: true,
      },
    },
    {
      name: "model",
      type: "text",
      required: true,
      admin: {
        description: "The model of the car (e.g., Camry, F-150, 3 Series)",
      },
    },
    {
      name: "year",
      type: "number",
      required: true,
      min: 1900,
      max: new Date().getFullYear() + 1,
      admin: {
        description: "Year the car was manufactured",
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
    {
      name: "condition",
      type: "select",
      options: [
        { label: "New", value: "new" },
        { label: "Used", value: "used" },
        { label: "Certified Pre-Owned", value: "certified" },
      ],
      required: true,
      defaultValue: "used",
    },
    {
      name: "mileage",
      type: "number",
      min: 0,
      admin: {
        description: "Odometer reading in miles",
        condition: (data) => data?.condition !== "new",
      },
    },
    {
      name: "features",
      type: "array",
      fields: [
        {
          name: "feature",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "Notable features of the vehicle",
      },
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "images",
      type: "array",
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
            description: "Use this image as the main image for the vehicle",
          },
        },
      ],
      admin: {
        description: "Vehicle images",
      },
    },
    {
      name: "specifications",
      type: "group",
      fields: [
        {
          name: "engineType",
          type: "text",
          admin: {
            description: "e.g., V6, 4-cylinder, Electric",
          },
        },
        {
          name: "transmission",
          type: "select",
          options: [
            { label: "Automatic", value: "automatic" },
            { label: "Manual", value: "manual" },
            { label: "CVT", value: "cvt" },
            { label: "Electric", value: "electric" },
          ],
        },
        {
          name: "fuelType",
          type: "select",
          options: [
            { label: "Gasoline", value: "gasoline" },
            { label: "Diesel", value: "diesel" },
            { label: "Electric", value: "electric" },
            { label: "Hybrid", value: "hybrid" },
            { label: "Plug-in Hybrid", value: "plugin_hybrid" },
          ],
        },
        {
          name: "mpg",
          type: "group",
          fields: [
            {
              name: "city",
              type: "number",
              min: 0,
            },
            {
              name: "highway",
              type: "number",
              min: 0,
            },
            {
              name: "combined",
              type: "number",
              min: 0,
            },
          ],
          admin: {
            description: "Fuel economy in miles per gallon",
            condition: (data) =>
              data?.fuelType !== "electric" &&
              data?.fuelType !== "plugin_hybrid",
          },
        },
        {
          name: "electricRange",
          type: "number",
          min: 0,
          admin: {
            description: "Range in miles (for electric vehicles)",
            condition: (data) =>
              data?.fuelType === "electric" ||
              data?.fuelType === "plugin_hybrid",
          },
        },
        {
          name: "color",
          type: "group",
          fields: [
            {
              name: "exterior",
              type: "text",
            },
            {
              name: "interior",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "availability",
      type: "select",
      options: [
        { label: "In Stock", value: "in_stock" },
        { label: "On Order", value: "on_order" },
        { label: "Sold", value: "sold" },
      ],
      required: true,
      defaultValue: "in_stock",
    },
    {
      name: "vin",
      type: "text",
      admin: {
        description: "Vehicle Identification Number",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Feature this vehicle on the homepage",
      },
    },
  ],
};
