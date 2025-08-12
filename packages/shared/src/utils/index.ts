import { DocumentNode } from '../types/index.js';

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const flattenTree = (nodes: DocumentNode[]): DocumentNode[] => {
  const result: DocumentNode[] = [];
  
  const traverse = (node: DocumentNode) => {
    result.push(node);
    if (node.children) {
      node.children.forEach(traverse);
    }
  };
  
  nodes.forEach(traverse);
  return result;
};

export const findNodeById = (nodes: DocumentNode[], id: string): DocumentNode | null => {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const getNodePath = (nodes: DocumentNode[], targetId: string): string[] => {
  const path: string[] = [];
  
  const findPath = (currentNodes: DocumentNode[], target: string, currentPath: string[]): boolean => {
    for (const node of currentNodes) {
      const newPath = [...currentPath, node.id];
      
      if (node.id === target) {
        path.push(...newPath);
        return true;
      }
      
      if (node.children && findPath(node.children, target, newPath)) {
        return true;
      }
    }
    return false;
  };
  
  findPath(nodes, targetId, []);
  return path;
};

export const sanitizeFileName = (filename: string): string => {
  // Remove or replace invalid characters for file names
  return filename
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '_')
    .replace(/\s+/g, '_')
    .toLowerCase();
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const calculateTokens = (text: string): number => {
  // Rough estimation: ~4 characters per token for English text
  return Math.ceil(text.length / 4);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};