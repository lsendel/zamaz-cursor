# Interactive Knowledge Tree

An advanced web application providing an interactive, visual interface for managing and exploring knowledge documents in RAG (Retrieval-Augmented Generation) systems.

## Features

- **Interactive Tree Visualization**: Navigate document hierarchies with an intuitive tree interface
- **Context Management**: Control which documents are included in LLM context with pinning, inclusion, and exclusion
- **Advanced Search**: Full-text search with Elasticsearch integration and smart filtering
- **Real-time Collaboration**: Collaborative workspace features for team knowledge management
- **Performance Optimized**: Handles 10,000+ documents with <200ms response times

## Technology Stack

- **Frontend**: React + TypeScript, Vite, Tailwind CSS, D3.js, React Flow, Framer Motion
- **Backend**: Node.js + Express, PostgreSQL, Redis, Elasticsearch
- **State Management**: Zustand + React Query
- **Testing**: Vitest, Playwright, React Testing Library
- **Deployment**: Docker + Kubernetes

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker >= 20.0.0

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/lsendel/zamaz-cursor.git
   cd zamaz-cursor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development environment with Docker**
   ```bash
   docker-compose -f docker/docker-compose.dev.yml up
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - PostgreSQL: localhost:5432
   - Redis: localhost:6379
   - Elasticsearch: http://localhost:9200

### Manual Development (without Docker)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start backend services** (PostgreSQL, Redis, Elasticsearch)
   ```bash
   # You'll need to set up these services manually
   # See docker-compose.dev.yml for configuration details
   ```

3. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd packages/backend
   npm run dev

   # Terminal 2 - Frontend
   cd packages/frontend
   npm run dev
   ```

## Project Structure

```
interactive-knowledge-tree/
├── packages/
│   ├── frontend/           # React application
│   │   ├── src/
│   │   │   ├── components/ # UI components
│   │   │   ├── stores/     # Zustand stores
│   │   │   ├── hooks/      # Custom hooks
│   │   │   └── types/      # TypeScript types
│   │   └── tests/
│   ├── backend/            # Node.js API server
│   │   ├── src/
│   │   │   ├── routes/     # API routes
│   │   │   ├── services/   # Business logic
│   │   │   └── middleware/ # Express middleware
│   │   └── tests/
│   └── shared/             # Shared types and utilities
├── docker/                 # Docker configurations
├── scripts/               # Build and deployment scripts
└── docs/                  # Documentation
```

## Available Scripts

```bash
# Development
npm run dev          # Start all development servers
npm run build        # Build all packages
npm run test         # Run all tests
npm run test:e2e     # Run end-to-end tests

# Code Quality
npm run lint         # Lint all packages
npm run format       # Format code with Prettier
npm run typecheck    # Type check all packages

# Utilities
npm run clean        # Clean build artifacts
```

## Development Phases

This project follows a 14-week development plan:

1. **Phase 1 (Weeks 1-2)**: Foundation Setup ✅
2. **Phase 2 (Weeks 3-4)**: Core Tree Visualization 🚧
3. **Phase 3 (Weeks 5-6)**: Search and Filtering
4. **Phase 4 (Weeks 7-8)**: Context Management
5. **Phase 5 (Weeks 9-10)**: Advanced Features
6. **Phase 6 (Weeks 11-12)**: Performance & Analytics
7. **Phase 7 (Weeks 13-14)**: Integration & Polish

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed development roadmap.

## Key Components

### Tree Visualization
- Expandable/collapsible tree nodes
- Visual hierarchy indicators
- Smooth animations and transitions
- Minimap for large trees
- Virtual scrolling for performance

### Context Management
- Pin documents to always include in context
- Include/exclude documents from context
- Token usage tracking and visualization
- Context snapshots and history

### Search & Filtering
- Real-time full-text search
- Advanced filtering by type, tags, date
- Search result relevance scoring
- Saved searches and suggestions

## API Documentation

### Documents API
- `GET /api/documents` - List all documents
- `GET /api/documents/:id` - Get specific document
- `POST /api/documents/:id/content` - Get full document content

### Search API
- `POST /api/search` - Search documents
- `GET /api/search/suggestions` - Get search suggestions

### Context API
- `GET /api/context` - Get current context state
- `POST /api/context/include` - Include nodes in context
- `POST /api/context/exclude` - Exclude nodes from context
- `POST /api/context/pin` - Pin nodes to context
- `DELETE /api/context` - Clear all context

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions and support, please open an issue on GitHub or contact the development team.