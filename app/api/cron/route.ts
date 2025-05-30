// app/api/cron/route.ts
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
    }
    const client = await clientPromise;
    const collection = client.db('turl-db').collection('redirects');

    // Get the demo entry (the one with Rick Roll video)
    const demoEntry = await collection.findOne({
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    });

    // Calculate the date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Delete all entries older than 30 days, excluding the demo entry
    const result = await collection.deleteMany({
      lastVisit: { $lt: thirtyDaysAgo },
      _id: { $ne: demoEntry?._id } // Exclude the demo entry
    });

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to cleanup old redirects' },
      { status: 500 }
    );
  }
}
