import { useState } from 'react'
import { TreeNode } from './TreeNode'
import { useTreeStore } from '@/stores/treeStore'
import { DocumentNode } from '@shared/types/document'

// Mock data for demonstration
const mockData: DocumentNode[] = [
  {
    id: '1',
    name: 'Project Documentation',
    type: 'folder',
    path: '/docs',
    children: [
      {
        id: '2',
        name: 'Getting Started.md',
        type: 'document',
        path: '/docs/getting-started.md',
        parentId: '1',
        metadata: {
          size: 1024,
          lastModified: new Date('2024-01-15'),
          documentType: 'markdown',
          tags: ['documentation', 'guide'],
          usageCount: 45,
        },
        content: {
          preview: 'This guide will help you get started with the Interactive Knowledge Tree...',
        },
      },
      {
        id: '3',
        name: 'API Reference',
        type: 'folder',
        path: '/docs/api',
        parentId: '1',
        children: [
          {
            id: '4',
            name: 'Authentication.md',
            type: 'document',
            path: '/docs/api/auth.md',
            parentId: '3',
            metadata: {
              size: 2048,
              lastModified: new Date('2024-01-20'),
              documentType: 'markdown',
              tags: ['api', 'authentication'],
              usageCount: 23,
            },
            content: {
              preview: 'Learn how to authenticate with the API using JWT tokens...',
            },
          },
        ],
        metadata: {
          size: 2048,
          lastModified: new Date('2024-01-20'),
          documentType: 'folder',
          tags: ['api'],
          usageCount: 23,
        },
      },
    ],
    metadata: {
      size: 3072,
      lastModified: new Date('2024-01-20'),
      documentType: 'folder',
      tags: ['documentation'],
      usageCount: 68,
    },
  },
  {
    id: '5',
    name: 'Source Code',
    type: 'folder',
    path: '/src',
    children: [
      {
        id: '6',
        name: 'components',
        type: 'folder',
        path: '/src/components',
        parentId: '5',
        children: [
          {
            id: '7',
            name: 'TreeNode.tsx',
            type: 'document',
            path: '/src/components/TreeNode.tsx',
            parentId: '6',
            metadata: {
              size: 4096,
              lastModified: new Date('2024-01-22'),
              documentType: 'typescript',
              tags: ['react', 'component'],
              usageCount: 12,
            },
            content: {
              preview: 'import React from "react"; export function TreeNode({ node }) { ...',
            },
          },
        ],
        metadata: {
          size: 4096,
          lastModified: new Date('2024-01-22'),
          documentType: 'folder',
          tags: ['components'],
          usageCount: 12,
        },
      },
    ],
    metadata: {
      size: 4096,
      lastModified: new Date('2024-01-22'),
      documentType: 'folder',
      tags: ['source'],
      usageCount: 12,
    },
  },
]

export function TreeView() {
  const { nodes, expandedNodes, selectedNodes, toggleExpanded, toggleSelected } = useTreeStore()
  const [data] = useState<DocumentNode[]>(mockData)

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Tree</h1>
        <p className="text-gray-600 mt-1">
          Navigate and explore your document hierarchy
        </p>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {data.map((node) => (
                <TreeNode
                  key={node.id}
                  node={node}
                  level={0}
                  isExpanded={expandedNodes.has(node.id)}
                  isSelected={selectedNodes.has(node.id)}
                  onToggleExpanded={() => toggleExpanded(node.id)}
                  onToggleSelected={() => toggleSelected(node.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}