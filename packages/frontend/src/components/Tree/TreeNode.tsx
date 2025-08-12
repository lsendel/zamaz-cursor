import { useState } from 'react'
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Pin, Eye, EyeOff } from 'lucide-react'
import { DocumentNode } from '@shared/types/document'
import { motion } from 'framer-motion'
import { useContextStore } from '@/stores/contextStore'

interface TreeNodeProps {
  node: DocumentNode
  level: number
  isExpanded?: boolean
  isSelected?: boolean
  onToggleExpanded?: () => void
  onToggleSelected?: () => void
}

export function TreeNode({
  node,
  level,
  isExpanded = false,
  isSelected = false,
  onToggleExpanded,
  onToggleSelected,
}: TreeNodeProps) {
  const { includedNodes, pinnedNodes, excludedNodes, toggleIncluded, togglePinned, toggleExcluded } = useContextStore()
  const [isHovered, setIsHovered] = useState(false)

  const hasChildren = node.children && node.children.length > 0
  const isIncluded = includedNodes.has(node.id)
  const isPinned = pinnedNodes.has(node.id)
  const isExcluded = excludedNodes.has(node.id)

  const indentStyle = {
    paddingLeft: `${level * 20 + 12}px`,
  }

  const getIcon = () => {
    if (node.type === 'folder') {
      return isExpanded ? (
        <FolderOpen className="h-4 w-4 text-blue-500" />
      ) : (
        <Folder className="h-4 w-4 text-blue-600" />
      )
    }
    return <File className="h-4 w-4 text-gray-500" />
  }

  const getChevron = () => {
    if (!hasChildren) return <div className="w-4 h-4" />
    return isExpanded ? (
      <ChevronDown className="h-4 w-4 text-gray-400" />
    ) : (
      <ChevronRight className="h-4 w-4 text-gray-400" />
    )
  }

  return (
    <div>
      <div
        className={`tree-node group relative ${isSelected ? 'selected' : ''} ${
          isExcluded ? 'opacity-50' : ''
        }`}
        style={indentStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onToggleSelected}
      >
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleExpanded?.()
            }}
            className="flex-shrink-0 p-0.5 hover:bg-gray-200 rounded"
          >
            {getChevron()}
          </button>

          <div className="flex-shrink-0">{getIcon()}</div>

          <span className="flex-1 truncate text-sm font-medium text-gray-900">
            {node.name}
          </span>

          {node.metadata.tags.length > 0 && (
            <div className="flex-shrink-0 flex space-x-1">
              {node.metadata.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"
                >
                  {tag}
                </span>
              ))}
              {node.metadata.tags.length > 2 && (
                <span className="text-xs text-gray-400">+{node.metadata.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>

        {(isHovered || isIncluded || isPinned || isExcluded) && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-1 ml-2"
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                togglePinned(node.id)
              }}
              className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                isPinned ? 'text-yellow-600' : 'text-gray-400'
              }`}
              title={isPinned ? 'Unpin from context' : 'Pin to context'}
            >
              <Pin className="h-3 w-3" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleIncluded(node.id)
              }}
              className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                isIncluded ? 'text-green-600' : 'text-gray-400'
              }`}
              title={isIncluded ? 'Remove from context' : 'Include in context'}
            >
              <Eye className="h-3 w-3" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleExcluded(node.id)
              }}
              className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                isExcluded ? 'text-red-600' : 'text-gray-400'
              }`}
              title={isExcluded ? 'Include in context' : 'Exclude from context'}
            >
              <EyeOff className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </div>

      {hasChildren && isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {node.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              isExpanded={false} // You'd get this from your tree store
              isSelected={false} // You'd get this from your tree store
              onToggleExpanded={() => {}} // You'd implement this
              onToggleSelected={() => {}} // You'd implement this
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}