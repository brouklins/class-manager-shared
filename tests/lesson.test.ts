import { describe, expect, it } from 'vitest';

import {
  createLessonInputSchema,
  lessonOperationResultSchema,
  updateLessonInputSchema
} from '../src/schemas/lesson';

describe('lesson schemas', () => {
  it('accepts a valid lesson creation payload', () => {
    const result = createLessonInputSchema.parse({
      title: 'Aula turma manhã',
      sport: 'beach_tennis',
      startAt: '2026-06-02T12:00:00.000Z',
      endAt: '2026-06-02T13:00:00.000Z',
      capacity: 4,
      studentIds: ['stu_1']
    });

    expect(result.capacity).toBe(4);
  });

  it('rejects lessons with invalid date ordering', () => {
    const result = createLessonInputSchema.safeParse({
      title: 'Aula turma manhã',
      sport: 'beach_tennis',
      startAt: '2026-06-02T13:00:00.000Z',
      endAt: '2026-06-02T12:00:00.000Z',
      capacity: 4
    });

    expect(result.success).toBe(false);
  });

  it('rejects updates with no fields', () => {
    const result = updateLessonInputSchema.safeParse({});

    expect(result.success).toBe(false);
  });

  it('accepts lesson warnings in operation result', () => {
    const result = lessonOperationResultSchema.parse({
      lesson: {
        entityType: 'lesson',
        lessonId: 'les_123',
        teacherId: 'teacher_123',
        title: 'Aula turma manhã',
        sport: 'beach_tennis',
        startAt: '2026-06-02T12:00:00.000Z',
        endAt: '2026-06-02T13:00:00.000Z',
        capacity: 4,
        studentIds: [],
        status: 'scheduled',
        createdAt: '2026-06-02T12:00:00.000Z',
        updatedAt: '2026-06-02T12:00:00.000Z'
      },
      warnings: [
        {
          code: 'schedule_overlap',
          message: 'Existe sobreposição com outra aula.',
          conflictingLessonIds: ['les_999']
        }
      ]
    });

    expect(result.warnings).toHaveLength(1);
  });
});

