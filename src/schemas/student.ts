import { z } from 'zod';

import {
  entityBaseSchema,
  idSchema,
  nonEmptyTrimmedStringSchema,
  optionalTrimmedStringSchema,
  updatePayloadGuard,
  utcDateTimeSchema
} from './common';

export const studentStatusSchema = z.enum(['active', 'inactive']);

export const createStudentInputSchema = z.object({
  name: nonEmptyTrimmedStringSchema,
  email: z.string().trim().email().optional(),
  phone: optionalTrimmedStringSchema,
  startedAt: utcDateTimeSchema.optional()
});

export const updateStudentInputSchema = updatePayloadGuard({
  name: nonEmptyTrimmedStringSchema,
  email: z.string().trim().email(),
  phone: nonEmptyTrimmedStringSchema,
  startedAt: utcDateTimeSchema,
  status: studentStatusSchema
});

export const studentSchema = entityBaseSchema.extend({
  entityType: z.literal('student'),
  studentId: idSchema,
  name: nonEmptyTrimmedStringSchema,
  email: z.string().trim().email().optional(),
  phone: optionalTrimmedStringSchema,
  status: studentStatusSchema,
  startedAt: utcDateTimeSchema
});

export type StudentStatus = z.infer<typeof studentStatusSchema>;
export type CreateStudentInput = z.infer<typeof createStudentInputSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentInputSchema>;
export type Student = z.infer<typeof studentSchema>;

