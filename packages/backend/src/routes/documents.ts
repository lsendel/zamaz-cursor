import { Router } from 'express'
import { DocumentNode } from '@shared/types/document'
import { ApiResponse } from '@shared/types'

export const documentRoutes = Router()

// Mock data for development
const mockDocuments: DocumentNode[] = [
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

// GET /api/documents - Get all documents
documentRoutes.get('/', (req, res) => {
  const response: ApiResponse<DocumentNode[]> = {
    success: true,
    data: mockDocuments,
    meta: {
      total: mockDocuments.length,
      timestamp: new Date().toISOString(),
    },
  }
  res.json(response)
})

// GET /api/documents/:id - Get document by ID
documentRoutes.get('/:id', (req, res) => {
  const { id } = req.params
  
  function findDocumentById(documents: DocumentNode[], targetId: string): DocumentNode | null {
    for (const doc of documents) {
      if (doc.id === targetId) {
        return doc
      }
      if (doc.children) {
        const found = findDocumentById(doc.children, targetId)
        if (found) return found
      }
    }
    return null
  }

  const document = findDocumentById(mockDocuments, id)
  
  if (!document) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'DOCUMENT_NOT_FOUND',
        message: `Document with ID ${id} not found`,
      },
    }
    return res.status(404).json(response)
  }

  const response: ApiResponse<DocumentNode> = {
    success: true,
    data: document,
    meta: {
      timestamp: new Date().toISOString(),
    },
  }
  res.json(response)
})

// GET /api/documents/:id/content - Get document content
documentRoutes.get('/:id/content', (req, res) => {
  const { id } = req.params
  
  function findDocumentById(documents: DocumentNode[], targetId: string): DocumentNode | null {
    for (const doc of documents) {
      if (doc.id === targetId) {
        return doc
      }
      if (doc.children) {
        const found = findDocumentById(doc.children, targetId)
        if (found) return found
      }
    }
    return null
  }

  const document = findDocumentById(mockDocuments, id)
  
  if (!document) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'DOCUMENT_NOT_FOUND',
        message: `Document with ID ${id} not found`,
      },
    }
    return res.status(404).json(response)
  }

  if (document.type !== 'document') {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'NOT_A_DOCUMENT',
        message: `Resource with ID ${id} is not a document`,
      },
    }
    return res.status(400).json(response)
  }

  const response: ApiResponse<{ content: string; metadata: any }> = {
    success: true,
    data: {
      content: document.content?.full || document.content?.preview || '',
      metadata: document.metadata,
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  }
  res.json(response)
})