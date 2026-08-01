import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import matter from "gray-matter"
import { COOKIE_NAME, verifySession } from "@/lib/blog-auth"
import { getBlogPosts } from "@/lib/blog"
import { putFile, deleteFile } from "@/lib/github"
import { generateSlug } from "@/lib/blog-client"

async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  return verifySession(cookieStore.get(COOKIE_NAME)?.value)
}

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return NextResponse.json({ posts: getBlogPosts() })
}

export async function POST(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: {
    title?: string
    slug?: string
    date?: string
    tags?: string[]
    published?: boolean
    content?: string
    previousSlug?: string
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const title = typeof body.title === "string" ? body.title.trim() : ""
  const content = typeof body.content === "string" ? body.content : ""
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
  }

  const slug = (typeof body.slug === "string" && body.slug.trim()) || generateSlug(title)
  const date = typeof body.date === "string" && body.date ? body.date : new Date().toISOString().split("T")[0]
  const tags = Array.isArray(body.tags) ? body.tags.map(String) : []
  const published = body.published !== false
  const previousSlug = typeof body.previousSlug === "string" ? body.previousSlug : undefined

  const fileContents = matter.stringify(content, { title, date, tags, published })

  try {
    if (previousSlug && previousSlug !== slug) {
      await deleteFile(`posts/${previousSlug}.md`, `Rename blog post: ${previousSlug} -> ${slug}`).catch(() => {})
    }
    await putFile(`posts/${slug}.md`, fileContents, `${previousSlug ? "Update" : "Create"} blog post: ${slug}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to publish post"
    return NextResponse.json({ error: message }, { status: 502 })
  }

  return NextResponse.json({ success: true, slug })
}

export async function DELETE(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const slug = request.nextUrl.searchParams.get("slug")
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 })
  }

  try {
    await deleteFile(`posts/${slug}.md`, `Delete blog post: ${slug}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete post"
    return NextResponse.json({ error: message }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
