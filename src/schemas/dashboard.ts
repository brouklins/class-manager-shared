import { z } from 'zod';

import { idSchema, nonEmptyTrimmedStringSchema } from './common';

export const oldestStudentSummarySchema = z.object({
  studentId: idSchema,
  name: nonEmptyTrimmedStringSchema,
  relationshipDays: z.number().int().min(0)
});

export const dashboardSummarySchema = z.object({
  activeStudents: z.number().int().min(0),
  totalStudents: z.number().int().min(0),
  lessonsThisMonth: z.number().int().min(0),
  upcomingLessons: z.number().int().min(0),
  averageStudentRelationshipDays: z.number().min(0),
  occupancyRate: z.number().min(0).max(1),
  oldestStudents: z.array(oldestStudentSummarySchema)
});

export type OldestStudentSummary = z.infer<typeof oldestStudentSummarySchema>;
export type DashboardSummary = z.infer<typeof dashboardSummarySchema>;

