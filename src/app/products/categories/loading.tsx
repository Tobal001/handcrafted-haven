
// app/dashboard/categories/loading.tsx

export default function CategoriesLoadingSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 animate-pulse bg-gray-200 h-10 w-1/2 rounded"></h1>

      {/* Skeleton for Create Form */}
      <div className="mb-8 p-6 border rounded-lg shadow-md animate-pulse bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4 bg-gray-200 h-8 w-1/3 rounded"></h2>
        <div className="space-y-4">
          <div className="bg-gray-200 h-8 rounded w-full"></div>
          <div className="bg-gray-200 h-16 rounded w-full"></div>
          <div className="bg-gray-200 h-8 rounded w-full"></div>
          <div className="bg-blue-200 h-10 w-32 rounded"></div>
        </div>
      </div>

      {/* Skeleton for List of Existing Categories */}
      <div className="p-6 border rounded-lg shadow-md animate-pulse bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4 bg-gray-200 h-8 w-1/3 rounded"></h2>
        <ul className="space-y-2">
          {[1, 2, 3].map((i) => ( // Show a few skeleton items
            <li key={i} className="p-3 border rounded-md bg-gray-50 h-24 flex items-center justify-between">
              <div className="space-y-2 w-full">
                <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
                <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
              </div>
              <div className="flex space-x-2">
                <div className="bg-yellow-200 h-8 w-16 rounded"></div>
                <div className="bg-red-200 h-8 w-16 rounded"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}