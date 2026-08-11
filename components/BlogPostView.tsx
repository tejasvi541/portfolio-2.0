"use client"

import Link from "next/link"
import type { BlogPost } from "@/lib/blog"
import { processObsidianMarkdown } from "@/lib/blog-client"
import { Calendar, Tag, ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash"
import c from "react-syntax-highlighter/dist/esm/languages/prism/c"
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp"
import go from "react-syntax-highlighter/dist/esm/languages/prism/go"
import java from "react-syntax-highlighter/dist/esm/languages/prism/java"
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript"
import json from "react-syntax-highlighter/dist/esm/languages/prism/json"
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx"
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown"
import python from "react-syntax-highlighter/dist/esm/languages/prism/python"
import rust from "react-syntax-highlighter/dist/esm/languages/prism/rust"
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql"
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx"
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript"
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml"

// Only the languages actually likely to show up in these posts are
// registered — the full Prism bundle (all ~290 languages) was previously
// shipped on every /blog/[slug] page load regardless of content.
SyntaxHighlighter.registerLanguage("bash", bash)
SyntaxHighlighter.registerLanguage("c", c)
SyntaxHighlighter.registerLanguage("cpp", cpp)
SyntaxHighlighter.registerLanguage("go", go)
SyntaxHighlighter.registerLanguage("java", java)
SyntaxHighlighter.registerLanguage("javascript", javascript)
SyntaxHighlighter.registerLanguage("json", json)
SyntaxHighlighter.registerLanguage("jsx", jsx)
SyntaxHighlighter.registerLanguage("markdown", markdown)
SyntaxHighlighter.registerLanguage("python", python)
SyntaxHighlighter.registerLanguage("rust", rust)
SyntaxHighlighter.registerLanguage("sql", sql)
SyntaxHighlighter.registerLanguage("tsx", tsx)
SyntaxHighlighter.registerLanguage("typescript", typescript)
SyntaxHighlighter.registerLanguage("yaml", yaml)
import { motion } from "framer-motion"
import "katex/dist/katex.min.css"

export default function BlogPostView({ post }: { post: BlogPost }) {
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
              // node/style/ref are pulled out so they don't leak into (and conflict
              // with) the SyntaxHighlighter/code elements below, which set their own.
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              code({ node, className, children, style, ref, ...rest }) {
                const match = /language-(\w+)/.exec(className || "")
                return match ? (
                  <SyntaxHighlighter
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    className="my-4 text-[12px]"
                    customStyle={{
                      border: "1px solid hsl(var(--code-border))",
                      background: "hsl(var(--code-bg))",
                      padding: "16px",
                      margin: "16px 0",
                    }}
                    {...rest}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className={className}
                    style={{
                      background: "hsl(var(--code-bg))",
                      color: "hsl(var(--code-accent))",
                      padding: "2px 6px",
                      fontSize: "12px",
                      fontFamily: "var(--font-code)",
                    }}
                    {...rest}
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
