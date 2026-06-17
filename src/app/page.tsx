import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery } from "@/sanity/queries";
import { Post } from "@/sanity/types";
import Link from "next/link";

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({ query: allPostsQuery });

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <ul className="space-y-8">
        {(posts as Post[]).map((post) => (
          <li key={post._id} className="border-b pb-8">
            <Link href={`/blog/${post.slug.current}`}>
              <h2 className="text-2xl font-semibold hover:underline">
                {post.title}
              </h2>
            </Link>
            {post.excerpt && (
              <p className="mt-2 text-gray-600">{post.excerpt}</p>
            )}
            {post.publishedAt && (
              <time className="text-sm text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}