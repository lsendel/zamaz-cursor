export interface DocumentNode {
  id: string;
  name: string;
  type: 'folder' | 'document';
  path: string;
  parentId?: string;
  children?: DocumentNode[];
  metadata: {
    size: number;
    lastModified: Date;
    documentType: string;
    tags: string[];
    relevanceScore?: number;
    usageCount: number;
  };
  content?: {
    preview: string;
    fullText?: string;
    embeddings?: number[];
  };
}

export interface ContextState {
  includedNodes: Set<string>;
  pinnedNodes: Set<string>;
  excludedNodes: Set<string>;
  tokenUsage: {
    current: number;
    limit: number;
    breakdown: {
      pinned: number;
      selected: number;
      conversation: number;
    };
  };
}

export interface UserPreferences {
  view: {
    defaultExpansionLevel: number;
    sortBy: 'name' | 'date' | 'relevance' | 'size';
    viewMode: 'tree' | 'grid' | 'list';
    showMetadata: boolean;
  };
  behavior: {
    autoIncludeRelated: boolean;
    contextInclusionDefault: 'manual' | 'auto';
    enableAnimations: boolean;
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface UserRole {
  id: string;
  name: 'admin' | 'editor' | 'viewer';
  permissions: Permission[];
}

export interface Permission {
  resource: 'documents' | 'collections' | 'settings';
  actions: ('read' | 'write' | 'delete' | 'admin')[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  preferences: UserPreferences;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface SearchQuery {
  query: string;
  filters: {
    documentType?: string[];
    tags?: string[];
    dateRange?: {
      start: Date;
      end: Date;
    };
    sizeRange?: {
      min: number;
      max: number;
    };
  };
  sortBy: 'relevance' | 'date' | 'name' | 'size';
  sortOrder: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  nodes: DocumentNode[];
  totalCount: number;
  facets: {
    documentTypes: { [key: string]: number };
    tags: { [key: string]: number };
  };
  suggestions?: string[];
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  nodeIds: string[];
  isSmartCollection: boolean;
  rules?: CollectionRule[];
  ownerId: string;
  isShared: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionRule {
  field: 'name' | 'type' | 'tags' | 'size' | 'lastModified';
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
  value: string | number | Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface SecurityEvent {
  timestamp: Date;
  ip: string;
  userAgent: string;
  method: string;
  path: string;
  userId?: string;
  eventType: 'authentication' | 'authorization' | 'data_access' | 'suspicious_activity';
  details?: any;
}