/* ============================================================
   اختبارات انحدار اعتراضات الجلسة
   ------------------------------------------------------------
   تمنع إعادة محاولة /auth/refresh لنفسه عند 401، وتضمن أن
   طلبات الدخول والـ API العام لا تحمل Bearer منتهي الصلاحية.
   ============================================================ */
import { describe, expect, it, vi } from "vitest";

const { methods } = vi.hoisted(() => ({
  methods: { get: vi.fn(), post: vi.fn(), patch: vi.fn() },
}));

vi.mock("axios", () => ({
  default: {
    create: () => ({
      ...methods,
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
    }),
  },
}));

import { shouldAttachAuthHeader, shouldRefreshAfterUnauthorized } from "./api";

describe("حماية اعتراضات API", () => {
  it("لا يرسل Bearer إلى نقاط الجلسة أو المحتوى العام", () => {
    expect(shouldAttachAuthHeader("/auth/refresh")).toBe(false);
    expect(shouldAttachAuthHeader("/auth/login")).toBe(false);
    expect(shouldAttachAuthHeader("/public/businesses/business-1/menu")).toBe(false);
    expect(shouldAttachAuthHeader("/hr/employees")).toBe(true);
  });

  it("لا يعيد محاولة refresh فاشل كي لا تتكوّن حلقة انتظار", () => {
    expect(shouldRefreshAfterUnauthorized(401, "/auth/refresh", true)).toBe(false);
    expect(shouldRefreshAfterUnauthorized(401, "/hr/employees", true)).toBe(true);
    expect(shouldRefreshAfterUnauthorized(401, "/hr/employees", false)).toBe(false);
  });
});
