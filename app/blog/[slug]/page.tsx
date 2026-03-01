"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getBlogPostClient, processObsidianMarkdown } from "@/lib/blog-client"
import type { BlogPost } from "@/lib/blog-client"
import { Calendar, Tag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"
import { motion } from "framer-motion"
import "katex/dist/katex.min.css"

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const slug = params.slug as string
    const loadedPost = getBlogPostClient(slug)
    if (!loadedPost || !loadedPost.published) {
      router.push("/blog")
      return
    }
    setPost(loadedPost)
    setLoading(false)
  }, [params, router])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="h-12 bg-muted/30 animate-pulse mb-4" />
        <div className="h-96 bg-muted/30 animate-pulse" />
      </div>
    )
  }

  if (!post) return null

  const processedContent = processObsidianMarkdown(post.content)

  return (
    <div className="max-w-3xl mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[11px] font-mono mb-6 text-dracula-comment hover:text-dracula-cyan transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to posts
        </Link>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border border-border overflow-hidden"
        style={{ background: "hsl(var(--dracula-bg))" }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-dracula-purple via-dracula-cyan to-dracula-green" />

        <header className="p-6 md:p-8 border-b border-border">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl font-sans font-bold mb-4 text-dracula-foreground"
          >
            {post.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-dracula-comment">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-[2px] border border-dracula-purple/40 text-dracula-purple bg-dracula-current/50"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="p-6 md:p-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "")
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    className="my-4 text-[12px]"
                    customStyle={{
                      border: "1px solid hsl(var(--dracula-current))",
                      background: "hsl(var(--dracula-current))",
                      padding: "16px",
                      margin: "16px 0",
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className={className}
                    style={{
                      background: "hsl(var(--dracula-current))",
                      color: "hsl(var(--dracula-green))",
                      padding: "2px 6px",
                      fontSize: "12px",
                      fontFamily: "var(--font-mono)",
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                )
              },
              h1: ({ children }) => (
                <h1 className="text-xl font-sans font-bold mb-4 mt-8 pb-2 border-b text-dracula-purple border-border">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-sans font-bold mb-3 mt-6 text-dracula-pink">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-sans font-semibold mb-2 mt-4 text-dracula-cyan">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed text-[13px] text-dracula-foreground font-mono">{children}</p>
              ),
              ul: ({ children }) => <ul className="space-y-1.5 mb-4 ml-1">{children}</ul>,
              ol: ({ children }) => <ol className="space-y-1.5 mb-4 ml-1 list-decimal list-inside">{children}</ol>,
              li: ({ children }) => (
                <li className="flex items-start text-[13px] text-dracula-foreground font-mono">
                  <span className="mr-2 mt-0.5 text-dracula-cyan">&bull;</span>
                  <span>{children}</span>
                </li>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-dracula-cyan underline underline-offset-2 hover:text-dracula-green transition-colors"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="pl-4 my-4 border-l-2 border-dracula-green text-[13px] text-dracula-comment font-mono">
                  {children}
                </blockquote>
              ),
              strong: ({ children }) => <strong className="text-dracula-orange">{children}</strong>,
              em: ({ children }) => <em className="text-dracula-yellow">{children}</em>,
            }}
          >
            {processedContent}
          </ReactMarkdown>
        </div>
      </motion.article>
    </div>
  )
}
