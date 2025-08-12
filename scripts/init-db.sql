-- Initialize Knowledge Tree Database
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('folder', 'document')),
    path TEXT NOT NULL UNIQUE,
    parent_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    metadata JSONB NOT NULL DEFAULT '{}',
    content_preview TEXT,
    full_content TEXT,
    embeddings VECTOR(768), -- Requires pgvector extension
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_documents_parent_id ON documents(parent_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);
CREATE INDEX IF NOT EXISTS idx_documents_path ON documents(path);
CREATE INDEX IF NOT EXISTS idx_documents_metadata ON documents USING GIN(metadata);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL UNIQUE,
    preferences JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Context sessions table
CREATE TABLE IF NOT EXISTS context_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    session_name VARCHAR(255),
    included_nodes JSONB NOT NULL DEFAULT '[]',
    pinned_nodes JSONB NOT NULL DEFAULT '[]',
    excluded_nodes JSONB NOT NULL DEFAULT '[]',
    token_usage JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_context_sessions_user_id ON context_sessions(user_id);

-- Collections table
CREATE TABLE IF NOT EXISTS collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id VARCHAR(255) NOT NULL,
    document_ids JSONB NOT NULL DEFAULT '[]',
    is_smart BOOLEAN DEFAULT FALSE,
    smart_criteria JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_collections_user_id ON collections(user_id);

-- Usage analytics table
CREATE TABLE IF NOT EXISTS usage_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    metadata JSONB DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_usage_analytics_user_id ON usage_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_document_id ON usage_analytics(document_id);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_timestamp ON usage_analytics(timestamp);

-- Insert sample data
INSERT INTO documents (id, name, type, path, metadata, content_preview) VALUES
('11111111-1111-1111-1111-111111111111', 'Project Documentation', 'folder', '/docs', 
 '{"tags": ["documentation"], "size": 3072, "lastModified": "2024-01-20T00:00:00Z", "documentType": "folder", "usageCount": 68}',
 NULL),
('22222222-2222-2222-2222-222222222222', 'Getting Started.md', 'document', '/docs/getting-started.md',
 '{"tags": ["documentation", "guide"], "size": 1024, "lastModified": "2024-01-15T00:00:00Z", "documentType": "markdown", "usageCount": 45}',
 'This guide will help you get started with the Interactive Knowledge Tree...'),
('33333333-3333-3333-3333-333333333333', 'API Reference', 'folder', '/docs/api',
 '{"tags": ["api"], "size": 2048, "lastModified": "2024-01-20T00:00:00Z", "documentType": "folder", "usageCount": 23}',
 NULL),
('44444444-4444-4444-4444-444444444444', 'Authentication.md', 'document', '/docs/api/auth.md',
 '{"tags": ["api", "authentication"], "size": 2048, "lastModified": "2024-01-20T00:00:00Z", "documentType": "markdown", "usageCount": 23}',
 'Learn how to authenticate with the API using JWT tokens...');

-- Set parent relationships
UPDATE documents SET parent_id = '11111111-1111-1111-1111-111111111111' WHERE id = '22222222-2222-2222-2222-222222222222';
UPDATE documents SET parent_id = '11111111-1111-1111-1111-111111111111' WHERE id = '33333333-3333-3333-3333-333333333333';
UPDATE documents SET parent_id = '33333333-3333-3333-3333-333333333333' WHERE id = '44444444-4444-4444-4444-444444444444';