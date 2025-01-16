import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

// Make this route always available
export const dynamic = 'force-dynamic';
export const revalidate = 0;
