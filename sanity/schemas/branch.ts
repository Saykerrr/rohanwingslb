import { defineField, defineType } from "sanity";

export const branchSchema = defineType({
  name: "branch",
  title: "Branch",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Branch Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      description: "Include country code without + (e.g. 96171234567)",
      type: "string",
    }),
    defineField({
      name: "mapsLink",
      title: "Google Maps Link",
      type: "url",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
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
      subtitle: "phone",
    },
  },
});
