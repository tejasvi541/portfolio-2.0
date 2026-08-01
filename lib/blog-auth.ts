import crypto from "crypto"

export const COOKIE_NAME = "blog_admin_session"
export const COOKIE_MAX_AGE = 60 * 60 * 24 // 24 hours, in seconds

function getSecret(): string | null {
  const secret = process.env.BLOG_ADMIN_PASSWORD
  return secret && secret.trim() !== "" ? secret : null
}

export function isAdminConfigured(): boolean {
  return getSecret() !== null
}

export function checkPassword(candidate: string): boolean {
  const secret = getSecret()
  if (!secret) return false
  const a = Buffer.from(candidate)
  const b = Buffer.from(secret)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

// Session token = "<issuedAt>.<hmac>", signed with the admin password so it
// can't be forged without knowing the secret, and self-expiring.
export function signSession(): string {
  const secret = getSecret()
  if (!secret) throw new Error("Admin password not configured")
  const issuedAt = Date.now().toString()
  const mac = crypto.createHmac("sha256", secret).update(issuedAt).digest("hex")
  return `${issuedAt}.${mac}`
}

export function verifySession(token: string | undefined | null): boolean {
  const secret = getSecret()
  if (!secret || !token) return false

  const [issuedAt, mac] = token.split(".")
  if (!issuedAt || !mac) return false

  const expectedMac = crypto.createHmac("sha256", secret).update(issuedAt).digest("hex")
  const expectedBuf = Buffer.from(expectedMac, "hex")
  const macBuf = Buffer.from(mac, "hex")
  if (expectedBuf.length !== macBuf.length || !crypto.timingSafeEqual(expectedBuf, macBuf)) {
    return false
  }

  const age = Date.now() - Number(issuedAt)
  return age >= 0 && age <= COOKIE_MAX_AGE * 1000
}
