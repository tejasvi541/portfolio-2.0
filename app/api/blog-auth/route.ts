import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const COOKIE_NAME = "blog_admin_session"
const COOKIE_MAX_AGE = 60 * 60 * 24 // 24 hours

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const expected = process.env.BLOG_ADMIN_PASSWORD
  if (!expected) {
    return NextResponse.json({ authenticated: false, error: "Admin password not configured" }, { status: 200 })
  }
  const authenticated = token === "ok"
  return NextResponse.json({ authenticated })
}

export async function POST(request: NextRequest) {
  const expected = process.env.BLOG_ADMIN_PASSWORD
  if (!expected || expected.trim() === "") {
    return NextResponse.json(
      { success: false, error: "Admin password not configured on server" },
      { status: 503 }
    )
  }

  let body: { password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }

  const password = typeof body.password === "string" ? body.password : ""
  if (password !== expected) {
    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  })

  return NextResponse.json({ success: true })
}
