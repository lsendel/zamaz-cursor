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

### Commands (To be implemented)
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

**Key Components:**
- Tree visualization with D3.js and React Flow
- Context management system for LLM integration
- Advanced search and filtering with Elasticsearch
- Document relationship mapping and smart collections
- Real-time collaboration features

## Development Phases

See `IMPLEMENTATION_PLAN.md` for detailed 14-week development roadmap covering:
1. Foundation Setup (Weeks 1-2)
2. Core Tree Visualization (Weeks 3-4)
3. Search and Filtering (Weeks 5-6)
4. Context Management (Weeks 7-8)
5. Advanced Features (Weeks 9-10)
6. Performance & Analytics (Weeks 11-12)
7. Integration & Polish (Weeks 13-14)

## Notes

- Project repository: https://github.com/lsendel/zamaz-cursor.git
- Comprehensive implementation plan available in IMPLEMENTATION_PLAN.md
- Focus on accessibility, performance, and user experience
- Target: 10,000+ document handling with <200ms response times