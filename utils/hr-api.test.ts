/* ============================================================
   اختبارات عقد API الخاص بالموارد البشرية
   ------------------------------------------------------------
   نتأكد أن عميل الواجهة يستدعي مسارات NestJS الصحيحة، حتى لا
   تنفصل صفحة HR عن الـ Backend عند أي إعادة تنظيم مستقبلية.
   ============================================================ */
import { describe, expect, it, vi } from 'vitest';

const { methods } = vi.hoisted(() => ({
  methods: { get: vi.fn(), post: vi.fn(), patch: vi.fn() },
}));

vi.mock('axios', () => ({
  default: {
    create: () => ({
      ...methods,
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
    }),
  },
}));

import { hrApi } from './api';

describe('hrApi', () => {
  it('يجلب ملخص لوحة HR من endpoint الصحيح', () => {
    hrApi.dashboard();
    expect(methods.get).toHaveBeenCalledWith('/hr/dashboard');
  });

  it('يسجل الحضور في endpoint المخصص له', () => {
    const payload = { employeeProfileId: 'employee-1', workDate: '2026-08-18', status: 'present' };
    hrApi.recordAttendance(payload);
    expect(methods.post).toHaveBeenCalledWith('/hr/attendance', payload);
  });

  it('يحدّث حالة فترة الرواتب بالمسار الصحيح', () => {
    hrApi.updatePayrollStatus('period-1', 'approved');
    expect(methods.patch).toHaveBeenCalledWith('/hr/payroll-periods/period-1/status', { status: 'approved' });
  });
});
