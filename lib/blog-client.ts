// Pure client-safe helpers shared by the blog admin editor and public post view.

// Generate a URL-friendly slug from a title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()
}

// Process Obsidian-style wiki links and #tags for react-markdown rendering
export function processObsidianMarkdown(content: string): string {
  let processed = content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (match, link, text) => {
    const slug = generateSlug(link)
    const displayText = text || link
    return `[${displayText}](/blog/${slug})`
  })

  processed = processed.replace(/(^|\s)#(\w+)/g, "$1`#$2`")

  return processed
}
