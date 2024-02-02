import Image from "next/image";
import Link from "next/link";

// Constants
import posts from "@/content/posts.json";

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      {posts.map((post) => (
        <article key={post.id}>
          <Link href={`posts/${post.slug}`}>
            <Image alt={post.title} src={post.image} width={900} height={600} />
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  );
}
