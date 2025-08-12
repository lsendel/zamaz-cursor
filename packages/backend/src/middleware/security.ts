import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

interface SecurityEvent {
  timestamp: Date;
  ip: string;
  userAgent: string;
  method: string;
  path: string;
  userId?: string;
  eventType: 'request' | 'suspicious_activity';
  details?: any;
}

const suspiciousPatterns = [
  /\.\./,           // Directory traversal
  /<script/i,       // XSS attempts
  /union.*select/i, // SQL injection attempts
  /eval\(/i,        // Code injection
  /javascript:/i,   // JavaScript protocol
  /@.*\./,          // Email patterns in unusual places
];

const isSuspiciousRequest = (req: Request): boolean => {
  const checkString = `${req.path} ${req.query} ${JSON.stringify(req.body)}`;
  
  return suspiciousPatterns.some(pattern => pattern.test(checkString));
};

export const securityMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const securityEvent: SecurityEvent = {
    timestamp: new Date(),
    ip: req.ip || req.socket.remoteAddress || 'unknown',
    userAgent: req.get('User-Agent') || 'unknown',
    method: req.method,
    path: req.path,
    userId: (req as any).user?.id,
    eventType: 'request'
  };
  
  // Log suspicious patterns
  if (isSuspiciousRequest(req)) {
    securityEvent.eventType = 'suspicious_activity';
    securityEvent.details = {
      query: req.query,
      body: req.body,
      headers: req.headers
    };
    
    logger.warn('Suspicious request detected', securityEvent);
  }
  
  // Add security headers
  res.setHeader('X-Request-ID', generateRequestId());
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Log all requests (info level for normal requests)
  if (securityEvent.eventType === 'request') {
    logger.info('API request', {
      method: req.method,
      path: req.path,
      ip: securityEvent.ip,
      userAgent: securityEvent.userAgent
    });
  }
  
  next();
};

const generateRequestId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};