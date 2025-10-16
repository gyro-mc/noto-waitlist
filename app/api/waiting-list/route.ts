import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod schema for validation
const WaitlistSchema = z.object({
  email: z
    .email("Please provide a valid email address")
    .min(1, "Email is required"),
});


interface ApiResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

// Constants
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID!;
const SHEET_RANGE = "Sheet1!A:B";

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    // Parse request body
    const body = await req.json();

    // Validate with Zod
    const validation = WaitlistSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: ["invalid Email"],
        },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Create Google Sheets client
    const auth = await google.auth.getClient({
      projectId: process.env.GOOGLE_PROJECT_ID!,
      credentials: {
        type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE as "service_account",
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL!,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        token_url: process.env.GOOGLE_TOKEN_URI!,
        universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN!,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Check if email already exists
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_RANGE,
    });

    const rows = existingData.data.values || [];
    const emailExists = rows.some((row) => row[0] === email);

    if (emailExists) {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already on the waitlist",
        },
        { status: 409 }
      );
    }

    // Add new entry to the sheet
    const createdAt = new Date().toString();
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, createdAt]],
      },
    });

    return NextResponse.json({
      success: true,
      message: "You have successfully joined the waitlist!",
    });
  } catch (error) {
    console.error("Waitlist API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again in a few moments.",
      },
      { status: 500 }
    );
  }
}
