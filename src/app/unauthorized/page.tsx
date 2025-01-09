import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Unauthorized Access
        </h1>
        <p className="text-gray-600">
          You need to be logged in to access this page.
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
