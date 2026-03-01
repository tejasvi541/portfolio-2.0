import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import remarkFrontmatter from "remark-frontmatter"
import { visit } from "unist-util-visit"

const postsDirectory = path.join(process.cwd(), "posts")

export type BlogPost = {
  slug: string
  title: string
  date: string
  content: string
  tags: string[]
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      const processedContent = await processMarkdown(content)

      return {
        slug,
        ...(data as { title: string; date: string; tags: string[] }),
        content: processedContent,
      }
    }),
  )

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  const processedContent = await processMarkdown(content)

  return {
    slug,
    ...(data as { title: string; date: string; tags: string[] }),
    content: processedContent,
  }
}

async function processMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .use(remarkObsidianWikiLinks)
    .process(content)

  return result.toString()
}

// Custom plugin to handle Obsidian-style wiki links
function remarkObsidianWikiLinks() {
  return (tree: any) => {
    visit(tree, "text", (node: any, index: number, parent: any) => {
      const regex = /\[\[(.*?)\]\]/g
      const matches = Array.from(node.value.matchAll(regex))

      if (matches.length > 0) {
        const newNodes = []
        let lastIndex = 0

        matches.forEach((match) => {
          const [fullMatch, linkText] = match
          const matchIndex = match.index!

          if (matchIndex > lastIndex) {
            newNodes.push({ type: "text", value: node.value.slice(lastIndex, matchIndex) })
          }

          const [pageName, altText] = linkText.split("|")

          newNodes.push({
            type: "link",
            url: `/blog/${pageName.toLowerCase().replace(/ /g, "-")}`,
            children: [{ type: "text", value: altText || pageName }],
          })

          lastIndex = matchIndex + fullMatch.length
        })

        if (lastIndex < node.value.length) {
          newNodes.push({ type: "text", value: node.value.slice(lastIndex) })
        }

        parent.children.splice(index, 1, ...newNodes)
        return [visit.SKIP, index + newNodes.length]
      }
    })
  }
}
