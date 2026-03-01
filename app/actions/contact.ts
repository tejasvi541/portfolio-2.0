"use server"

export async function sendContactEmail(data: {
  name: string
  email: string
  message: string
}) {
  const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    return { success: false, error: "Email service is not configured." }
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name: data.name,
          email: data.email,
          message: data.message,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return { success: false, error: errorText || "Failed to send email." }
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || "Something went wrong." }
  }
}
