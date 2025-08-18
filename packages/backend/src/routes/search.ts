import { Router } from 'express'
import { DocumentNode } from '@shared/types/document'
import { ApiResponse } from '@shared/types'

export const searchRoutes = Router()

// Mock search function
function searchDocuments(query: string, filters?: any): DocumentNode[] {
  // This is a simple mock implementation
  // In a real application, this would integrate with Elasticsearch or similar
  const mockResults: DocumentNode[] = [
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
        // highlight: 'This guide will help you get started with the Interactive Knowledge Tree...',
      },
    },
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
        // highlight: 'Learn how to authenticate with the API using JWT tokens...',
      },
    },
  ]

  if (!query || query.trim() === '') {
    return []
  }

  // Simple filter based on query
  return mockResults.filter(doc => 
    doc.name.toLowerCase().includes(query.toLowerCase()) ||
    doc.content?.preview?.toLowerCase().includes(query.toLowerCase()) ||
    doc.metadata?.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  )
}

// GET /api/search?q=query&type=document&tags=tag1,tag2
searchRoutes.get('/', (req, res) => {
  const { q: query, type, tags, limit = '10', offset = '0' } = req.query

  if (!query || typeof query !== 'string') {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'MISSING_QUERY',
        message: 'Search query is required',
      },
    }
    return res.status(400).json(response)
  }

  const filters = {
    type: type as string,
    tags: typeof tags === 'string' ? tags.split(',') : [],
  }

  const results = searchDocuments(query, filters)
  const limitNum = parseInt(limit as string, 10)
  const offsetNum = parseInt(offset as string, 10)
  
  const paginatedResults = results.slice(offsetNum, offsetNum + limitNum)

  const response: ApiResponse<DocumentNode[]> = {
    success: true,
    data: paginatedResults,
    meta: {
      total: results.length,
      limit: limitNum,
      offset: offsetNum,
      query,
      filters,
      timestamp: new Date().toISOString(),
    },
  }
  res.json(response)
})

// POST /api/search/advanced - Advanced search with complex filters
searchRoutes.post('/advanced', (req, res) => {
  const { query, filters, sort, limit = 10, offset = 0 } = req.body

  if (!query) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'MISSING_QUERY',
        message: 'Search query is required',
      },
    }
    return res.status(400).json(response)
  }

  // Mock advanced search implementation
  const results = searchDocuments(query, filters)
  const paginatedResults = results.slice(offset, offset + limit)

  const response: ApiResponse<DocumentNode[]> = {
    success: true,
    data: paginatedResults,
    meta: {
      total: results.length,
      limit,
      offset,
      query,
      filters,
      sort,
      timestamp: new Date().toISOString(),
    },
  }
  res.json(response)
})

// GET /api/search/suggestions?q=partial_query
searchRoutes.get('/suggestions', (req, res) => {
  const { q: query } = req.query

  if (!query || typeof query !== 'string') {
    const response: ApiResponse<string[]> = {
      success: true,
      data: [],
      meta: {
        timestamp: new Date().toISOString(),
      },
    }
    return res.json(response)
  }

  // Mock suggestions
  const suggestions = [
    'Getting Started',
    'Authentication',
    'API Reference',
    'Documentation',
    'TypeScript',
    'React Components',
  ].filter(suggestion => 
    suggestion.toLowerCase().includes(query.toLowerCase())
  )

  const response: ApiResponse<string[]> = {
    success: true,
    data: suggestions,
    meta: {
      query,
      timestamp: new Date().toISOString(),
    },
  }
  res.json(response)
})