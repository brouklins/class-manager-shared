import { z } from 'zod';

export const apiErrorCodeSchema = z.enum([
  'VALIDATION_ERROR',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'ACCESS_EXPIRED',
  'NOT_FOUND',
  'CONFLICT',
  'INTERNAL_ERROR'
]);

export const apiErrorSchema = z.object({
  code: apiErrorCodeSchema,
  message: z.string().trim().min(1),
  details: z.array(z.unknown()).default([])
});

export const apiErrorResponseSchema = z.object({
  error: apiErrorSchema
});

export const createListResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema)
  });

export type ApiErrorCode = z.infer<typeof apiErrorCodeSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
