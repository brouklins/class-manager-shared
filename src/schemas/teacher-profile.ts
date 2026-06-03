import { z } from 'zod';

import {
  calendarViewSchema,
  entityBaseSchema,
  nonEmptyTrimmedStringSchema,
  optionalTrimmedStringSchema,
  sportSchema,
  updatePayloadGuard
} from './common';
import {
  accessWindowSchema
} from './subscription';

export const teacherProfileSchema = entityBaseSchema.extend({
  entityType: z.literal('teacher_profile'),
  displayName: nonEmptyTrimmedStringSchema,
  email: z.string().trim().email().optional(),
  phone: optionalTrimmedStringSchema,
  timezone: z.string().trim().min(1).default('America/Sao_Paulo'),
  defaultSport: sportSchema.optional(),
  preferredCalendarView: calendarViewSchema.default('timeGridWeek'),
  accessStatus: accessWindowSchema.shape.accessStatus,
  trialStartedAt: accessWindowSchema.shape.trialStartedAt,
  trialEndsAt: accessWindowSchema.shape.trialEndsAt,
  accessEndsAt: accessWindowSchema.shape.accessEndsAt
});

export const updateTeacherProfileInputSchema = updatePayloadGuard({
  displayName: nonEmptyTrimmedStringSchema,
  phone: nonEmptyTrimmedStringSchema,
  timezone: z.string().trim().min(1),
  defaultSport: sportSchema,
  preferredCalendarView: calendarViewSchema
});

export type TeacherProfile = z.infer<typeof teacherProfileSchema>;
export type UpdateTeacherProfileInput = z.infer<typeof updateTeacherProfileInputSchema>;
