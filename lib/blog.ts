import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "posts")

export type BlogPost = {
  slug: string
  title: string
  date: string
  content: string
  tags: string[]
  published: boolean
}

function readPost(fileName: string): BlogPost {
  const slug = fileName.replace(/\.md$/, "")
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: typeof data.date === "string" ? data.date : new Date().toISOString().split("T")[0],
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    published: data.published !== false,
    content: content.trim(),
  }
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return []
  const fileNames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"))
  return fileNames
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getBlogPost(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  return readPost(`${slug}.md`)
}
