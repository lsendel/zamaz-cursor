import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { DocumentNode } from '@shared/types/document'

interface TreeState {
  nodes: Map<string, DocumentNode>
  selectedNodes: Set<string>
  expandedNodes: Set<string>
  focusedNode: string | null

  // Actions
  setNodes: (nodes: DocumentNode[]) => void
  selectNode: (nodeId: string) => void
  selectNodes: (nodeIds: string[]) => void
  deselectNode: (nodeId: string) => void
  deselectAll: () => void
  toggleSelected: (nodeId: string) => void
  
  expandNode: (nodeId: string) => void
  collapseNode: (nodeId: string) => void
  toggleExpanded: (nodeId: string) => void
  expandAll: () => void
  collapseAll: () => void
  
  setFocusedNode: (nodeId: string | null) => void
  
  // Derived state getters
  getSelectedDocuments: () => DocumentNode[]
  getExpandedChildren: (nodeId: string) => DocumentNode[]
}

function flattenNodes(nodes: DocumentNode[]): Map<string, DocumentNode> {
  const map = new Map<string, DocumentNode>()
  
  function traverse(nodeList: DocumentNode[]) {
    for (const node of nodeList) {
      map.set(node.id, node)
      if (node.children) {
        traverse(node.children)
      }
    }
  }
  
  traverse(nodes)
  return map
}

export const useTreeStore = create<TreeState>()(
  immer((set, get) => ({
    nodes: new Map(),
    selectedNodes: new Set(),
    expandedNodes: new Set(),
    focusedNode: null,

    setNodes: (nodes) =>
      set((state) => {
        state.nodes = flattenNodes(nodes)
      }),

    selectNode: (nodeId) =>
      set((state) => {
        state.selectedNodes.add(nodeId)
      }),

    selectNodes: (nodeIds) =>
      set((state) => {
        nodeIds.forEach((id) => state.selectedNodes.add(id))
      }),

    deselectNode: (nodeId) =>
      set((state) => {
        state.selectedNodes.delete(nodeId)
      }),

    deselectAll: () =>
      set((state) => {
        state.selectedNodes.clear()
      }),

    toggleSelected: (nodeId) =>
      set((state) => {
        if (state.selectedNodes.has(nodeId)) {
          state.selectedNodes.delete(nodeId)
        } else {
          state.selectedNodes.add(nodeId)
        }
      }),

    expandNode: (nodeId) =>
      set((state) => {
        state.expandedNodes.add(nodeId)
      }),

    collapseNode: (nodeId) =>
      set((state) => {
        state.expandedNodes.delete(nodeId)
      }),

    toggleExpanded: (nodeId) =>
      set((state) => {
        if (state.expandedNodes.has(nodeId)) {
          state.expandedNodes.delete(nodeId)
        } else {
          state.expandedNodes.add(nodeId)
        }
      }),

    expandAll: () =>
      set((state) => {
        state.nodes.forEach((node) => {
          if (node.children && node.children.length > 0) {
            state.expandedNodes.add(node.id)
          }
        })
      }),

    collapseAll: () =>
      set((state) => {
        state.expandedNodes.clear()
      }),

    setFocusedNode: (nodeId) =>
      set((state) => {
        state.focusedNode = nodeId
      }),

    getSelectedDocuments: () => {
      const { nodes, selectedNodes } = get()
      return Array.from(selectedNodes)
        .map((id) => nodes.get(id))
        .filter((node): node is DocumentNode => node !== undefined && node.type === 'document')
    },

    getExpandedChildren: (nodeId) => {
      const { nodes, expandedNodes } = get()
      const node = nodes.get(nodeId)
      if (!node || !expandedNodes.has(nodeId) || !node.children) {
        return []
      }
      return node.children
    },
  }))
)