

// app/api/keep-alive/route.ts

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Required for cron/background jobs

export async function GET() {
  try {
    // Simple query to keep Neon alive
    const result = await sql`SELECT 1`;
    return NextResponse.json(
      { success: true, message: "Neon DB pinged successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to ping Neon DB", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}


// http://localhost:3000/api/keep-alive

// Key: POSTGRES_URL
// Value: Your_Neon_DB_Connection_String (from Neon dashboard)