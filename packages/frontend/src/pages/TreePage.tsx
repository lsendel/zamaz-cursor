export default function TreePage() {
  return (
    <div className="h-full flex">
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">
            Interactive Knowledge Tree
          </h1>
          <p className="text-secondary-600 mb-8">
            Tree visualization component will be implemented in Phase 2 of the development plan.
          </p>
          <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-8">
            <div className="animate-pulse">
              <div className="h-4 bg-secondary-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-secondary-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-secondary-200 rounded w-2/3 mb-2"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-80 bg-white border-l border-secondary-200 p-6">
        <h3 className="font-semibold text-secondary-900 mb-4">Context Panel</h3>
        <div className="text-sm text-secondary-600">
          <p>Context management interface will be implemented in Phase 4.</p>
          <div className="mt-4 p-3 bg-secondary-50 rounded">
            <p className="text-xs">
              Token Usage: 0 / 4000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}