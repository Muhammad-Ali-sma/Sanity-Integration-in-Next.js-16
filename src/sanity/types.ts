import { TypedObject } from "sanity";

export interface SanitySlug {
  current: string;
}

export interface SanityImageAsset {
  _id: string;
  url: string;
}

export interface SanityImage {
  asset: SanityImageAsset;
}

export interface Post {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  publishedAt: string;
  coverImage?: SanityImage;
  body?: TypedObject[]; // Portable Text blocks
}