import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="terminal-border p-4">
            <Link
              href={`/blog/${post.slug}`}
              className="text-2xl font-bold hover:text-accent">
              {post.title}
            </Link>
            <p className="text-sm mt-2">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
