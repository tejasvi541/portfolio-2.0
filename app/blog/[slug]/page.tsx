import { getBlogPost } from "@/lib/blog";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm mb-8">{post.date}</p>
      <div className="prose prose-invert max-w-none">
        <Markdown>{post.content}</Markdown>
      </div>
    </div>
  );
}
