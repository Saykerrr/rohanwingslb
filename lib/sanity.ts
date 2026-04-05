import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = createImageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// Queries
export const SCOOTERS_QUERY = `*[_type == "scooter"] | order(order asc, _createdAt desc) {
  _id,
  name,
  slug,
  brand,
  category,
  price,
  salePrice,
  "image": images[0],
  specs,
  description,
  badge,
  inStock,
  featured
}`;

export const FEATURED_SCOOTERS_QUERY = `*[_type == "scooter" && featured == true] | order(order asc) {
  _id,
  name,
  slug,
  brand,
  category,
  price,
  salePrice,
  "image": images[0],
  specs,
  description,
  badge,
  inStock,
  featured
}`;

export const SCOOTER_BY_SLUG_QUERY = `*[_type == "scooter" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  brand,
  category,
  price,
  salePrice,
  images,
  specs,
  description,
  fullDescription,
  badge,
  inStock,
  featured
}`;

export const ALL_SCOOTER_SLUGS_QUERY = `*[_type == "scooter"] { "slug": slug.current }`;

export const ACCESSORIES_QUERY = `*[_type == "accessory"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  category,
  price,
  "image": images[0],
  description,
  inStock
}`;

export const BRANCHES_QUERY = `*[_type == "branch"] | order(order asc) {
  _id,
  name,
  phone,
  whatsappNumber,
  mapsLink,
  address
}`;

export const FAQS_QUERY = `*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  heroTitle,
  heroSubtitle,
  heroVideo { asset-> { url } },
  heroImage,
  aboutText,
  instagramHandle,
  instagramFollowers,
  whatsappNumber,
  announcementBar
}`;
