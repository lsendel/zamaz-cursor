import { z } from 'zod';
import { DocumentNodeSchema } from './document.js';

export const SearchRequestSchema = z.object({
  query: z.string(),
  filters: z.object({
    type: z.enum(['folder', 'document']).optional(),
    tags: z.array(z.string()).optional(),
    dateRange: z.object({
      start: z.date().optional(),
      end: z.date().optional(),
    }).optional(),
    sizeRange: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
    }).optional(),
  }).optional(),
  pagination: z.object({
    page: z.number().default(1),
    limit: z.number().default(20),
  }).optional(),
  sortBy: z.enum(['relevance', 'name', 'date', 'size']).default('relevance'),
});

export type SearchRequest = z.infer<typeof SearchRequestSchema>;

export const SearchResponseSchema = z.object({
  results: z.array(DocumentNodeSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  facets: z.object({
    types: z.record(z.number()),
    tags: z.record(z.number()),
    dateRanges: z.record(z.number()),
  }),
});

export type SearchResponse = z.infer<typeof SearchResponseSchema>;

export const ApiErrorSchema = z.object({
  message: z.string(),
  code: z.string(),
  details: z.any().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export const ApiResponseSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: ApiErrorSchema.optional(),
  });

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: ApiError;
};