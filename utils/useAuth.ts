/* ============================================================
   Hook المصادقة الموحد (useAuth)
   ------------------------------------------------------------
   - يدير حالة تسجيل الدخول (logged in / role / user)
   - بيتابع التغير في localStorage عبر custom event
   ============================================================ */
"use client";
import { useCallback, useEffect, useState } from "react";
import { getUser, getAccessToken, setTokens, clearTokens, saveUser, authApi } from "./api";

export function useAuth() {
  const [user, setUser] = useState<any | null>(() => getUser());

  /* إعادة التحميل عند تغيّر localStorage من تبويب/صفحة تانية */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "bookit_user" || e.key === "bookit_access_token") {
        setUser(getUser());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    const { accessToken, refreshToken, user } = res.data;
    setTokens(accessToken, refreshToken);
    saveUser(user);
    setUser(user);
    return user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* تجاهل أخطاء تسجيل الخروج */
    }
    clearTokens();
    setUser(null);
  }, []);

  return {
    user,
    isLoggedIn: !!user && !!getAccessToken(),
    role: user?.role ?? null,
    businessId: user?.businessId ?? null,
    login,
    logout,
  };
}

export function refreshUserSession(): void {
  /* ترقية أي sessionStorage/localStorage بعد تسجيل دخول */
  if (typeof window !== "undefined") {
    window.dispatchEvent(new StorageEvent("storage", {
      key: "bookit_access_token",
    } as any));
  }
}
