import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { COOKIE_NAME, COOKIE_MAX_AGE, isAdminConfigured, checkPassword, signSession, verifySession } from "@/lib/blog-auth"

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!isAdminConfigured()) {
    return NextResponse.json({ authenticated: false, error: "Admin password not configured" }, { status: 200 })
  }
  return NextResponse.json({ authenticated: verifySession(token) })
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
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
  if (!checkPassword(password)) {
    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, signSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  })

  return NextResponse.json({ success: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  return NextResponse.json({ success: true })
}
