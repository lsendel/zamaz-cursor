import { useContextStore } from '@/stores/contextStore'
import { useTreeStore } from '@/stores/treeStore'
import { Pin, Eye, EyeOff, Trash2, AlertTriangle } from 'lucide-react'

export function ContextView() {
  const { getContextSummary, clearContext, pinnedNodes, includedNodes, excludedNodes } = useContextStore()
  const { nodes } = useTreeStore()
  const summary = getContextSummary()

  const pinnedDocuments = Array.from(pinnedNodes).map(id => nodes.get(id)).filter(Boolean)
  const includedDocuments = Array.from(includedNodes).map(id => nodes.get(id)).filter(Boolean)
  const excludedDocuments = Array.from(excludedNodes).map(id => nodes.get(id)).filter(Boolean)

  const isOverLimit = summary.tokenUsage > summary.tokenLimit

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Context Management</h1>
            <p className="text-gray-600 mt-1">
              Manage which documents are included in your LLM context
            </p>
          </div>
          <button
            onClick={clearContext}
            className="flex items-center px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </button>
        </div>
      </div>

      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{summary.pinnedCount}</div>
            <div className="text-sm text-blue-600">Pinned</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{summary.includedCount}</div>
            <div className="text-sm text-green-600">Included</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{summary.excludedCount}</div>
            <div className="text-sm text-red-600">Excluded</div>
          </div>
          <div className={`p-4 rounded-lg ${isOverLimit ? 'bg-red-50' : 'bg-gray-50'}`}>
            <div className={`text-2xl font-bold ${isOverLimit ? 'text-red-600' : 'text-gray-600'}`}>
              {summary.tokenUsage}/{summary.tokenLimit}
            </div>
            <div className={`text-sm ${isOverLimit ? 'text-red-600' : 'text-gray-600'}`}>
              Tokens
            </div>
          </div>
        </div>

        {isOverLimit && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
            <div className="text-red-800">
              Token limit exceeded. Consider removing some documents from context.
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {pinnedDocuments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Pin className="h-5 w-5 text-yellow-600 mr-2" />
                Pinned Documents ({pinnedDocuments.length})
              </h3>
              <div className="space-y-2">
                {pinnedDocuments.map((node) => (
                  <div key={node.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{node.name}</div>
                      <div className="text-sm text-gray-600">{node.path}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                        Pinned
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {includedDocuments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Eye className="h-5 w-5 text-green-600 mr-2" />
                Included Documents ({includedDocuments.length})
              </h3>
              <div className="space-y-2">
                {includedDocuments.map((node) => (
                  <div key={node.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{node.name}</div>
                      <div className="text-sm text-gray-600">{node.path}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                        Included
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {excludedDocuments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <EyeOff className="h-5 w-5 text-red-600 mr-2" />
                Excluded Documents ({excludedDocuments.length})
              </h3>
              <div className="space-y-2">
                {excludedDocuments.map((node) => (
                  <div key={node.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{node.name}</div>
                      <div className="text-sm text-gray-600">{node.path}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                        Excluded
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {summary.totalNodes === 0 && (
            <div className="text-center text-gray-500 py-12">
              <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No documents in context</p>
              <p className="text-sm mt-2">Use the tree view to include documents in your context</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}