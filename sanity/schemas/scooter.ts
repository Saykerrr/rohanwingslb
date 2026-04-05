import { defineField, defineType } from "sanity";

export const scooterSchema = defineType({
  name: "scooter",
  title: "Scooter",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      options: {
        list: [
          { title: "Segway", value: "segway" },
          { title: "Ninebot", value: "ninebot" },
          { title: "Xiaomi", value: "xiaomi" },
          { title: "Vsett", value: "vsett" },
          { title: "Kaabo", value: "kaabo" },
          { title: "Zero", value: "zero" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "City", value: "city" },
          { title: "Off-Road", value: "off-road" },
          { title: "Performance", value: "performance" },
          { title: "Folding", value: "folding" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "salePrice",
      title: "Sale Price (USD)",
      type: "number",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "object",
      fields: [
        defineField({ name: "topSpeed", title: "Top Speed (km/h)", type: "number" }),
        defineField({ name: "range", title: "Range (km)", type: "number" }),
        defineField({ name: "motor", title: "Motor Power (W)", type: "number" }),
        defineField({ name: "battery", title: "Battery (Wh)", type: "number" }),
        defineField({ name: "weight", title: "Weight (kg)", type: "number" }),
        defineField({ name: "maxLoad", title: "Max Load (kg)", type: "number" }),
        defineField({ name: "chargingTime", title: "Charging Time (h)", type: "number" }),
        defineField({ name: "waterResistance", title: "Water Resistance (IP rating)", type: "string" }),
        defineField({ name: "tireSize", title: "Tire Size (inches)", type: "number" }),
        defineField({ name: "brakes", title: "Brake Type", type: "string" }),
        defineField({ name: "suspension", title: "Suspension", type: "string" }),
        defineField({ name: "displayType", title: "Display Type", type: "string" }),
      ],
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      options: {
        list: [
          { title: "New", value: "New" },
          { title: "Best Seller", value: "Best Seller" },
          { title: "Hot Deal", value: "Hot Deal" },
          { title: "Limited", value: "Limited" },
          { title: "Sale", value: "Sale" },
        ],
      },
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "brand",
      media: "images.0",
    },
  },
});
