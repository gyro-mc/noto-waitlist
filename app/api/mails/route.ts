import { EmailTemplate } from "@/components/EmailTemplate";
import { ErrorResponse, Resend } from "resend";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const messageSchema = z.object({
  email: z
    .email("Please provide a valid email address")
    .min(1, "Email is required"),
  name: z.string().min(3, "Name is too short").max(20, "Name is too long"),
  content: z
    .string()
    .min(5, "Message is too short to be submitted")
    .max(400, "Message is too long"),
});

interface ApiResponse {
  success: boolean;
  message: string;
  resendError?: ErrorResponse;
}
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json();
    const validation = messageSchema.safeParse(body);

    if (!validation.success) {
      const errorMessage = "Invalid input data";
      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
        },
        { status: 400 }
      );
    }

    const { email, name, content } = validation.data;

    const { data, error } = await resend.emails.send({
      from: "Noto Contact <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: `New Contact Form Submission from ${name}`,
      react: EmailTemplate({ firstName: "John" }),
    });
    console.log(data);
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email. Please try again later.",
          resendError: error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Your message has been sent successfully! We will respond as soon as possible.",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
