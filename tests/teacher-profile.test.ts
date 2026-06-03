import { describe, expect, it } from 'vitest';

import {
  FREE_TRIAL_DAYS,
  teacherProfileSchema,
  updateTeacherProfileInputSchema
} from '../src';

describe('teacher profile schemas', () => {
  it('applies default values for timezone and calendar view', () => {
    const result = teacherProfileSchema.parse({
      entityType: 'teacher_profile',
      teacherId: 'teacher_123',
      displayName: 'Professor Bruno',
      accessStatus: 'trialing',
      trialStartedAt: '2026-06-02T12:00:00.000Z',
      trialEndsAt: '2026-06-17T12:00:00.000Z',
      createdAt: '2026-06-02T12:00:00.000Z',
      updatedAt: '2026-06-02T12:00:00.000Z'
    });

    expect(result.timezone).toBe('America/Sao_Paulo');
    expect(result.preferredCalendarView).toBe('timeGridWeek');
  });

  it('accepts subscription metadata for the teacher profile', () => {
    const result = teacherProfileSchema.parse({
      entityType: 'teacher_profile',
      teacherId: 'teacher_123',
      displayName: 'Professor Bruno',
      accessStatus: 'active',
      trialStartedAt: '2026-06-02T12:00:00.000Z',
      trialEndsAt: '2026-06-17T12:00:00.000Z',
      accessEndsAt: '2026-07-02T12:00:00.000Z',
      createdAt: '2026-06-02T12:00:00.000Z',
      updatedAt: '2026-06-02T12:00:00.000Z'
    });

    expect(result.accessStatus).toBe('active');
    expect(FREE_TRIAL_DAYS).toBe(15);
  });

  it('requires at least one field when updating the teacher profile', () => {
    const result = updateTeacherProfileInputSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});
