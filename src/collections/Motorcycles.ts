import type { CollectionConfig } from "payload";

export const Motorcycles: CollectionConfig = {
  slug: "motorcycles",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "manufacturer", "year", "price"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "manufacturer",
      type: "relationship",
      relationTo: ["manufacturers"],
      hasMany: false,
      required: true,
      filterOptions: {
        vehicleTypes: {
          in: ["motorcycles", "both"],
        },
      },
      admin: {
        description: "Select an existing manufacturer or create a new one",
        allowCreate: true,
      },
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "year",
      type: "number",
      required: true,
      min: 1885,
      max: new Date().getFullYear() + 1,
      admin: {
        description: "Year the motorcycle was manufactured",
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
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "hidden",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "condition",
      type: "select",
      options: [
        { label: "New", value: "new" },
        { label: "Used", value: "used" },
        { label: "Certified Pre-Owned", value: "certified" },
        { label: "Custom...", value: "custom" },
      ],
      required: true,
      defaultValue: "used",
      admin: {
        description: "Select the condition of the motorcycle",
        isClearable: true,
        isSortable: true,
      },
    },
    {
      name: "customCondition",
      type: "text",
      required: true,
      admin: {
        description: "Enter a custom condition",
        condition: (data: { condition?: string }) =>
          data?.condition === "custom",
      },
    },
    {
      name: "mileage",
      type: "number",
      min: 0,
      admin: {
        description: "Odometer reading in miles",
        condition: (data: { condition?: string }) => data?.condition !== "new",
      },
    },
    {
      name: "engineType",
      type: "select",
      required: true,
      options: [
        { label: "2-Stroke", value: "2-stroke" },
        { label: "4-Stroke", value: "4-stroke" },
        { label: "Electric", value: "electric" },
        { label: "Hybrid", value: "hybrid" },
        { label: "Custom...", value: "custom" },
      ],
      admin: {
        description: "Select the engine type",
        isClearable: true,
        isSortable: true,
      },
    },
    {
      name: "customEngineType",
      type: "text",
      required: true,
      admin: {
        description:
          "Enter a custom engine type if 'Custom...' was selected above",
        condition: (data: { engineType?: string }) =>
          data?.engineType === "custom",
      },
    },
    {
      name: "displacement",
      type: "number",
      label: "Engine Displacement (cc)",
      required: true,
      min: 0,
      admin: {
        condition: (data: { engineType?: string }) =>
          data?.engineType !== "electric" && data?.engineType !== "custom",
        description: "Engine displacement in cubic centimeters",
      },
    },
    {
      name: "transmission",
      type: "select",
      required: true,
      options: [
        { label: "Manual", value: "manual" },
        { label: "Automatic", value: "automatic" },
        { label: "Semi-automatic", value: "semi-automatic" },
        { label: "CVT", value: "cvt" },
        { label: "Direct Drive", value: "direct-drive" },
        { label: "Custom...", value: "custom" },
      ],
      admin: {
        description: "Select the transmission type",
        isClearable: true,
        isSortable: true,
      },
    },
    {
      name: "customTransmission",
      type: "text",
      admin: {
        description:
          "Enter a custom transmission type if 'Custom...' was selected above",
        condition: (data: { transmission?: string }) =>
          data?.transmission === "custom",
      },
    },
    {
      name: "weight",
      type: "number",
      label: "Weight (kg)",
      required: true,
      min: 0,
    },
    {
      name: "fuelCapacity",
      type: "number",
      label: "Fuel Capacity (L)",
      required: false,
      min: 0,
      admin: {
        condition: (data: { engineType?: string }) =>
          data?.engineType !== "electric" && data?.engineType !== "custom",
        description: "Fuel capacity in liters",
      },
    },
    {
      name: "batteryCapacity",
      type: "number",
      label: "Battery Capacity (kWh)",
      required: false,
      min: 0,
      admin: {
        condition: (data: { engineType?: string }) =>
          data?.engineType === "electric" || data?.engineType === "hybrid",
        description: "Battery capacity in kWh",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Sport", value: "sport" },
        { label: "Cruiser", value: "cruiser" },
        { label: "Touring", value: "touring" },
        { label: "Adventure", value: "adventure" },
        { label: "Naked", value: "naked" },
        { label: "Enduro", value: "enduro" },
        { label: "Motocross", value: "motocross" },
        { label: "Scooter", value: "scooter" },
        { label: "Standard", value: "standard" },
        { label: "Custom", value: "custom" },
        { label: "Supermoto", value: "supermoto" },
        { label: "Dual Sport", value: "dual-sport" },
        { label: "Dirt Bike", value: "dirt-bike" },
        { label: "Custom...", value: "custom-category" },
      ],
      admin: {
        description: "Select the category of the motorcycle",
        isClearable: true,
        isSortable: true,
      },
    },
    {
      name: "customCategory",
      type: "text",
      admin: {
        description:
          "Enter a custom category if 'Custom...' was selected above",
        condition: (data: { category?: string }) =>
          data?.category === "custom-category",
      },
    },
    {
      name: "colors",
      type: "array",
      required: true,
      fields: [
        {
          name: "color",
          type: "text",
          required: true,
        },
      ],
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
            description: "Use this image as the main image for the motorcycle",
          },
        },
      ],
    },
  ],
};

export default Motorcycles;
