import { describe, expect, it } from 'vitest';

import {
  apiErrorResponseSchema,
  createListResponseSchema
} from '../src/schemas/api';
import { studentSchema } from '../src/schemas/student';

describe('api schemas', () => {
  it('accepts a standard API error response', () => {
    const result = apiErrorResponseSchema.parse({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Nome é obrigatório',
        details: []
      }
    });

    expect(result.error.code).toBe('VALIDATION_ERROR');
  });

  it('creates typed list responses from runtime schemas', () => {
    const studentListSchema = createListResponseSchema(studentSchema);

    const result = studentListSchema.parse({
      items: [
        {
          entityType: 'student',
          studentId: 'stu_123',
          teacherId: 'teacher_123',
          name: 'Maria Silva',
          status: 'active',
          startedAt: '2026-06-02T12:00:00.000Z',
          createdAt: '2026-06-02T12:00:00.000Z',
          updatedAt: '2026-06-02T12:00:00.000Z'
        }
      ]
    });

    expect(result.items).toHaveLength(1);
  });
});
