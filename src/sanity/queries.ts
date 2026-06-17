import { groq } from "next-sanity";

// Fetch all posts for the blog listing page
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage {
      asset-> { _id, url }
    }
  }
`;

// Fetch a single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage {
      asset-> { _id, url }
    },
    body
  }
`;

// Fetch all slugs for generateStaticParams
export const allPostSlugsQuery = groq`
  *[_type == "post"] { "slug": slug.current }
`;