const GITHUB_API = "https://api.github.com"

function config() {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER || "tejasvi541"
  const repo = process.env.GITHUB_REPO || "portfolio-2.0"
  const branch = process.env.GITHUB_BRANCH || "main"
  if (!token) throw new Error("GITHUB_TOKEN is not configured")
  return { token, owner, repo, branch }
}

function encodePath(filePath: string): string {
  return filePath.split("/").map(encodeURIComponent).join("/")
}

async function githubRequest(path: string, init?: RequestInit): Promise<Response> {
  const { token } = config()
  return fetch(`${GITHUB_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  })
}

async function getFileSha(filePath: string): Promise<string | null> {
  const { owner, repo, branch } = config()
  const res = await githubRequest(`/repos/${owner}/${repo}/contents/${encodePath(filePath)}?ref=${branch}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub read failed (${res.status}): ${await res.text()}`)
  const data = await res.json()
  return typeof data.sha === "string" ? data.sha : null
}

export async function putFile(filePath: string, content: string, message: string): Promise<void> {
  const { owner, repo, branch } = config()
  const sha = await getFileSha(filePath)
  const res = await githubRequest(`/repos/${owner}/${repo}/contents/${encodePath(filePath)}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch,
      ...(sha ? { sha } : {}),
    }),
  })
  if (!res.ok) throw new Error(`GitHub write failed (${res.status}): ${await res.text()}`)
}

export async function deleteFile(filePath: string, message: string): Promise<void> {
  const sha = await getFileSha(filePath)
  if (!sha) throw new Error("File not found")
  const { owner, repo, branch } = config()
  const res = await githubRequest(`/repos/${owner}/${repo}/contents/${encodePath(filePath)}`, {
    method: "DELETE",
    body: JSON.stringify({ message, sha, branch }),
  })
  if (!res.ok) throw new Error(`GitHub delete failed (${res.status}): ${await res.text()}`)
}
