export interface DocumentNode {
  id: string;
  name: string;
  type: 'folder' | 'document';
  path: string;
  parentId?: string;
  children?: DocumentNode[];
  metadata?: {
    size?: number;
    lastModified?: Date;
    documentType?: string;
    tags?: string[];
    relevanceScore?: number;
    usageCount?: number;
  };
  content?: {
    preview?: string;
    full?: string;
    fullText?: string;
    embeddings?: number[];
  };
}

export interface DocumentMetadata {
  size: number;
  lastModified: Date;
  documentType: string;
  tags: string[];
  relevanceScore?: number;
  usageCount: number;
  author?: string;
  version?: string;
}

export interface DocumentContent {
  preview: string;
  full?: string;
  summary?: string;
  embeddings?: number[];
  tokens?: number;
}