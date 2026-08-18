"use client";

/* ============================== إضافة مشرف — داتا حقيقية ==============================
   المصدر: POST /api/users → إنشاء مستخدم (مشرف/سيلز/مدير) باسم الأونر
   + رفع الصورة عبر POST /api/uploads/image ثم تمرير الرابط في avatar
   ============================================================================ */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AddAndUploadData from "@/app/components/Dashborad/AddAndUploadData";
import api from "@/utils/api";
import { usersApi, rolesApi, businessApi } from "@/utils/api";

export default function AddModerators() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState('/img/trrruyeryer.svg');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);

  /* بيانات النموذج */
  const [form, setForm] = useState({
    nameAr: "",
    phone: "",
    nationalId: "",
    email: "",
    roleId: "",
    password: "",
    confirmPassword: "",
  });

  const set = (k: string) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));

  /* نجلب الأدوار والفروع الحقيقية لملئ الـ selects */
  useEffect(() => {
    (async () => {
      try {
        const [r, b] = await Promise.all([rolesApi.list(), businessApi.branches()]);
        setRoles(Array.isArray(r.data) ? r.data : []);
        setBranches(Array.isArray(b.data) ? b.data : []);
      } catch (e) {
        console.error("فشل تحميل الأدوار/الفروع:", e);
      }
    })();
  }, []);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev: any) => setImageSrc(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  /* حفظ المشرف عبر الـ API */
  const handleSubmit = async () => {
    /* تحقق بسيط من صحة البيانات */
    if (!form.nameAr.trim() || !form.email.trim() || !form.password) {
      return toast.error("يرجى ملء الاسم والبريد وكلمة المرور");
    }
    if (form.password !== form.confirmPassword) {
      return toast.error("كلمة المرور غير متطابقة");
    }
    try {
      let avatar: string | undefined;
      if (imageFile) {
        /* رفع الصورة والحصول على رابطها */
        const { data } = await api.post("/uploads/image", (() => {
          const fd = new FormData();
          fd.append("image", imageFile);
          return fd;
        })(), { headers: { "Content-Type": "multipart/form-data" } });
        avatar = data?.url || data?.path || undefined;
      }
      /* إنشاء المستخدم: اسم، بريد، باسوورد (الباك يعمل hash تلقائي)، هاتف، هوية، دور، صورة */
      await usersApi.create({
        nameAr: form.nameAr,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
        nationalId: form.nationalId || undefined,
        roleId: form.roleId || undefined,
        avatar,
      });
      toast.success("تم إضافة المشرف بنجاح ✅");
      router.push("/ModeratorsFor/AllMoerators");
    } catch (e: any) {
      console.error("Failed to create:", e);
      const msg = e?.response?.data?.message;
      toast.error(Array.isArray(msg) ? msg.join("، ") : (msg || "حدث خطأ أثناء الإضافة ❌"));
    }
  };

  return (
    <AddAndUploadData title="اضافة مشرف" subTitle="بيانات المشرف" shadow="shadow-[0_0_2px_0_rgba(0,0,0,0.25)]">
      <div className="rounded-[20px] ml-2 flex justify-center items-center flex-col bg-[var(--color-gray-seven)]">
        <div className="relative w-[163px]">
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
        </div>
        <p className="text-[#6E7485] font-normal text-xs w-[178px] text-center mt-5">
          يجب أن يكون حجم الصورة أقل من 1 ميجا بايت ويجب أن تكون نسبة الصورة 1:1
        </p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[17px]">
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">اسم المشرف (AR)</label>
            <input
              type="text"
              value={form.nameAr}
              onChange={set("nameAr")}
              className="text-[#8C94A3] text-sm font-normal h-[42px] border border-gray-300 rounded-[8px] px-2"
              placeholder="أدخل اسم المشرف"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">عنوان الفرع</label>
            <select required className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full">
              {branches.map((b: any) => (
                <option key={b.id} value={b.id}>{b.nameAr || b.name}</option>
              ))}
            </select>
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
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">رقم الهوية </label>
            <input
              type="number"
              value={form.nationalId}
              onChange={set("nationalId")}
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="ادخل رقم الهوية"
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
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">الدور</label>
            <select value={form.roleId} onChange={set("roleId")} required className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full">
              {roles.map((r: any) => (
                <option key={r.id} value={r.id}>{r.nameAr || r.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">كلمة المرور</label>
            <input
              type="password"
              value={form.password}
              onChange={set("password")}
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="ادخل كلمة المرور"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs"> تأكيد كلمة المرور</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={set("confirmPassword")}
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="ادخل كلمة المرور"
              required
            />
          </div>
        </div>

        {/* زر حفظ: يرسل البيانات للباك إند ويحفظها في قاعدة البيانات */}
        <div className="w-full flex justify-end mt-[20px]">
          <button
            className="cursor-pointer text-[#fff] bg-[#183866] flex items-center justify-center px-6 py-2 rounded-lg text-[12px] font-medium h-[42px]"
            onClick={handleSubmit}
          >
            حفظ
          </button>
        </div>
      </div>
    </AddAndUploadData>
  )
}