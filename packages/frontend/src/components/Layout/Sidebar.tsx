import { useState } from 'react'
import { ChevronLeft, ChevronRight, Filter, SortAsc } from 'lucide-react'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (isCollapsed) {
    return (
      <div className="w-12 border-r border-gray-200 bg-gray-50 flex flex-col items-center py-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <aside className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filter & Sort</h2>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Document Type
              </label>
              <select className="w-full input-field text-sm">
                <option value="">All Types</option>
                <option value="document">Documents</option>
                <option value="folder">Folders</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Tags
              </label>
              <input
                type="text"
                placeholder="Filter by tags..."
                className="w-full input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  className="input-field text-sm"
                />
                <input
                  type="date"
                  className="input-field text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort By
          </h3>
          <select className="w-full input-field text-sm">
            <option value="name">Name</option>
            <option value="date">Last Modified</option>
            <option value="relevance">Relevance</option>
            <option value="size">Size</option>
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            View Options
          </h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="ml-2 text-sm text-gray-600">Show metadata</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="ml-2 text-sm text-gray-600">Auto-expand folders</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded" />
              <span className="ml-2 text-sm text-gray-600">High contrast</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  )
}