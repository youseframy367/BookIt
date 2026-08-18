"use client";

/* ============================== تعديل المشرف — داتا حقيقية ==============================
   المصدر: PATCH /api/users/:id → تحديث بيانات المستخدم
   + PATCH /api/users/:id/status → تفعيل/إيقاف الحساب
   + رفع الصورة: POST /api/uploads/image ثم تمرير الرابط في avatar
   ============================================================================ */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AddAndUploadData from "@/app/components/Dashborad/AddAndUploadData";
import api from "@/utils/api";

export default function AddModerators() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState('/img/trrruyeryer.svg');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev: any) => setImageSrc(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const [formData, setFormData] = useState({
    stateAcunt: true
  });

  /* === بيانات النموذج الحقيقية === */
  const [userId, setUserId] = useState<string | null>(null);
  const [form, setForm] = useState({
    nameAr: "",
    email: "",
    phone: "",
    site: "",
    nationalId: "",
    titleAr: "",
  });
  const set = (k: string) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));

  /* نقرأ بيانات المستخدم من sessionStorage (المررّرة من صفحة كل المشرفين) */
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("dateAcuntModetor");
      const m = raw ? JSON.parse(raw) : null;
      if (m?.id) {
        setUserId(m.id);
        setForm({
          nameAr: m.nameAr || m.name || "",
          email: m.email || "",
          phone: m.phone || m.numperPone || "",
          site: m.site || m.title || "",
          nationalId: m.nationalId || m.idNumber || "",
          titleAr: m.titleAr || "",
        });
        if (m.avatar) setImageSrc(m.avatar);
      }
    } catch (e) {
      console.error("فشل قراءة بيانات المشرف:", e);
    }
  }, []);

  /* تحديث بيانات المشرف عبر PATCH /users/:id */
  const handleSubmit = async () => {
    if (!userId) return toast.error("لم يتم تحديد المستخدم");
    try {
      let avatar: string | undefined;
      if (imageFile) {
        const { data } = await api.post("/uploads/image", (() => {
          const fd = new FormData();
          fd.append("image", imageFile);
          return fd;
        })(), { headers: { "Content-Type": "multipart/form-data" } });
        avatar = data?.url || data?.path || undefined;
      }
      await api.patch(`/users/${userId}`, {
        nameAr: form.nameAr || undefined,
        email: form.email || undefined,
        phone: form.phone || undefined,
        site: form.site || undefined,
        nationalId: form.nationalId || undefined,
        titleAr: form.titleAr || undefined,
        avatar,
      });
      toast.success("تم تحديث بيانات المشرف بنجاح ✅");
      router.push("/ModeratorsFor/AllMoerators");
    } catch (e: any) {
      console.error("Failed to update:", e);
      const msg = e?.response?.data?.message;
      toast.error(Array.isArray(msg) ? msg.join("، ") : (msg || "حدث خطأ أثناء التحديث ❌"));
    }
  };

  /* تفعيل/إيقاف الحساب عبر PATCH /users/:id/status */
  const handleToggle = async () => {
    if (!userId) return toast.error("لم يتم تحديد المستخدم");
    try {
      await api.patch(`/users/${userId}/status`);
      setFormData((d) => ({ ...d, stateAcunt: !d.stateAcunt }));
      toast.success(formData.stateAcunt ? "تم إيقاف الحساب" : "تم تفعيل الحساب");
    } catch (e: any) {
      console.error("Failed to toggle:", e);
      toast.error("حدث خطأ أثناء تغيير حالة الحساب ❌");
    }
  };

  return (
    <AddAndUploadData title="تعديل تفاصيل المشرف" isTureUpdateTitle="ايقاف الحساب" isFalseUpdateTitle="تفعيل الحساب" isShowUpdate>
      <div className="rounded-[20px] ml-2 flex justify-center items-center flex-col bg-[var(--color-gray-seven)]">
        <img src={imageSrc} width="163px" height="164px" alt="معاينة الصورة" />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="flex justify-center items-center bg-[rgba(19,19,19,0.5)] text-white text-xs font-medium gap-2.5 w-[163px] h-8 rounded-lg -mt-7.5 relative z-[99] cursor-pointer"
        >
          <img src="/img/UploadSimple.svg" alt="أيقونة تحميل" />
          تحميل الصورة
        </label>
        <p className="text-[#6E7485] font-normal text-xs w-[178px] text-center mt-5">
          يجب أن يكون حجم الصورة أقل من 1 ميجا بايت ويجب أن تكون نسبة الصورة 1:1
        </p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[17px]">
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">اسم المستخدم</label>
            <input
              type="text"
              value={form.nameAr}
              onChange={set("nameAr")}
              className="text-[#8C94A3] text-sm font-normal h-[42px] border border-gray-300 rounded-[8px] px-2"
              placeholder="محمد محمود"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">البريد الالكتروني</label>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="ادخل البريد الالكتروني"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">رقم جوال</label>
            <input
              type="number"
              value={form.phone}
              onChange={set("phone")}
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="ادخل رقم الجوال"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">العنوان</label>
            <input
              type="text"
              value={form.site}
              onChange={set("site")}
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="الرياض"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">رقم الهوية</label>
            <input
              type="number"
              value={form.nationalId}
              onChange={set("nationalId")}
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="10203040506"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px]">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">الحالة</label>
            <input
              type="text"
              style={{
                color: formData.stateAcunt ? "#23BD33" : "#FF3A3A",
              }}
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="نشط"
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">المسمي الوظيفي</label>
            <input
              type="text"
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="مشرف عام"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">المسمي الوظيفي</label>
            <input
              type="text"
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="كل الصلاحيات"
              required
            />
          </div>
        </div>
      </div>

      {/* أزرار الحفظ والتفعيل/الإيقاف */}
      <div className="w-[94%] m-[3%] flex justify-end gap-[10px]">
        <button
          className="text-[#fff] bg-[#183866] text-base font-semibold tracking-[-1%] w-[100px] h-12 rounded-xl flex justify-center items-center"
          onClick={handleSubmit}
        >
          حفظ
        </button>
        <button
          className="text-[#fff] text-base font-semibold tracking-[-1%] w-[120px] h-12 rounded-xl flex justify-center items-center"
          style={{ background: formData.stateAcunt ? "#FF3A3A" : "#23BD33" }}
          onClick={handleToggle}
        >
          {formData.stateAcunt ? "ايقاف الحساب" : "تفعيل الحساب"}
        </button>
      </div>
    </AddAndUploadData>
  )
}