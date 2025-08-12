# Interactive Knowledge Tree

An advanced web application providing an interactive, visual interface for managing and exploring knowledge documents in RAG (Retrieval-Augmented Generation) systems.

## 🚀 Features

- **Interactive Tree Visualization**: Explore your knowledge base through an intuitive tree interface
- **Advanced Search**: Full-text search with Elasticsearch integration
- **Context Management**: Precise control over LLM context inclusion
- **Smart Collections**: Organize documents with rules and automation
- **Security-First**: Comprehensive authentication, authorization, and data protection
- **Performance Optimized**: Handles 10,000+ documents with <200ms response times

## 🛠️ Technology Stack

### Frontend
- **React + TypeScript** with Vite
- **D3.js** for tree visualizations
- **React Flow** for node-based layouts
- **Tailwind CSS** + Headless UI for styling
- **Zustand** + React Query for state management

### Backend
- **Node.js + Express** API server
- **PostgreSQL** for document metadata
- **Elasticsearch** for search and indexing
- **Redis** for caching and sessions

### Security
- **OAuth 2.0/OIDC** authentication
- **JWT** tokens with refresh mechanism
- **Role-based access control** (RBAC)
- **AES-256** encryption for sensitive data
- **Comprehensive input validation** and XSS protection

## 📦 Project Structure

```
interactive-knowledge-tree/
├── packages/
│   ├── frontend/          # React application
│   ├── backend/           # Node.js API server  
│   └── shared/            # Shared types and utilities
├── docs/                  # Project documentation
├── scripts/               # Build and deployment scripts
└── docker/                # Docker configurations
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 13
- Redis >= 6
- Elasticsearch >= 8 (optional, for search features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lsendel/zamaz-cursor.git
   cd zamaz-cursor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📖 Development Phases

The project follows a structured 14-week development plan:

1. **Foundation Setup** (Weeks 1-2) ✅ 
2. **Core Tree Visualization** (Weeks 3-4) 🔄
3. **Search and Filtering** (Weeks 5-6) ⏳
4. **Context Management** (Weeks 7-8) ⏳
5. **Advanced Features** (Weeks 9-10) ⏳
6. **Performance & Analytics** (Weeks 11-12) ⏳
7. **Integration & Polish** (Weeks 13-14) ⏳

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed roadmap.

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start all development servers
npm run build           # Build all packages
npm run test            # Run all tests
npm run test:e2e        # Run end-to-end tests

# Code Quality
npm run lint            # Lint all packages
npm run lint:security   # Run security linting
npm run format          # Format code
npm run typecheck       # Type checking

# Database
npm run db:migrate      # Run database migrations
npm run db:seed         # Seed database with sample data
```

## 🔒 Security

This project implements comprehensive security measures:

- **Authentication**: OAuth 2.0/OIDC with JWT tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Protection**: AES-256 encryption, TLS 1.3
- **Input Validation**: Joi schemas, DOMPurify sanitization
- **API Security**: Rate limiting, CORS, security headers
- **Monitoring**: Security event logging, anomaly detection

## 📊 Performance Targets

- **Tree Rendering**: <2 seconds for 10,000+ nodes
- **Search Results**: <500ms response time
- **Memory Usage**: <500MB for typical workloads
- **API Response**: <200ms for basic operations
- **Uptime**: 99.9% availability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Claude Code](https://claude.ai/code)
- Powered by modern web technologies
- Designed for RAG system optimization

---

For detailed implementation guidelines, see [CLAUDE.md](./CLAUDE.md).
For comprehensive development plan, see [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md).