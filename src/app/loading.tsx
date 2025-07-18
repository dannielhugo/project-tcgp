export default function HomeLoading() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="card max-w-96 min-w-64 bg-white shadow-md rounded-lg p-4 animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
    </main>
  );
}