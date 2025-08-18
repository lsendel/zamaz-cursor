import { Router } from 'express'
import { ApiResponse } from '@shared/types'

export const contextRoutes = Router()

// Mock context store
interface ContextItem {
  id: string
  name: string
  type: 'document' | 'folder'
  path: string
  status: 'included' | 'pinned' | 'excluded'
  tokenUsage: number
  addedAt: Date
}

let mockContext: ContextItem[] = []

// GET /api/context - Get current context
contextRoutes.get('/', (req, res) => {
  const totalTokens = mockContext.reduce((sum, item) => sum + item.tokenUsage, 0)
  
  const response: ApiResponse<{
    items: ContextItem[]
    summary: {
      totalItems: number
      totalTokens: number
      pinnedCount: number
      includedCount: number
      excludedCount: number
    }
  }> = {
    success: true,
    data: {
      items: mockContext,
      summary: {
        totalItems: mockContext.length,
        totalTokens,
        pinnedCount: mockContext.filter(item => item.status === 'pinned').length,
        includedCount: mockContext.filter(item => item.status === 'included').length,
        excludedCount: mockContext.filter(item => item.status === 'excluded').length,
      },
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  }
  res.json(response)
})

// POST /api/context - Add document to context
contextRoutes.post('/', (req, res) => {
  const { documentId, name, type, path, status = 'included' } = req.body

  if (!documentId || !name || !type || !path) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'MISSING_REQUIRED_FIELDS',
        message: 'documentId, name, type, and path are required',
      },
    }
    return res.status(400).json(response)
  }

  // Check if document is already in context
  const existingIndex = mockContext.findIndex(item => item.id === documentId)
  
  if (existingIndex !== -1) {
    // Update existing item
    mockContext[existingIndex] = {
      ...mockContext[existingIndex],
      status,
      addedAt: new Date(),
    }
  } else {
    // Add new item
    const newItem: ContextItem = {
      id: documentId,
      name,
      type: type as 'document' | 'folder',
      path,
      status: status as 'included' | 'pinned' | 'excluded',
      tokenUsage: Math.floor(Math.random() * 500) + 100, // Mock token usage
      addedAt: new Date(),
    }
    mockContext.push(newItem)
  }

  const response: ApiResponse<ContextItem> = {
    success: true,
    data: mockContext.find(item => item.id === documentId)!,
    meta: {
      timestamp: new Date().toISOString(),
    },
  }
  res.json(response)
})

// PUT /api/context/:id - Update context item status
contextRoutes.put('/:id', (req, res) => {
  const { id } = req.params
  const { status } = req.body

  if (!status || !['included', 'pinned', 'excluded'].includes(status)) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'INVALID_STATUS',
        message: 'Status must be one of: included, pinned, excluded',
      },
    }
    return res.status(400).json(response)
  }

  const itemIndex = mockContext.findIndex(item => item.id === id)
  
  if (itemIndex === -1) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'CONTEXT_ITEM_NOT_FOUND',
        message: `Context item with ID ${id} not found`,
      },
    }
    return res.status(404).json(response)
  }

  mockContext[itemIndex].status = status
  mockContext[itemIndex].addedAt = new Date()

  const response: ApiResponse<ContextItem> = {
    success: true,
    data: mockContext[itemIndex],
    meta: {
      timestamp: new Date().toISOString(),
    },
  }
  res.json(response)
})

// DELETE /api/context/:id - Remove document from context
contextRoutes.delete('/:id', (req, res) => {
  const { id } = req.params
  
  const itemIndex = mockContext.findIndex(item => item.id === id)
  
  if (itemIndex === -1) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'CONTEXT_ITEM_NOT_FOUND',
        message: `Context item with ID ${id} not found`,
      },
    }
    return res.status(404).json(response)
  }

  const removedItem = mockContext.splice(itemIndex, 1)[0]

  const response: ApiResponse<ContextItem> = {
    success: true,
    data: removedItem,
    meta: {
      timestamp: new Date().toISOString(),
    },
  }
  res.json(response)
})

// DELETE /api/context - Clear all context
contextRoutes.delete('/', (req, res) => {
  const clearedCount = mockContext.length
  mockContext = []

  const response: ApiResponse<{ clearedCount: number }> = {
    success: true,
    data: { clearedCount },
    meta: {
      timestamp: new Date().toISOString(),
    },
  }
  res.json(response)
})

// GET /api/context/export - Export context for AI consumption
contextRoutes.get('/export', (req, res) => {
  const { format = 'json' } = req.query
  
  const includedItems = mockContext.filter(item => 
    item.status === 'included' || item.status === 'pinned'
  )

  if (format === 'text') {
    const textExport = includedItems
      .map(item => `${item.name} (${item.path})`)
      .join('\n')
    
    res.setHeader('Content-Type', 'text/plain')
    res.send(textExport)
  } else {
    const response: ApiResponse<ContextItem[]> = {
      success: true,
      data: includedItems,
      meta: {
        exportFormat: format,
        totalItems: includedItems.length,
        totalTokens: includedItems.reduce((sum, item) => sum + item.tokenUsage, 0),
        timestamp: new Date().toISOString(),
      },
    }
    res.json(response)
  }
})