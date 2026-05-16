import fs from "fs"
import path from "path"

const KNOWLEDGE_DIR = path.join(process.cwd(), "data", "knowledge")

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "in", "on", "at", "to",
  "for", "of", "with", "and", "or", "not", "what", "how", "who", "when",
  "where", "why", "this", "that", "it", "my", "our", "their", "his", "her",
  "its", "do", "does", "did", "have", "has", "had", "be", "been", "being",
  "will", "would", "could", "should", "can", "may", "might", "much", "many",
  "some", "any", "about", "from", "into", "than", "then", "just", "also",
  "more", "very", "too", "but", "if", "so", "up", "out", "me", "we", "us",
  "they", "them", "there", "here", "all", "each", "right", "now",
])

export interface RetrievedDoc {
  filename: string
  content: string
  score: number
  excerpt: string
}

export function retrieveDocuments(query: string, topK: number = 3): RetrievedDoc[] {
  let files: string[]
  try {
    files = fs.readdirSync(KNOWLEDGE_DIR).filter((f) => f.endsWith(".md"))
  } catch {
    return []
  }

  const queryTokens = query
    .toLowerCase()
    .replace(/['']/g, "'")
    .split(/\W+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t))

  if (queryTokens.length === 0) return []

  const scored = files.map((filename) => {
    const content = fs.readFileSync(path.join(KNOWLEDGE_DIR, filename), "utf-8")
    const contentLower = content.toLowerCase()

    let score = 0
    for (const token of queryTokens) {
      // Exact matches
      const regex = new RegExp(token, "gi")
      const matches = contentLower.match(regex)
      score += matches ? matches.length : 0

      // Bonus for filename match
      if (filename.toLowerCase().includes(token)) {
        score += 5
      }
    }

    // Normalize by sqrt of doc length
    score = score / Math.sqrt(content.length / 100)

    // Find best excerpt paragraph
    const paragraphs = content.split(/\n\n+/)
    let bestParagraph = paragraphs[0] || ""
    let bestCount = 0
    for (const p of paragraphs) {
      const pLower = p.toLowerCase()
      let count = 0
      for (const token of queryTokens) {
        const m = pLower.match(new RegExp(token, "gi"))
        count += m ? m.length : 0
      }
      if (count > bestCount) {
        bestCount = count
        bestParagraph = p
      }
    }

    return {
      filename,
      content,
      score,
      excerpt: bestParagraph.replace(/\n/g, " ").slice(0, 200).trim(),
    }
  })

  return scored
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
}
