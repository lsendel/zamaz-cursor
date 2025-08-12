import { Router } from 'express'
import { DocumentNode } from '@shared/types/document'

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
    ],
    metadata: {
      size: 3072,
      lastModified: new Date('2024-01-20'),
      documentType: 'folder',
      tags: ['documentation'],
      usageCount: 68,
    },
  },
]

// GET /api/documents - Get all documents
documentRoutes.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: mockDocuments,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch documents',
        code: 'FETCH_ERROR',
      },
    })
  }
})

// GET /api/documents/:id - Get specific document
documentRoutes.get('/:id', (req, res) => {
  try {
    const { id } = req.params
    
    function findDocument(docs: DocumentNode[], targetId: string): DocumentNode | null {
      for (const doc of docs) {
        if (doc.id === targetId) return doc
        if (doc.children) {
          const found = findDocument(doc.children, targetId)
          if (found) return found
        }
      }
      return null
    }
    
    const document = findDocument(mockDocuments, id)
    
    if (!document) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Document not found',
          code: 'NOT_FOUND',
        },
      })
    }
    
    res.json({
      success: true,
      data: document,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch document',
        code: 'FETCH_ERROR',
      },
    })
  }
})

// POST /api/documents/:id/content - Get full document content
documentRoutes.post('/:id/content', (req, res) => {
  try {
    const { id } = req.params
    
    // Mock full content response
    const mockContent = {
      id,
      content: `# Full content for document ${id}\n\nThis would be the complete document content...`,
      embeddings: Array.from({ length: 768 }, () => Math.random()),
    }
    
    res.json({
      success: true,
      data: mockContent,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch document content',
        code: 'CONTENT_ERROR',
      },
    })
  }
})