"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, Upload, FileText, Lock, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateSlug } from "@/lib/blog-client"
import type { BlogPost } from "@/lib/blog"
import Link from "next/link"
import { motion } from "framer-motion"
import MarkdownEditor from "@/components/MarkdownEditor"

export default function BlogAdminPage() {
  const [authState, setAuthState] = useState<"checking" | "unauthenticated" | "authenticated">("checking")
  const [passwordInput, setPasswordInput] = useState("")
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [originalSlug, setOriginalSlug] = useState<string | undefined>(undefined)
  const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({
    title: "",
    content: "",
    tags: [],
    published: true,
    slug: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [tagInput, setTagInput] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetch("/api/blog-auth")
      .then((res) => res.json())
      .then((data) => {
        setAuthState(data.authenticated ? "authenticated" : "unauthenticated")
        if (data.authenticated) loadPosts()
      })
      .catch(() => setAuthState("unauthenticated"))
  }, [])

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwordInput.trim()) {
      toast({ variant: "destructive", title: "Enter password", description: "Password cannot be blank." })
      return
    }
    const res = await fetch("/api/blog-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: passwordInput }),
    })
    const data = await res.json()
    if (data.success) {
      setAuthState("authenticated")
      setPasswordInput("")
      loadPosts()
      toast({ title: "Access granted", description: "Welcome to the blog admin." })
    } else {
      toast({ variant: "destructive", title: "Access denied", description: data.error || "Invalid password." })
    }
  }

  const handleLogout = async () => {
    await fetch("/api/blog-auth", { method: "DELETE" })
    setAuthState("unauthenticated")
    setPosts([])
  }

  const loadPosts = async () => {
    try {
      const res = await fetch("/api/blog-posts")
      if (!res.ok) throw new Error("Failed to load posts")
      const data = await res.json()
      setPosts((data.posts as BlogPost[]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    } catch {
      toast({ variant: "destructive", title: "Couldn't load posts", description: "Try refreshing the page." })
    }
  }

  const parseFrontmatter = (content: string) => {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
    if (!match) return { frontmatter: {} as Record<string, any>, content }
    const fm: Record<string, any> = {}
    match[1].split("\n").forEach((line) => {
      const idx = line.indexOf(":")
      if (idx > 0) {
        const key = line.slice(0, idx).trim()
        let val: any = line.slice(idx + 1).trim()
        if (val.startsWith("[") && val.endsWith("]")) val = val.slice(1, -1).split(",").map((v: string) => v.trim().replace(/['"]/g, ""))
        if (typeof val === "string" && val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1)
        fm[key] = val
      }
    })
    return { frontmatter: fm, content: match[2] }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const mdFile = Array.from(e.dataTransfer.files).find((f) => f.name.endsWith(".md"))
    if (mdFile) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result as string
        const { frontmatter, content } = parseFrontmatter(text)
        setEditingPost({
          title: frontmatter.title || mdFile.name.replace(".md", ""),
          content: content.trim(),
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          published: true,
          slug: generateSlug(frontmatter.title || mdFile.name.replace(".md", "")),
          date: frontmatter.date || new Date().toISOString().split("T")[0],
        })
        setOriginalSlug(undefined)
        setIsEditing(true)
        toast({ title: "File imported", description: `Loaded: ${mdFile.name}` })
      }
      reader.readAsText(mdFile)
    }
  }, [toast])

  const handleCreateNew = () => {
    setEditingPost({ title: "", content: "", tags: [], published: true, slug: "", date: new Date().toISOString().split("T")[0] })
    setOriginalSlug(undefined)
    setIsEditing(true)
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setOriginalSlug(post.slug)
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!editingPost.title || !editingPost.content) {
      toast({ variant: "destructive", title: "Missing fields", description: "Title and content are required." })
      return
    }
    const slug = editingPost.slug || generateSlug(editingPost.title)
    setIsSaving(true)
    try {
      const res = await fetch("/api/blog-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editingPost, slug, previousSlug: originalSlug }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to publish post")
      toast({ title: "Post published", description: "Vercel is redeploying — it'll be live in about a minute." })
      setIsEditing(false)
      loadPosts()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong."
      toast({ variant: "destructive", title: "Save failed", description: message })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm("Confirm deletion?")) return
    try {
      const res = await fetch(`/api/blog-posts?slug=${encodeURIComponent(slug)}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to delete post")
      toast({ title: "Post deleted", description: "Vercel is redeploying to remove it from the live site." })
      loadPosts()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong."
      toast({ variant: "destructive", title: "Delete failed", description: message })
    }
  }

  const handleAddTag = () => {
    if (tagInput && !editingPost.tags?.includes(tagInput)) {
      setEditingPost({ ...editingPost, tags: [...(editingPost.tags || []), tagInput] })
      setTagInput("")
    }
  }

  if (authState === "checking") {
    return (
      <div className="max-w-md mx-auto relative z-10 mt-16">
        <div className="war-card text-center py-12">
          <div className="animate-pulse text-muted-foreground text-xs font-mono">Checking access…</div>
        </div>
      </div>
    )
  }

  if (authState === "unauthenticated") {
    return (
      <div className="max-w-md mx-auto relative z-10 mt-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="war-card">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-sans font-bold">Blog Admin</h1>
          </div>
          <p className="text-[10px] font-mono text-muted-foreground mb-4">Enter the admin password to continue.</p>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="blog-admin-password" className="block text-[10px] font-mono text-primary mb-2">Password</label>
              <Input
                id="blog-admin-password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Admin password"
                className="bg-input border-border focus:border-primary h-10 text-xs font-mono"
                autoComplete="current-password"
                autoFocus
              />
            </div>
            <Button type="submit" className="brutal-button w-full h-10 text-[10px]">Unlock</Button>
          </form>
          <Link href="/blog" className="block mt-4 text-[10px] font-mono text-muted-foreground hover:text-primary">← Back to blog</Link>
        </motion.div>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="war-card">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div>
              <div className="status-online mb-2">{originalSlug ? "Editing" : "New Post"}</div>
              <h1 className="text-lg font-sans font-bold">Post Editor</h1>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} className="brutal-button h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono text-primary mb-2">Title</label>
              <Input
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                placeholder="Entry title"
                className="bg-input border-border focus:border-primary h-10 text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-primary mb-2">Slug</label>
                <Input
                  value={editingPost.slug || (editingPost.title ? generateSlug(editingPost.title) : "")}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                  placeholder="url-slug"
                  className="bg-input border-border focus:border-primary h-10 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-primary mb-2">Date</label>
                <Input
                  type="date"
                  value={editingPost.date}
                  onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                  className="bg-input border-border focus:border-primary h-10 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-primary mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                  placeholder="Add tag"
                  className="bg-input border-border focus:border-primary h-10 text-xs font-mono"
                />
                <Button type="button" onClick={handleAddTag} className="brutal-button text-[10px] h-10 px-4">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editingPost.tags?.map((tag) => (
                  <span key={tag} className="tech-tag flex items-center gap-2">
                    {tag}
                    <button type="button" onClick={() => setEditingPost({ ...editingPost, tags: editingPost.tags?.filter((t) => t !== tag) || [] })} className="hover:text-primary">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-dracula-green mb-2">Content</label>
              <MarkdownEditor value={editingPost.content || ""} onChange={(value) => setEditingPost({ ...editingPost, content: value })} />
              <p className="text-[10px] font-mono text-dracula-comment mt-2">Supports: Markdown, [[wiki links]], #tags, code blocks, tables</p>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
              <input type="checkbox" checked={editingPost.published} onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })} className="w-4 h-4 accent-primary" />
              <span>Published</span>
            </label>

            <div className="flex gap-2 pt-4 border-t border-border">
              <Button onClick={handleSave} disabled={isSaving} className="brutal-button flex-1 h-10 text-[10px] disabled:opacity-50">
                <Save className="h-3 w-3 mr-2" />{isSaving ? "Publishing…" : "Save"}
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="brutal-button h-10 text-[10px]">Cancel</Button>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground">
              Saving commits the post to GitHub, which triggers a Vercel redeploy — it appears on the live blog roughly a minute later.
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="war-card mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="status-online mb-2">Admin</div>
            <h1 className="text-lg font-sans font-bold">Blog Manager</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/blog">
              <Button variant="outline" className="brutal-button text-[10px] h-8 bg-transparent"><Eye className="h-3 w-3 mr-2" />View Blog</Button>
            </Link>
            <Button onClick={handleCreateNew} className="brutal-button text-[10px] h-8"><Plus className="h-3 w-3 mr-2" />New Post</Button>
            <Button variant="outline" onClick={handleLogout} className="brutal-button text-[10px] h-8 bg-transparent"><LogOut className="h-3 w-3 mr-2" />Log out</Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        className={`war-card mb-8 border-dashed transition-colors ${isDragging ? "border-primary bg-primary/5" : ""}`}
      >
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Upload className={`h-8 w-8 mb-4 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
          <p className="text-xs font-sans font-semibold mb-2">Drop Zone</p>
          <p className="text-[10px] font-mono text-muted-foreground">Drag .md files here to import. Supports Obsidian frontmatter.</p>
        </div>
      </motion.div>

      <div className="grid gap-4">
        {posts.length === 0 ? (
          <div className="war-card text-center py-12">
            <FileText className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <p className="text-primary text-xs font-sans font-semibold mb-4">No posts yet</p>
            <Button onClick={handleCreateNew} className="brutal-button text-[10px]"><Plus className="h-3 w-3 mr-2" />Create First Post</Button>
          </div>
        ) : (
          posts.map((post, index) => (
            <motion.div key={post.slug} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="war-card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-sans font-bold">{post.title}</h3>
                    {post.published ? <Eye className="h-3 w-3 text-primary" /> : <EyeOff className="h-3 w-3 text-muted-foreground" />}
                  </div>
                  <p className="text-[10px] font-mono text-muted-foreground mb-2">{post.date}</p>
                  <p className="text-xs font-mono text-muted-foreground mb-3 line-clamp-2">{post.content.substring(0, 150)}...</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => <span key={tag} className="tech-tag">#{tag}</span>)}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(post)} className="brutal-button h-8 w-8 p-0"><Edit className="h-3 w-3" /></Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(post.slug)} className="brutal-button h-8 w-8 p-0 hover:border-red-500 hover:text-red-500"><Trash2 className="h-3 w-3" /></Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
