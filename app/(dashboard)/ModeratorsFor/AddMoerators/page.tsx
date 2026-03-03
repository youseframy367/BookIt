"use client";



import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddModerators() {
  const router = useRouter()
  const [imageSrc, setImageSrc] = useState('/img/trrruyeryer.svg');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    nameAr: '',
    titleAr: '',
    idNumber: '',
    confirmPassword: '',
    nameEn: '',
    titleEn: '',
    role: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setImageSrc(result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.nameAr || !formData.email) {
      alert('يرجى ملء الحقول المطلوبة');
      return;
    }

    const data = new FormData();
    data.append('nameAr', formData.nameAr);
    data.append('titleAr', formData.titleAr);
    data.append('idNumber', formData.idNumber);
    data.append('confirmPassword', formData.confirmPassword);
    data.append('nameEn', formData.nameEn);
    data.append('titleEn', formData.titleEn);
    data.append('role', formData.role);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      const response = await fetch('/api/add-moderator', {
        method: 'POST',
        body: data
      });
      if (response.ok) {
        alert('تم إضافة المشرف بنجاح');
      } else {
        alert('حدث خطأ في الإرسال');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('خطأ في الاتصال');
    }
  };

  return (
    <div className="m-2 bg-white rounded-2xl p-5 h-[85vh]">
      <p className="m-1 text-[#3D3D3D] font-semibold">إضافة مشرف</p>
      <div className="w-[98%] mx-[1%] mt-[3%] flex flex-col p-4 bg-[#FEFEFE] rounded-2xl shadow-[0_0_2px_0_rgba(0,0,0,0.25)]">
        <div className="w-full flex justify-between">
          <p className="text-[#131313] font-semibold">بيانات المشرف</p>
          <img src="/img/ewewewew.svg" width="16" height="16" alt="icon" />
        </div>
        <div className="flex justify-between my-5">
          <div className="ml-2 mt-10">
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
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-4.5">
              <label htmlFor="nameAr" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">اسم المشرف (AR)</label>
              <input
                type="text"
                name="nameAr"
                value={formData.nameAr}
                onChange={handleChange}
                className="text-[#8C94A3] text-sm font-normal w-[220px] h-[42px] border border-gray-300 rounded px-2"
                placeholder="أدخل اسم المشرف"
                required
              />
            </div>
            <div className="flex flex-col gap-4.5">
              <label htmlFor="titleAr" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">العنوان (AR)</label>
              <input
                type="text"
                name="titleAr"
                value={formData.titleAr}
                onChange={handleChange}
                className="text-[#8C94A3] text-sm font-normal w-[220px] h-[42px] border border-gray-300 rounded px-2"
                placeholder="أدخل العنوان"
                required
              />
            </div>
            <div className="flex flex-col gap-4.5">
              <label htmlFor="idNumber" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">رقم الهوية</label>
              <input
                type="numbr"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="text-[#8C94A3] text-sm font-normal w-[220px] h-[42px] border border-gray-300 rounded px-2"
                placeholder="أدخل رقم الهوية"
                required
              />
            </div>
            <div className="flex flex-col gap-4.5">
              <label htmlFor="confirmPassword" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">تأكيد كلمة المرور</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="text-[#8C94A3] text-sm font-normal w-[220px] h-[42px] border border-gray-300 rounded px-2"
                placeholder="أدخل كلمة المرور"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-4.5">
              <label htmlFor="nameEn" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">اسم المشرف (En)</label>
              <input
                type="text"
                name="nameEn"
                value={formData.nameEn}
                onChange={handleChange}
                className="text-[#8C94A3] text-sm font-normal w-[220px] h-[42px] border border-gray-300 rounded px-2"
                placeholder="أدخل اسم المشرف"
                required
              />
            </div>
            <div className="flex flex-col gap-4.5">
              <label htmlFor="titleEn" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">العنوان (En)</label>
              <input
                type="text"
                name="titleEn"
                value={formData.titleEn}
                onChange={handleChange}
                className="text-[#8C94A3] text-sm font-normal w-[220px] h-[42px] border border-gray-300 rounded px-2"
                placeholder="أدخل العنوان"
                required
              />
            </div>
            <div className="flex flex-col gap-4.5">
              <label htmlFor="role" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">الدور</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="text-[#8C94A3] text-sm font-normal w-[220px] h-[42px] border border-gray-300 rounded px-2 bg-white"
                required
              >
                <option value="" disabled>حدد الدور</option>
                <option value="مشرف">مشرف</option>
                <option value="سيلز">سيلز</option>

              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-4.5">
              <label htmlFor="phone" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">رقم الجوال</label>
              <input
                type="numbr"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="text-[#8C94A3] text-sm font-normal w-[220px] h-[42px] border border-gray-300 rounded px-2"
                placeholder="أدخل رقم الجوال"
                required
              />
            </div>
            <div className="flex flex-col gap-4.5">
              <label htmlFor="email" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-[#8C94A3] text-sm font-normal w-[220px] h-[42px] border border-gray-300 rounded px-2"
                placeholder="أدخل البريد الإلكتروني"
                required
              />
            </div>
            <div className="flex flex-col gap-4.5">
              <label htmlFor="password" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">كلمة المرور</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="text-[#8C94A3] text-sm font-normal w-[220px] h-[42px] border border-gray-300 rounded px-2"
                placeholder="أدخل كلمة المرور"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[94%] m-[3%] flex justify-between">
        <button className="text-[#6E7485] text-base font-semibold tracking-[-1%] bg-white border border-[#E9EAF0] w-[81px] h-12 rounded-xl flex justify-center items-center"
          onClick={() => {
            router.push("/ModeratorsFor/AllMoerators")
          }}>
          إلغاء
        </button>
        <button
          onClick={handleSubmit}
          style={{
            background: "#183866"
          }}

          className="text-white w-[100px] h-12 rounded-xl flex justify-center items-center text-base font-medium tracking-[-1%]"
        >
          إضافة
        </button>
      </div>
    </div>
  );
}