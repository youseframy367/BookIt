/* ============================================================
   طبقة الـ API الموحدة لمشروع BookIt
   ------------------------------------------------------------
   - بتتواصل مع الباك إند NestJS (serverBookIt) على:
     http://localhost:3001/api
   - بتحفظ التوكن في localStorage (accessToken + refreshToken)
   - بتنضم Authorization header تلقائياً في كل طلب محمي
   - بتجدد التوكن تلقائياً لو الـ access token انتهى
   ============================================================ */

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:3001/api").replace(/\/$/, "");

/* --- إنشاء axios instance واحد لكل التطبيق --- */
const api = axios.create({
  baseURL: API_BASE,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

/* --- مفاتيح التخزين المحلي --- */
const TOKEN_KEY = "bookit_access_token";
const REFRESH_KEY = "bookit_refresh_token";
const USER_KEY = "bookit_user";

/* ========== دوال مساعدة للتوكن ========== */
export const getAccessToken = (): string | null =>
  typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

export const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
};

export const clearTokens = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
};

export const saveUser = (user: unknown) => {
  if (typeof window !== "undefined" && user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getUser = (): any | null => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
};

/* ========== تجديد التوكن التلقائي ========== */
let refreshPromise: Promise<string | null> | null = null;

async function refreshTokenIfNeeded(): Promise<string | null> {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  if (!refreshToken) return null;
  if (!refreshPromise) {
    refreshPromise = api
      .post("/auth/refresh", { userId: getUser()?.id, refreshToken })
      .then((res) => {
        const { accessToken, refreshToken: newRefresh } = res.data;
        if (accessToken) setTokens(accessToken, newRefresh ?? refreshToken);
        return accessToken as string;
      })
      .catch(() => {
        clearTokens();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

/* --- انضمام Authorization header لكل طلب (ماعدا endpoints العامة) --- */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const isPublic = (config.url || "").startsWith("/public/");
  const token = getAccessToken();
  if (token && !isPublic && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* --- معالجة استجابة 401: محاولة تجديد التوكن وإعادة الطلب --- */
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      const newToken = await refreshTokenIfNeeded();
      if (newToken && original.headers) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }
    }
    return Promise.reject(error);
  }
);

/* ========== تحويل رسالة الخطأ لصيغة موحدة ========== */
export function getErrorMessages(error: unknown): string[] {
  const e = error as AxiosError<{ message?: string | string[]; messages?: string[]; error?: string }>;
  const data = e?.response?.data;
  if (!data) return ["حدث خطأ في الاتصال بالسيرفر"];
  if (data.message) {
    if (Array.isArray(data.message)) return data.message;
    return [data.message];
  }
  if (data.messages) return data.messages;
  if (data.error) return [data.error];
  return ["حدث خطأ غير متوقع"];
}

/* ========== طبقة الـ endpoints ========== */
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ user: any; accessToken: string; refreshToken: string }>("/auth/login", { email, password }),
  registerCustomer: (data: Record<string, any>) =>
    api.post("/auth/register/customer", data),
  registerBusiness: (data: Record<string, any>) =>
    api.post("/auth/register/business", data),
  sendOtp: (email: string, purpose: string) =>
    api.post("/auth/otp/send", { email, purpose }),
  verifyOtp: (email: string, code: string, purpose: string) =>
    api.post("/auth/otp/verify", { email, code, purpose }),
  forgotPassword: (email: string) =>
    api.post("/auth/password/forgot", { email }),
  resetPassword: (data: Record<string, any>) =>
    api.post("/auth/password/reset", data),
  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    api.post("/auth/change-password", data),
  getMe: () => api.get<any>("/auth/me"),
  logout: () => api.post("/auth/logout"),
  updateProfile: (data: Record<string, any>) =>
    api.patch("/auth/profile", data),
};

export const usersApi = {
  list: (role?: string) => api.get<any[]>("/users", { params: role ? { role } : {} }),
  get: (id: string) => api.get(`/users/${id}`),
  create: (data: Record<string, any>) => api.post("/users", data),
  update: (id: string, data: Record<string, any>) => api.patch(`/users/${id}`, data),
  remove: (id: string) => api.delete(`/users/${id}`),
  toggleStatus: (id: string) => api.patch(`/users/${id}/toggle-status`),
  assignRole: (userId: string, roleId: string) =>
    api.patch(`/users/${userId}/assign-role`, { roleId }),
};

export const rolesApi = {
  list: () => api.get<any[]>("/roles"),
  get: (id: string) => api.get(`/roles/${id}`),
  create: (data: Record<string, any>) => api.post("/roles", data),
  update: (id: string, data: Record<string, any>) => api.patch(`/roles/${id}`, data),
  remove: (id: string) => api.delete(`/roles/${id}`),
  toggle: (id: string) => api.patch(`/roles/${id}/toggle`),
};

