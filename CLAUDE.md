# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Interactive Knowledge Tree** - An advanced web application providing an interactive, visual interface for managing and exploring knowledge documents in RAG (Retrieval-Augmented Generation) systems.

## Technology Stack

- **Frontend**: React + TypeScript with Vite
- **Visualization**: D3.js, React Flow, Framer Motion
- **State Management**: Zustand + React Query
- **Styling**: Tailwind CSS + Headless UI
- **Backend**: Node.js + Express + PostgreSQL
- **Search**: Elasticsearch
- **Testing**: Vitest + Playwright
- **Deployment**: Docker + Kubernetes

## Development Setup

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
docker >= 20.0.0
```

### Commands (Available in packages)
```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Run tests
npm run test
npm run test:e2e

# Build for production
npm run build

# Linting and formatting
npm run lint
npm run format
npm run typecheck
```

## Project Architecture

**Monorepo Structure:**
- `packages/frontend/` - React application with tree visualization
- `packages/backend/` - Node.js API server
- `packages/shared/` - Shared types and utilities

**Key Components (Implemented):**
- ✅ Tree visualization with TreeView and TreeNode components  
- ✅ Context management system with ContextView and token tracking
- ✅ Advanced search interface with SearchView and filtering
- ✅ Zustand state management (treeStore, contextStore)
- ✅ Enhanced security middleware and API routes
- 🔄 Document relationship mapping and smart collections (future)
- 🔄 Real-time collaboration features (future)

## Development Phases

See `IMPLEMENTATION_PLAN.md` for detailed 14-week development roadmap covering:
1. Foundation Setup (Weeks 1-2)
2. Core Tree Visualization (Weeks 3-4)
3. Search and Filtering (Weeks 5-6)
4. Context Management (Weeks 7-8)
5. Advanced Features (Weeks 9-10)
6. Performance & Analytics (Weeks 11-12)
7. Integration & Polish (Weeks 13-14)

## Security Guidelines

**Authentication & Authorization:**
- Implement OAuth 2.0/OIDC with JWT tokens (15-minute expiration)
- Role-based access control (admin/editor/viewer)
- Multi-factor authentication for admin functions
- Secure session management with HTTP-only cookies

**Input Validation & XSS Prevention:**
- All user inputs sanitized with DOMPurify
- Joi schema validation for API endpoints
- Content Security Policy headers
- Parameterized database queries to prevent SQL injection

**Data Protection:**
- AES-256 encryption for sensitive data at rest
- TLS 1.3 for all API communications
- GDPR/CCPA compliance with data retention policies
- Key rotation and secure secret management

**API Security:**
- Rate limiting (1000 requests/15 minutes standard, 100 for sensitive operations)
- Strict CORS policy with explicit origin allowlist
- Security headers (Helmet.js configuration)
- Request logging and anomaly detection

## Development Commands

When implementing, always run security checks:
```bash
# Security linting
npm run lint:security

# Dependency vulnerability scan
npm audit

# Type checking
npm run typecheck
```

## Current Status (PR #4)

**✅ Completed:**
- Foundation setup with monorepo structure
- Complete frontend UI with TreeView, SearchView, ContextView
- Enhanced backend security with rate limiting, CORS, helmet
- Functional API routes with mock data (documents, search, context)
- Zustand state management for tree and context
- Type-safe shared utilities and API contracts
- Security-first middleware implementation

**🔄 Next Steps:**
- Database integration (PostgreSQL)
- Elasticsearch implementation 
- Authentication system (OAuth 2.0/OIDC)
- Real document processing pipeline
- Advanced features and collections

## Notes

- Project repository: https://github.com/lsendel/zamaz-cursor.git
- Comprehensive implementation plan available in IMPLEMENTATION_PLAN.md
- Focus on accessibility, performance, user experience, and security
- Target: 10,000+ document handling with <200ms response times
- Security-first development approach with comprehensive threat modeling