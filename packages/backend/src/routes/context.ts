import { Router } from 'express'

export const contextRoutes = Router()

// GET /api/context - Get current context state
contextRoutes.get('/', (req, res) => {
  try {
    const mockContext = {
      includedNodes: [],
      pinnedNodes: [],
      excludedNodes: [],
      tokenUsage: {
        current: 0,
        limit: 8000,
        breakdown: {
          pinned: 0,
          selected: 0,
          conversation: 0,
        },
      },
    }
    
    res.json({
      success: true,
      data: mockContext,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch context',
        code: 'CONTEXT_ERROR',
      },
    })
  }
})

// POST /api/context/include - Include nodes in context
contextRoutes.post('/include', (req, res) => {
  try {
    const { nodeIds } = req.body
    
    // Mock response
    res.json({
      success: true,
      data: { included: nodeIds },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to include nodes',
        code: 'INCLUDE_ERROR',
      },
    })
  }
})

// POST /api/context/exclude - Exclude nodes from context
contextRoutes.post('/exclude', (req, res) => {
  try {
    const { nodeIds } = req.body
    
    // Mock response
    res.json({
      success: true,
      data: { excluded: nodeIds },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to exclude nodes',
        code: 'EXCLUDE_ERROR',
      },
    })
  }
})

// POST /api/context/pin - Pin nodes to context
contextRoutes.post('/pin', (req, res) => {
  try {
    const { nodeIds } = req.body
    
    // Mock response
    res.json({
      success: true,
      data: { pinned: nodeIds },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to pin nodes',
        code: 'PIN_ERROR',
      },
    })
  }
})

// DELETE /api/context - Clear all context
contextRoutes.delete('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: { message: 'Context cleared' },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to clear context',
        code: 'CLEAR_ERROR',
      },
    })
  }
})