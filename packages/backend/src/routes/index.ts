import { Router } from 'express';
import { ApiResponse } from '@shared/types';
import { documentRoutes } from './documents.js';
import { searchRoutes } from './search.js';
import { contextRoutes } from './context.js';

const router = Router();

// API status endpoint
router.get('/', (req, res) => {
  const response: ApiResponse = {
    success: true,
    data: {
      message: 'Knowledge Tree API is running',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      features: {
        documents: 'Functional with mock data',
        search: 'Functional with mock implementation',
        context: 'Functional context management',
        security: 'Enhanced security middleware active'
      }
    }
  };
  
  res.json(response);
});

// Mount feature routes
router.use('/documents', documentRoutes);
router.use('/search', searchRoutes);
router.use('/context', contextRoutes);

// Placeholder routes for future implementation
router.get('/collections', (req, res) => {
  const response: ApiResponse = {
    success: true,
    data: {
      message: 'Collections API endpoint - to be implemented in Phase 5',
      phase: 'Advanced Features (Week 9-10)'
    }
  };
  
  res.json(response);
});

router.get('/auth', (req, res) => {
  const response: ApiResponse = {
    success: true,
    data: {
      message: 'Authentication API endpoint - security implementation ongoing',
      features: [
        'OAuth 2.0/OIDC integration',
        'JWT token management',
        'Role-based access control',
        'Multi-factor authentication'
      ]
    }
  };
  
  res.json(response);
});

export default router;