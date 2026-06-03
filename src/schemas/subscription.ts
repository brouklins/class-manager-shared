import { z } from 'zod';

import { utcDateTimeSchema } from './common';

export const FREE_TRIAL_DAYS = 15;
export const MONTHLY_PRICE_CENTS = 3000;
export const SUPPORT_WHATSAPP_DISPLAY = '34 99661-9308';
export const SUPPORT_WHATSAPP_E164 = '5534996619308';

export const teacherAccessStatusSchema = z.enum(['trialing', 'active', 'expired']);

export const accessWindowSchema = z.object({
  accessStatus: teacherAccessStatusSchema,
  trialStartedAt: utcDateTimeSchema,
  trialEndsAt: utcDateTimeSchema,
  accessEndsAt: utcDateTimeSchema.optional()
});

export type TeacherAccessStatus = z.infer<typeof teacherAccessStatusSchema>;
export type AccessWindow = z.infer<typeof accessWindowSchema>;
