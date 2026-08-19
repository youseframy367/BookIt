/* ============================================================
   اختبارات عقد API لملف الموقع
   ------------------------------------------------------------
   تحمي هذه الاختبارات الربط بين نموذج إعدادات العميل في الداشبورد
   ومسارات NestJS المحمية، دون الاعتماد على اتصال شبكة فعلي.
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

import { siteProfileApi } from './api';

describe('siteProfileApi', () => {
  it('يجلب ملف الموقع الخاص بالنشاط من المسار المحمي الصحيح', () => {
    siteProfileApi.me();
    expect(methods.get).toHaveBeenCalledWith('/site-profile/me');
  });

  it('يحفظ بيانات الموقع من خلال مسار التحديث المحمي', () => {
    const payload = {
      displayName: 'كافيه BookIt',
      publicPhone: '+201000000000',
      workingHours: 'يومياً من 9 صباحاً إلى 11 مساءً',
      templateKey: 'cafe-forest',
      deliverySettings: { enabled: true },
    };

    siteProfileApi.update(payload);
    expect(methods.patch).toHaveBeenCalledWith('/site-profile/me', payload);
  });
});
