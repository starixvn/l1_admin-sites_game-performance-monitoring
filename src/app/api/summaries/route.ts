import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import { DailySummary } from '@/models/DailySummary';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy') || 'time';
    const order = searchParams.get('order') || 'desc';

    await connectDB();

    const summaries = await DailySummary.aggregate([
      {
        $sort: {
          [sortBy]: order === 'desc' ? -1 : 1
        }
      },
      {
        $limit: 100 // Adjust limit as needed
      }
    ]);

    return NextResponse.json(summaries);
  } catch (error) {
    console.error('Failed to fetch summaries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch summaries' },
      { status: 500 }
    );
  }
} 