import { sanityFetch } from "@/sanity/lib/live";
import { allPostSlugsQuery, postBySlugQuery } from "@/sanity/queries";
import { Post } from "@/sanity/types";
import { PortableText } from "next-sanity";

import Image from "next/image";
import { notFound } from "next/navigation";

// Tell Next.js which slugs to pre-render at build time
export async function generateStaticParams() {
    const { data: slugs } = await sanityFetch({ query: allPostSlugsQuery });
    return (slugs as { slug: string }[]).map(({ slug }) => ({ slug }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
    const { data } = await sanityFetch({ query: postBySlugQuery, params });

    if (!data) notFound(); // renders your app/not-found.tsx

    const post = data as Post;

    return (
        <article className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            {post.publishedAt && (
                <time className="text-sm text-gray-400 block mb-8">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </time>
            )}

            {post.coverImage?.asset?.url && (
                <div className="relative w-full h-72 mb-8 rounded-xl overflow-hidden">
                    <Image
                        src={post.coverImage.asset.url}
                        alt={post.title}
                        className="object-contain"
                        priority
                        height={288}
                        width={250}
                    />
                </div>
            )}

            {Array.isArray(post.body) && (
                <div className="prose prose-lg max-w-none">
                    <PortableText value={post.body} />
                </div>
            )}
        </article>
    );
}