import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import keys from "@/noto-waiting-list.json";

// Types for better type safety
interface WaitlistRequest {
  email: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

// Constants
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID!;
const SHEET_RANGE = "Sheet1!A:B";

// Email validation helper
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    // Parse and validate request body
    const body: WaitlistRequest = await req.json();

    if (!body || !body.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const { email } = body;

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    // Create Google Sheets client
    const auth = await google.auth.getClient({
      projectId: keys.project_id,
      credentials: {
        type: "service_account",
        private_key: keys.private_key,
        client_email: keys.client_email,
        client_id: keys.client_id,
        token_url: keys.token_uri,
        universe_domain: "googleapis.com",
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
    const createdAt = new Date().toISOString();
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
