import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Background Video",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image (fallback)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutText",
      title: "About Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram Handle",
      type: "string",
    }),
    defineField({
      name: "instagramFollowers",
      title: "Instagram Followers Count",
      type: "string",
      description: "e.g. 12.5K",
    }),
    defineField({
      name: "whatsappNumber",
      title: "Main WhatsApp Number",
      description: "Include country code without + (e.g. 96171234567)",
      type: "string",
    }),
    defineField({
      name: "announcementBar",
      title: "Announcement Bar Text",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "heroTitle",
    },
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