export const reservationsApi = {
  list: (params?: Record<string, any>) => api.get<any[]>("/reservations", { params }),
  get: (id: string) => api.get(`/reservations/${id}`),
  create: (data: Record<string, any>) => api.post("/reservations", data),
  updateStatus: (id: string, status: string) =>
    api.patch(`/reservations/${id}/status`, { status }),
  remove: (id: string) => api.delete(`/reservations/${id}`),
  myReservations: () => api.get<any[]>("/reservations/my"),
  getSettings: () => api.get<any>("/reservations/settings"),
  updateSettings: (data: Record<string, any>) =>
    api.patch("/reservations/settings", data),
};

export const ordersApi = {
  list: (params?: Record<string, any>) => api.get<any[]>("/orders", { params }),
  get: (id: string) => api.get(`/orders/${id}`),
  create: (data: Record<string, any>) => api.post("/orders", data),
  updateStatus: (id: string, status: string) =>
    api.patch(`/orders/${id}/status`, { status }),
  remove: (id: string) => api.delete(`/orders/${id}`),
};

export const inventoryApi = {
  list: () => api.get<any[]>("/inventory"),
  one: (id: string) => api.get<any>(`/inventory/${id}`),
  create: (data: Record<string, any>) => api.post("/inventory", data),
  update: (id: string, data: Record<string, any>) =>
    api.patch(`/inventory/${id}`, data),
  remove: (id: string) => api.delete(`/inventory/${id}`),
  toggle: (id: string) => api.patch(`/inventory/${id}/toggle`),
  daily: (data: Record<string, any>) => api.post("/inventory/daily", data),
  dailyList: () => api.get<any[]>("/inventory/daily"),
  reports: (params?: Record<string, any>) =>
    api.get<any[]>("/inventory/reports", { params }),
  adjust: (id: string, data: Record<string, any>) =>
    api.patch(`/inventory/${id}/adjust`, data),
};

export const suppliersApi = {
  list: () => api.get<any[]>("/suppliers"),
  create: (data: Record<string, any>) => api.post("/suppliers", data),
  update: (id: string, data: Record<string, any>) =>
    api.patch(`/suppliers/${id}`, data),
  remove: (id: string) => api.delete(`/suppliers/${id}`),
  toggle: (id: string) => api.patch(`/suppliers/${id}/toggle`),
};

export const menuApi = {
  listCategories: () => api.get<any[]>("/menu/categories"),
  createCategory: (data: Record<string, any>) =>
    api.post("/menu/categories", data),
  updateCategory: (id: string, data: Record<string, any>) =>
    api.patch(`/menu/categories/${id}`, data),
  removeCategory: (id: string) => api.delete(`/menu/categories/${id}`),
  listItems: (categoryId?: string) =>
    api.get<any[]>("/menu/items", { params: categoryId ? { categoryId } : {} }),
  createItem: (data: Record<string, any>) => api.post("/menu/items", data),
  updateItem: (id: string, data: Record<string, any>) =>
    api.patch(`/menu/items/${id}`, data),
  removeItem: (id: string) => api.delete(`/menu/items/${id}`),
  toggleItem: (id: string) => api.patch(`/menu/items/${id}/toggle`),
  popularItem: (id: string) => api.patch(`/menu/items/${id}/popular`),
};

