import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { ApiResponse } from '@shared/types';

export interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): void => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Default error values
  let statusCode = err.statusCode || 500;
  let code = err.code || 'INTERNAL_SERVER_ERROR';
  let message = err.message || 'An unexpected error occurred';
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    code = 'UNAUTHORIZED';
  } else if (err.name === 'ForbiddenError') {
    statusCode = 403;
    code = 'FORBIDDEN';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    code = 'NOT_FOUND';
  } else if (err.name === 'ConflictError') {
    statusCode = 409;
    code = 'CONFLICT';
  }
  
  // Log error
  const errorLog = {
    error: {
      name: err.name,
      message: err.message,
      code,
      statusCode,
      stack: isDevelopment ? err.stack : undefined,
    },
    request: {
      method: req.method,
      path: req.path,
      query: req.query,
      body: isDevelopment ? req.body : '[HIDDEN]',
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    },
    user: (req as any).user?.id || 'anonymous',
  };
  
  if (statusCode >= 500) {
    logger.error('Server error', errorLog);
  } else {
    logger.warn('Client error', errorLog);
  }
  
  // Send error response
  const errorResponse: ApiResponse = {
    success: false,
    error: {
      code,
      message,
      details: isDevelopment ? err.details : undefined,
    },
  };
  
  res.status(statusCode).json(errorResponse);
};

// Helper function to create custom errors
export const createError = (
  statusCode: number,
  code: string,
  message: string,
  details?: any
): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  error.code = code;
  error.details = details;
  return error;
};

// Async error handler wrapper
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};