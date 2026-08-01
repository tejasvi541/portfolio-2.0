import { getBlogPosts } from "@/lib/blog"
import BlogList from "@/components/BlogList"

export default async function BlogPage() {
  const posts = getBlogPosts().filter((post) => post.published)
  return <BlogList posts={posts} />
}
