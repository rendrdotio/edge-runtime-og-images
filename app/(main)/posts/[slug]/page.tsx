import Image from "next/image";
import { notFound } from "next/navigation";

// Constants
import posts from "@/content/posts.json";
import domain from "@/constants/general";

// Types
import type { Metadata } from "next";

export const runtime = "edge";

async function getPostFromParams({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const post = posts.find((post) => post.slug === slug);

  if (!post) return null;

  return post;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostFromParams({ params });

  if (!post) {
    return {};
  }

  return {
    metadataBase: new URL(domain),
    title: post.title,
    description: post.description,
    openGraph: {
      description: post.description,

      title: post.title,
      type: "article",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostFromParams({ params });

  if (!post) {
    notFound();
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <div>
        <Image
          src={post.image}
          alt={post.title}
          width={900}
          height={600}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
      <h1 className="mb-2">{post.title}</h1>
      {post.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      <div className="flex justify-between">
        <div>
          <div>{post.attributes[0].value}</div>
          <div className="flex gap-x-2">
            {post.features.map((feature, i) => {
              return (
                <span className="font-semibold" key={i}>
                  {feature}
                </span>
              );
            })}
          </div>
        </div>
        <div className="text-end">
          <div>{post.attributes[1].value}</div>
          <div>{post.attributes[2].value}</div>
        </div>
      </div>
      <hr className="my-4" />
    </article>
  );
}
