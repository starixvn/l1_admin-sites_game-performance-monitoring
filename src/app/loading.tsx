export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gray-100/50 backdrop-blur-sm flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="text-lg font-medium text-gray-700">Loading...</span>
      </div>
    </div>
  );
}
