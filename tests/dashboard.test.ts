import { describe, expect, it } from 'vitest';

import { dashboardSummarySchema } from '../src/schemas/dashboard';

describe('dashboard schemas', () => {
  it('accepts a valid dashboard summary payload', () => {
    const result = dashboardSummarySchema.parse({
      activeStudents: 12,
      totalStudents: 15,
      lessonsThisMonth: 38,
      upcomingLessons: 5,
      averageStudentRelationshipDays: 94,
      occupancyRate: 0.72,
      oldestStudents: [
        {
          studentId: 'stu_123',
          name: 'Maria Silva',
          relationshipDays: 180
        }
      ]
    });

    expect(result.occupancyRate).toBe(0.72);
  });

  it('rejects occupancy rate above 1', () => {
    const result = dashboardSummarySchema.safeParse({
      activeStudents: 12,
      totalStudents: 15,
      lessonsThisMonth: 38,
      upcomingLessons: 5,
      averageStudentRelationshipDays: 94,
      occupancyRate: 1.2,
      oldestStudents: []
    });

    expect(result.success).toBe(false);
  });
});

