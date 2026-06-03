import { z } from 'zod';

import {
  entityBaseSchema,
  idSchema,
  nonEmptyTrimmedStringSchema,
  optionalTrimmedStringSchema,
  sportSchema,
  updatePayloadGuard,
  utcDateTimeSchema
} from './common';

const lessonDateOrderGuard = <T extends { startAt: string; endAt: string }>(value: T) =>
  new Date(value.startAt).getTime() < new Date(value.endAt).getTime();

export const lessonStatusSchema = z.enum(['scheduled', 'completed', 'cancelled']);
export const lessonRecurrenceSchema = z.object({
  frequency: z.literal('weekly'),
  until: utcDateTimeSchema
});

export const lessonWarningCodeSchema = z.enum(['schedule_overlap']);

export const lessonWarningSchema = z.object({
  code: lessonWarningCodeSchema,
  message: nonEmptyTrimmedStringSchema,
  conflictingLessonIds: z.array(idSchema).default([])
});

export const createLessonInputSchema = z
  .object({
    title: nonEmptyTrimmedStringSchema,
    sport: sportSchema,
    startAt: utcDateTimeSchema,
    endAt: utcDateTimeSchema,
    capacity: z.number().int().min(1),
    studentIds: z.array(idSchema).default([]),
    notes: optionalTrimmedStringSchema,
    recurrence: lessonRecurrenceSchema.optional()
  })
  .superRefine((value, ctx) => {
    if (!lessonDateOrderGuard(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'startAt must be before endAt.',
        path: ['startAt']
      });
    }

    if (value.studentIds.length > value.capacity) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'studentIds cannot exceed capacity.',
        path: ['studentIds']
      });
    }

    if (value.recurrence && new Date(value.recurrence.until).getTime() < new Date(value.startAt).getTime()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'recurrence.until must be on or after startAt.',
        path: ['recurrence', 'until']
      });
    }
  });

export const updateLessonInputSchema = updatePayloadGuard({
  title: nonEmptyTrimmedStringSchema,
  sport: sportSchema,
  startAt: utcDateTimeSchema,
  endAt: utcDateTimeSchema,
  capacity: z.number().int().min(1),
  studentIds: z.array(idSchema),
  notes: nonEmptyTrimmedStringSchema,
  status: lessonStatusSchema
}).superRefine((value, ctx) => {
  if (value.startAt && value.endAt && !lessonDateOrderGuard(value as { startAt: string; endAt: string })) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'startAt must be before endAt.',
      path: ['startAt']
    });
  }

  if (
    value.studentIds &&
    value.capacity !== undefined &&
    value.studentIds.length > value.capacity
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'studentIds cannot exceed capacity.',
      path: ['studentIds']
    });
  }
});

export const lessonSchema = entityBaseSchema.extend({
  entityType: z.literal('lesson'),
  lessonId: idSchema,
  recurringSeriesId: idSchema.optional(),
  title: nonEmptyTrimmedStringSchema,
  sport: sportSchema,
  startAt: utcDateTimeSchema,
  endAt: utcDateTimeSchema,
  capacity: z.number().int().min(1),
  studentIds: z.array(idSchema),
  status: lessonStatusSchema,
  notes: optionalTrimmedStringSchema
});

export const lessonOperationResultSchema = z.object({
  lesson: lessonSchema,
  affectedLessons: z.array(lessonSchema).default([]),
  warnings: z.array(lessonWarningSchema).default([])
});

export type LessonStatus = z.infer<typeof lessonStatusSchema>;
export type LessonWarningCode = z.infer<typeof lessonWarningCodeSchema>;
export type LessonWarning = z.infer<typeof lessonWarningSchema>;
export type LessonRecurrence = z.infer<typeof lessonRecurrenceSchema>;
export type CreateLessonInput = z.infer<typeof createLessonInputSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonInputSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type LessonOperationResult = z.infer<typeof lessonOperationResultSchema>;
