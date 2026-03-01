"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getBlogPostsClient, type BlogPost } from "@/lib/blog-client"
import { Calendar, Tag, ArrowUpRight, MousePointerClick } from "lucide-react"
import { motion } from "framer-motion"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadedPosts = getBlogPostsClient().filter((post) => post.published)
    setPosts(loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    setLoading(false)
  }, [])

  const handleDoubleClick = useCallback(
    (slug: string) => {
      router.push(`/blog/${slug}`)
    },
    [router],
  )

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-muted/30 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 mb-10 border border-border"
        style={{ background: "hsl(var(--dracula-bg))" }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-dracula-purple via-dracula-cyan to-dracula-green" />
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-[5px] h-[5px] bg-dracula-green animate-pulse" />
              <span className="text-[10px] font-mono text-dracula-comment">Knowledge Base</span>
            </div>
            <h1 className="text-xl font-sans font-bold text-dracula-foreground">Technical Writings</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-[9px] font-mono px-2.5 py-1 bg-dracula-current text-dracula-comment">
              <MousePointerClick className="w-3 h-3" />
              <span>Double-click to read</span>
            </div>
            <Link
              href="/blog/admin"
              className="brutal-button flex items-center gap-2 text-[10px] border-dracula-purple/50 text-dracula-purple hover:bg-dracula-purple hover:text-dracula-bg"
            >
              Admin
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Empty state */}
      {posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 border border-border"
          style={{ background: "hsl(var(--dracula-bg))" }}
        >
          <p className="text-sm font-sans text-dracula-comment mb-2">No entries yet</p>
          <p className="text-xs font-mono text-dracula-comment/70">Head to the admin panel to create your first post.</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              onDoubleClick={() => handleDoubleClick(post.slug)}
              className="p-5 border border-border group transition-all duration-200 hover:border-dracula-purple/40 hover:shadow-[0_0_20px_hsl(var(--dracula-purple)/0.06)]"
              style={{ background: "hsl(var(--dracula-bg))", cursor: "none" }}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") handleDoubleClick(post.slug) }}
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-sm font-sans font-bold text-dracula-foreground leading-snug">
                  {post.title}
                </h2>
                <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 ml-3 text-dracula-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex items-center gap-4 text-[10px] font-mono text-dracula-comment mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <p className="text-[11px] font-mono text-dracula-foreground/60 mb-3 line-clamp-2 leading-relaxed">
                {post.content.replace(/[#*_`[\]]/g, "").substring(0, 200)}...
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-[2px] border border-dracula-green/30 text-dracula-green bg-dracula-current/50"
                    >
                      <Tag className="h-2 w-2" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
