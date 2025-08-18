import { useContextStore } from '@/stores/contextStore'
import { useTreeStore } from '@/stores/treeStore'
import { TrashIcon, PinIcon } from '@heroicons/react/24/outline'

export function ContextView() {
  const {
    includedNodes,
    pinnedNodes,
    excludedNodes,
    tokenUsage,
    togglePinned,
    toggleIncluded,
    removeFromExcluded,
    clearContext,
    getContextSummary,
  } = useContextStore()

  const { nodes } = useTreeStore()
  const summary = getContextSummary()

  const getNodeName = (nodeId: string) => {
    const node = nodes.get(nodeId)
    return node?.name || `Node ${nodeId}`
  }

  const tokenUsagePercentage = (tokenUsage.current / tokenUsage.limit) * 100

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Context Manager</h1>
            <p className="text-gray-600 mt-1">
              Manage which documents are included in your AI context
            </p>
          </div>
          <button
            onClick={clearContext}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {/* Token Usage Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Token Usage</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Current Usage:</span>
              <span className="font-medium">{tokenUsage.current.toLocaleString()} / {tokenUsage.limit.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  tokenUsagePercentage > 90 
                    ? 'bg-red-500' 
                    : tokenUsagePercentage > 70 
                    ? 'bg-yellow-500' 
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(tokenUsagePercentage, 100)}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-xs text-gray-500">
              <div>Pinned: {tokenUsage.breakdown.pinned}</div>
              <div>Selected: {tokenUsage.breakdown.selected}</div>
              <div>Conversation: {tokenUsage.breakdown.conversation}</div>
            </div>
          </div>
        </div>

        {/* Context Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Context Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{summary.totalNodes}</div>
              <div className="text-sm text-gray-500">Total Nodes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{summary.pinnedCount}</div>
              <div className="text-sm text-gray-500">Pinned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{summary.includedCount}</div>
              <div className="text-sm text-gray-500">Included</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{summary.excludedCount}</div>
              <div className="text-sm text-gray-500">Excluded</div>
            </div>
          </div>
        </div>

        {/* Pinned Documents */}
        {pinnedNodes.size > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <PinIcon className="w-5 h-5 mr-2 text-green-600" />
              Pinned Documents
            </h2>
            <div className="space-y-2">
              {Array.from(pinnedNodes).map((nodeId) => (
                <div key={nodeId} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                  <span className="font-medium text-green-800">{getNodeName(nodeId)}</span>
                  <button
                    onClick={() => togglePinned(nodeId)}
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Included Documents */}
        {includedNodes.size > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Included Documents</h2>
            <div className="space-y-2">
              {Array.from(includedNodes).filter(nodeId => !pinnedNodes.has(nodeId)).map((nodeId) => (
                <div key={nodeId} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <span className="font-medium text-blue-800">{getNodeName(nodeId)}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => togglePinned(nodeId)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Pin document"
                    >
                      <PinIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleIncluded(nodeId)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Remove from context"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Excluded Documents */}
        {excludedNodes.size > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Excluded Documents</h2>
            <div className="space-y-2">
              {Array.from(excludedNodes).map((nodeId) => (
                <div key={nodeId} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md">
                  <span className="font-medium text-red-800">{getNodeName(nodeId)}</span>
                  <button
                    onClick={() => removeFromExcluded(nodeId)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Remove from excluded"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {pinnedNodes.size === 0 && includedNodes.size === 0 && excludedNodes.size === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500 text-lg">No documents in context</p>
            <p className="text-gray-400 mt-2">Select documents from the tree view to add them to your context</p>
          </div>
        )}
      </div>
    </div>
  )
}