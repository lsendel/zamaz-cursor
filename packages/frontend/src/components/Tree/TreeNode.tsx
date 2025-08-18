import { useState } from 'react'
import { ChevronRightIcon, ChevronDownIcon, DocumentIcon, FolderIcon, FolderOpenIcon } from '@heroicons/react/24/outline'
import { DocumentNode } from '@shared/types/document'

interface TreeNodeProps {
  node: DocumentNode
  level: number
  isExpanded: boolean
  isSelected: boolean
  onToggleExpanded: () => void
  onToggleSelected: () => void
}

export function TreeNode({
  node,
  level,
  isExpanded,
  isSelected,
  onToggleExpanded,
  onToggleSelected,
}: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0
  const paddingLeft = `${level * 20 + 12}px`

  const handleToggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasChildren) {
      onToggleExpanded()
    }
  }

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleSelected()
  }

  const IconComponent = node.type === 'folder' 
    ? (isExpanded ? FolderOpenIcon : FolderIcon)
    : DocumentIcon

  return (
    <div>
      <div
        className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 border-l-2 transition-colors ${
          isSelected 
            ? 'bg-blue-50 border-l-blue-500 text-blue-700' 
            : 'border-l-transparent'
        }`}
        style={{ paddingLeft }}
        onClick={handleSelect}
      >
        <div className="flex items-center flex-1 min-w-0">
          {hasChildren && (
            <button
              className="p-1 mr-1 hover:bg-gray-200 rounded transition-colors"
              onClick={handleToggleExpanded}
            >
              {isExpanded ? (
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 text-gray-500" />
              )}
            </button>
          )}
          
          {!hasChildren && <div className="w-6" />}
          
          <IconComponent className={`w-5 h-5 mr-3 flex-shrink-0 ${
            node.type === 'folder' ? 'text-blue-500' : 'text-gray-500'
          }`} />
          
          <span className="truncate text-sm font-medium text-gray-900">
            {node.name}
          </span>
        </div>

        {node.metadata && (
          <div className="flex items-center space-x-2 text-xs text-gray-500 ml-2">
            {node.metadata.usageCount !== undefined && (
              <span className="bg-gray-100 px-2 py-1 rounded">
                {node.metadata.usageCount} uses
              </span>
            )}
            {node.metadata.size !== undefined && (
              <span>
                {(node.metadata.size / 1024).toFixed(1)}KB
              </span>
            )}
          </div>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              isExpanded={isExpanded}
              isSelected={isSelected}
              onToggleExpanded={onToggleExpanded}
              onToggleSelected={onToggleSelected}
            />
          ))}
        </div>
      )}
    </div>
  )
}