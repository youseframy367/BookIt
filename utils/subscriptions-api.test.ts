/* ============================================================
   اختبارات عقد API للباقات وبوابة الموافقة الداخلية
   ------------------------------------------------------------
   تحمي هذه الاختبارات روابط الصفحة مع Backend: لا يجوز أن يتغير
   مسار طلب الوصول أو قرار المدير أو اختيار الباقة بلا كشف فوري.
   ============================================================ */
import { describe, expect, it, vi } from 'vitest';

const { methods } = vi.hoisted(() => ({
  methods: { get: vi.fn(), post: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}));

vi.mock('axios', () => ({
  default: {
    create: () => ({
      ...methods,
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
    }),
  },
}));

import { subscriptionsApi } from './api';

describe('subscriptionsApi', () => {
  it('يرسل طلب بوابة الوصول إلى المسار الداخلي الصحيح', () => {
    const payload = { requestNote: 'أحتاج إدارة الباقات' };
    subscriptionsApi.requestAccess(payload);
    expect(methods.post).toHaveBeenCalledWith('/subscriptions/access-requests', payload);
  });

  it('يسجل قرار مدير المشروع في مسار الطلب الصحيح', () => {
    subscriptionsApi.decideAccess('request-1', { status: 'approved', decisionNote: 'موافق' });
    expect(methods.patch).toHaveBeenCalledWith('/subscriptions/access-requests/request-1/decision', { status: 'approved', decisionNote: 'موافق' });
  });

  it('يختار الباقة للنشاط باستخدام endpoint المحمي', () => {
    subscriptionsApi.select({ planId: 'plan-1', status: 'active' });
    expect(methods.post).toHaveBeenCalledWith('/subscriptions/select', { planId: 'plan-1', status: 'active' });
  });
});
