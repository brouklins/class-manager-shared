import { describe, expect, it } from 'vitest';

import {
  createStudentInputSchema,
  studentSchema,
  updateStudentInputSchema
} from '../src/schemas/student';

describe('student schemas', () => {
  it('accepts a valid student creation payload without optional fields', () => {
    const result = createStudentInputSchema.parse({
      name: 'Maria Silva'
    });

    expect(result).toEqual({
      name: 'Maria Silva'
    });
  });

  it('rejects a student creation payload without a valid name', () => {
    const result = createStudentInputSchema.safeParse({
      name: '   '
    });

    expect(result.success).toBe(false);
  });

  it('requires at least one field in student updates', () => {
    const result = updateStudentInputSchema.safeParse({});

    expect(result.success).toBe(false);
  });

  it('accepts a persisted student entity', () => {
    const result = studentSchema.parse({
      entityType: 'student',
      studentId: 'stu_123',
      teacherId: 'teacher_123',
      name: 'Maria Silva',
      status: 'active',
      startedAt: '2026-06-02T12:00:00.000Z',
      createdAt: '2026-06-02T12:00:00.000Z',
      updatedAt: '2026-06-02T12:00:00.000Z'
    });

    expect(result.studentId).toBe('stu_123');
  });
});

