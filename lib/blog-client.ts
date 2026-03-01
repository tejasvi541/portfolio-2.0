// Client-side blog management with localStorage

export type BlogPost = {
  id: string
  slug: string
  title: string
  date: string
  content: string
  tags: string[]
  published: boolean
  createdAt: string
  updatedAt: string
}

const BLOG_STORAGE_KEY = "portfolio_blog_posts"

// Get all blog posts from localStorage
export function getBlogPostsClient(): BlogPost[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(BLOG_STORAGE_KEY)
  if (!stored) return []

  try {
    return JSON.parse(stored)
  } catch (error) {
    console.error("[v0] Error parsing blog posts:", error)
    return []
  }
}

// Get a single blog post by slug
export function getBlogPostClient(slug: string): BlogPost | null {
  const posts = getBlogPostsClient()
  return posts.find((post) => post.slug === slug) || null
}

// Save or update a blog post
export function saveBlogPost(post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): void {
  const posts = getBlogPostsClient()
  const now = new Date().toISOString()

  const existingIndex = posts.findIndex((p) => p.slug === post.slug)

  if (existingIndex >= 0) {
    // Update existing post
    posts[existingIndex] = {
      ...posts[existingIndex],
      ...post,
      updatedAt: now,
    }
  } else {
    // Create new post
    posts.push({
      ...post,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    })
  }

  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts))
}

// Delete a blog post
export function deleteBlogPost(slug: string): void {
  const posts = getBlogPostsClient()
  const filtered = posts.filter((post) => post.slug !== slug)
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(filtered))
}

// Generate a URL-friendly slug from a title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()
}

// Generate a unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Process Obsidian-style wiki links
export function processObsidianMarkdown(content: string): string {
  // Convert [[wiki links]] to [markdown links](/blog/slug)
  let processed = content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (match, link, text) => {
    const slug = generateSlug(link)
    const displayText = text || link
    return `[${displayText}](/blog/${slug})`
  })

  // Process #tags
  processed = processed.replace(/(^|\s)#(\w+)/g, "$1`#$2`")

  return processed
}
