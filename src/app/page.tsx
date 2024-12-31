import { Suspense } from 'react';
import { connectDB } from '../utils/db';
import { DailySummary } from '../models/DailySummary';
import SummaryTable from '../components/SummaryTable/Table';
import Loading from '../components/UI/Loading';
import Error from '../components/UI/Error';

async function getData() {
  try {
    await connectDB();
    const summaries = await DailySummary.find()
      .sort({ time: -1 })
      .limit(100)
      .lean()
      .exec();

    // Ensure the data is serializable
    return JSON.parse(JSON.stringify(summaries));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Game Performance Monitor
            </h1>
            <Suspense fallback={<Loading />}>
              {data.length > 0 ? (
                <SummaryTable initialData={data} />
              ) : (
                <Error message="Failed to load data" />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
