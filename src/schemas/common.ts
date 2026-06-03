import { z } from 'zod';

export const isoDateTimeSchema = z
  .string()
  .datetime({ offset: true, message: 'Expected a valid ISO 8601 date-time string.' });

export const utcDateTimeSchema = isoDateTimeSchema.refine(
  (value) => value.endsWith('Z'),
  'Expected a UTC ISO 8601 date-time with Z suffix.'
);

export const nonEmptyTrimmedStringSchema = z
  .string()
  .trim()
  .min(1, 'This field is required.');

export const optionalTrimmedStringSchema = z
  .string()
  .trim()
  .min(1, 'This field cannot be empty.')
  .optional();

export const idSchema = z.string().trim().min(1);

export const sportSchema = z.enum(['beach_tennis', 'tennis', 'other']);

export const calendarViewSchema = z.enum(['dayGridMonth', 'timeGridWeek', 'timeGridDay']);

export const entityBaseSchema = z.object({
  teacherId: idSchema,
  createdAt: utcDateTimeSchema,
  updatedAt: utcDateTimeSchema,
  deletedAt: utcDateTimeSchema.optional()
});

export const updatePayloadGuard = <T extends z.ZodRawShape>(shape: T) =>
  z
    .object(shape)
    .partial()
    .refine((value) => Object.values(value).some((item) => item !== undefined), {
      message: 'At least one field must be provided.'
    });

export type Sport = z.infer<typeof sportSchema>;
export type CalendarView = z.infer<typeof calendarViewSchema>;

