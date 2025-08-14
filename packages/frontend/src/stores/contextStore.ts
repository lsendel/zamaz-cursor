import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface ContextState {
  includedNodes: Set<string>
  pinnedNodes: Set<string>
  excludedNodes: Set<string>
  tokenUsage: {
    current: number
    limit: number
    breakdown: {
      pinned: number
      selected: number
      conversation: number
    }
  }

  // Actions
  includeNode: (nodeId: string) => void
  excludeNode: (nodeId: string) => void
  toggleIncluded: (nodeId: string) => void
  
  pinNode: (nodeId: string) => void
  unpinNode: (nodeId: string) => void
  togglePinned: (nodeId: string) => void
  
  removeFromExcluded: (nodeId: string) => void
  toggleExcluded: (nodeId: string) => void
  
  clearContext: () => void
  setTokenLimit: (limit: number) => void
  updateTokenUsage: (usage: Partial<ContextState['tokenUsage']['breakdown']>) => void
  
  // Derived getters
  getContextNodes: () => string[]
  isWithinTokenLimit: () => boolean
  getContextSummary: () => {
    totalNodes: number
    pinnedCount: number
    includedCount: number
    excludedCount: number
    tokenUsage: number
    tokenLimit: number
  }
}

export const useContextStore = create<ContextState>()(
  immer((set, get) => ({
    includedNodes: new Set(),
    pinnedNodes: new Set(),
    excludedNodes: new Set(),
    tokenUsage: {
      current: 0,
      limit: 8000,
      breakdown: {
        pinned: 0,
        selected: 0,
        conversation: 0,
      },
    },

    includeNode: (nodeId) =>
      set((state) => {
        state.includedNodes.add(nodeId)
        state.excludedNodes.delete(nodeId)
      }),

    excludeNode: (nodeId) =>
      set((state) => {
        state.excludedNodes.add(nodeId)
        state.includedNodes.delete(nodeId)
        state.pinnedNodes.delete(nodeId)
      }),

    toggleIncluded: (nodeId) =>
      set((state) => {
        if (state.includedNodes.has(nodeId)) {
          state.includedNodes.delete(nodeId)
        } else {
          state.includedNodes.add(nodeId)
          state.excludedNodes.delete(nodeId)
        }
      }),

    pinNode: (nodeId) =>
      set((state) => {
        state.pinnedNodes.add(nodeId)
        state.includedNodes.add(nodeId)
        state.excludedNodes.delete(nodeId)
      }),

    unpinNode: (nodeId) =>
      set((state) => {
        state.pinnedNodes.delete(nodeId)
      }),

    togglePinned: (nodeId) =>
      set((state) => {
        if (state.pinnedNodes.has(nodeId)) {
          state.pinnedNodes.delete(nodeId)
        } else {
          state.pinnedNodes.add(nodeId)
          state.includedNodes.add(nodeId)
          state.excludedNodes.delete(nodeId)
        }
      }),

    removeFromExcluded: (nodeId) =>
      set((state) => {
        state.excludedNodes.delete(nodeId)
      }),

    toggleExcluded: (nodeId) =>
      set((state) => {
        if (state.excludedNodes.has(nodeId)) {
          state.excludedNodes.delete(nodeId)
        } else {
          state.excludedNodes.add(nodeId)
          state.includedNodes.delete(nodeId)
          state.pinnedNodes.delete(nodeId)
        }
      }),

    clearContext: () =>
      set((state) => {
        state.includedNodes.clear()
        state.pinnedNodes.clear()
        state.excludedNodes.clear()
        state.tokenUsage.current = 0
        state.tokenUsage.breakdown = {
          pinned: 0,
          selected: 0,
          conversation: 0,
        }
      }),

    setTokenLimit: (limit) =>
      set((state) => {
        state.tokenUsage.limit = limit
      }),

    updateTokenUsage: (usage) =>
      set((state) => {
        Object.assign(state.tokenUsage.breakdown, usage)
        state.tokenUsage.current =
          state.tokenUsage.breakdown.pinned +
          state.tokenUsage.breakdown.selected +
          state.tokenUsage.breakdown.conversation
      }),

    getContextNodes: () => {
      const { includedNodes, pinnedNodes } = get()
      return Array.from(new Set([...includedNodes, ...pinnedNodes]))
    },

    isWithinTokenLimit: () => {
      const { tokenUsage } = get()
      return tokenUsage.current <= tokenUsage.limit
    },

    getContextSummary: () => {
      const { includedNodes, pinnedNodes, excludedNodes, tokenUsage } = get()
      return {
        totalNodes: includedNodes.size + pinnedNodes.size,
        pinnedCount: pinnedNodes.size,
        includedCount: includedNodes.size,
        excludedCount: excludedNodes.size,
        tokenUsage: tokenUsage.current,
        tokenLimit: tokenUsage.limit,
      }
    },
  }))
)