export const businessApi = {
  portfolio: () => api.get<any>("/business/portfolio"),
  updatePortfolio: (data: Record<string, any>) =>
    api.patch("/business/portfolio", data),
  branches: () => api.get<any[]>("/business/branches"),
  createBranch: (data: Record<string, any>) => api.post("/business/branches", data),
  updateBranch: (id: string, data: Record<string, any>) =>
    api.patch(`/business/branches/${id}`, data),
  removeBranch: (id: string) => api.delete(`/business/branches/${id}`),
  toggleBranch: (id: string) => api.patch(`/business/branches/${id}/toggle`),
  gallery: () => api.get<any[]>("/business/gallery"),
  uploadGallery: (file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    return api.post<any>("/business/gallery", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  removeGallery: (id: string) => api.delete(`/business/gallery/${id}`),
  inquiries: () => api.get<any[]>("/business/inquiries"),
  markInquiryRead: (id: string) =>
    api.patch(`/business/inquiries/${id}/read`),
  replyInquiry: (id: string, reply: string) =>
    api.patch(`/business/inquiries/${id}/reply`, { reply }),
  stats: (params?: Record<string, any>) => api.get<any>("/business/stats", { params }),
  persistentCustomers: () => api.get<any[]>("/business/persistent-customers"),
};

export const cashierApi = {
  settings: () => api.get<any>("/cashier/settings"),
  updateSettings: (data: Record<string, any>) =>
    api.patch("/cashier/settings", data),
  toggleDate: () => api.patch("/cashier/toggle-date"),
  toggleQr: () => api.patch("/cashier/toggle-qr"),
};

export const reportsApi = {
  all: (params?: Record<string, any>) => api.get<any>("/reports/all", { params }),
  monthly: (month?: string) => api.get<any>("/reports/monthly", { params: month ? { month } : {} }),
  graph: (group: string = "day") => api.get<any>("/reports/graph", { params: { group } }),
  dailySales: () => api.get<any>("/reports/daily"),
};

export const settingsApi = {
  all: () => api.get<any>("/settings"),
  update: (data: Record<string, any>) => api.patch("/settings", data),
  toggleMaintenance: () => api.patch("/settings/maintenance"),
  updateKey: (key: string, value: any) => api.patch(`/settings/${key}`, { value }),
};

/* ========== الموارد البشرية: كل الطلبات تمر بمصادقة axios الموحدة ========== */
export const hrApi = {
  dashboard: () => api.get<any>("/hr/dashboard"),
  departments: () => api.get<any[]>("/hr/departments"),
  createDepartment: (data: Record<string, any>) => api.post("/hr/departments", data),
  updateDepartment: (id: string, data: Record<string, any>) => api.patch(`/hr/departments/${id}`, data),
  employees: (params?: { status?: string; branchId?: string }) => api.get<any[]>("/hr/employees", { params }),
  createEmployee: (data: Record<string, any>) => api.post("/hr/employees", data),
  updateEmployee: (id: string, data: Record<string, any>) => api.patch(`/hr/employees/${id}`, data),
  shifts: () => api.get<any[]>("/hr/shifts"),
  createShift: (data: Record<string, any>) => api.post("/hr/shifts", data),
  assignments: (date?: string) => api.get<any[]>("/hr/shift-assignments", { params: date ? { date } : {} }),
  assignShift: (data: Record<string, any>) => api.post("/hr/shift-assignments", data),
  updateAssignmentStatus: (id: string, status: string) => api.patch(`/hr/shift-assignments/${id}/status`, { status }),
  attendance: (date?: string) => api.get<any[]>("/hr/attendance", { params: date ? { date } : {} }),
  recordAttendance: (data: Record<string, any>) => api.post("/hr/attendance", data),
  leaves: (status?: string) => api.get<any[]>("/hr/leaves", { params: status ? { status } : {} }),
  requestLeave: (data: Record<string, any>) => api.post("/hr/leaves/request", data),
  reviewLeave: (id: string, data: { status: "approved" | "rejected"; reviewNote?: string }) => api.patch(`/hr/leaves/${id}/review`, data),
  payrollPeriods: () => api.get<any[]>("/hr/payroll-periods"),
  createPayrollPeriod: (data: Record<string, any>) => api.post("/hr/payroll-periods", data),
  upsertPayrollEntry: (periodId: string, data: Record<string, any>) => api.post(`/hr/payroll-periods/${periodId}/entries`, data),
  updatePayrollStatus: (periodId: string, status: "approved" | "paid") => api.patch(`/hr/payroll-periods/${periodId}/status`, { status }),
  employeeDocuments: (employeeProfileId: string) => api.get<any[]>(`/hr/employees/${employeeProfileId}/documents`),
  createDocument: (data: Record<string, any>) => api.post("/hr/documents", data),
};

export const publicApi = {
  businesses: () => api.get<any[]>("/public/businesses"),
  business: (id: string) => api.get<any>(`/public/businesses/${id}`),
  menu: (id: string) => api.get<any>(`/public/businesses/${id}/menu`),
  popular: (id: string) => api.get<any>(`/public/businesses/${id}/popular`),
  branches: (id: string) => api.get<any[]>(`/public/businesses/${id}/branches`),
  gallery: (id: string) => api.get<any[]>(`/public/businesses/${id}/gallery`),
  reviews: (id: string) => api.get<any[]>(`/public/businesses/${id}/reviews`),
  addReview: (id: string, data: Record<string, any>) =>
    api.post(`/public/businesses/${id}/reviews`, data),
  addFavorite: (businessId: string) =>
    api.post(`/public/favorites/${businessId}`),
  removeFavorite: (businessId: string) =>
    api.delete(`/public/favorites/${businessId}`),
  favorites: () => api.get<any[]>("/public/favorites"),
  submitInquiry: (data: Record<string, any>) =>
    api.post("/public/inquiries", data),
  publicReservation: (data: Record<string, any>) =>
    api.post("/public/reservations", data),
  topRated: () => api.get<any[]>("/public/top-rated"),
  mostBooked: () => api.get<any[]>("/public/most-booked"),
};

export const uploadsApi = {
  image: (file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    return api.post<any>("/uploads/image", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  images: (files: File[]) => {
    const fd = new FormData();
    files.forEach((f) => fd.append("images", f));
    return api.post<any[]>("/uploads/images", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

/* مسار الصور المرفوعة (الصور تُخدم من /images/filename) */
export function imageUrl(filename: string | null | undefined): string {
  if (!filename) return "";
  if (filename.startsWith("http")) return filename;
  const base = API_BASE.replace(/\/api$/, "");
  return `${base}/images/${filename}`;
}

/* الـ export الافتراضي لسهولة الاستخدام في الصفحات القديمة */
export default api;
