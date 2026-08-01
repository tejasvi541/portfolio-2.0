import { notFound } from "next/navigation"
import { getBlogPost, getBlogPosts } from "@/lib/blog"
import BlogPostView from "@/components/BlogPostView"

export async function generateStaticParams() {
  return getBlogPosts()
    .filter((post) => post.published)
    .map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post || !post.published) {
    notFound()
  }

  return <BlogPostView post={post} />
}
