# Noto Waitlist App

A responsive waitlist application built with Next.js 15, TypeScript, and Tailwind CSS. This app captures user interest and collects waitlist signups for the upcoming Noto application.

## Features

- 📱 Fully responsive design (mobile, tablet, desktop)
- ✨ Modern, clean UI with shadcn/ui components
- 📊 Google Sheets integration for waitlist management
- ✅ Email validation and duplicate prevention
- 🚀 Built with Next.js App Router and TypeScript
- 🎨 Styled with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Google Service Account with Sheets API access

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update `GOOGLE_SPREADSHEET_ID` with your Google Sheets ID

4. Add your Google Service Account credentials:
   - Place your service account JSON file as `noto-waiting-list.json` in the root directory
   - Ensure the service account has access to your Google Sheet

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Documentation

### POST /api/waiting-list

Adds an email to the waitlist in Google Sheets.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "You have successfully joined the waitlist!"
}
```

**Error Responses:**
- `400`: Invalid email format or missing email
- `409`: Email already exists on waitlist
- `500`: Server error

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── waiting-list/  # Waitlist API endpoint
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                  # Utility functions
│   ├── utils.ts          # Tailwind utilities
│   └── google-sheets.ts  # Google Sheets helpers
└── public/               # Static assets
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
