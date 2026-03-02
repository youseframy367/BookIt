"use client";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckAcunt from "../checkChangStateAcunt";
export default function UpdateModerators() {
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [formData, setFormData] = useState({
    nameAr: '',
    titleAr: '',
    idNumber: '',
    role: '',
    phone: '',
    email: '',
    id: "",
    stateAcunt: false
  });
  const [imageSrc, setImageSrc] = useState('/img/trrruyeryer.svg');
  const [imageFile, setImageFile] = useState(null);
  const [check, setCheck] = useState(false);
  const [typeAcunt, setTypeAcount] = useState("");

  useEffect(() => {
    const data = window.sessionStorage.getItem("dateAcuntModetor");
    if (data) {
      const parsed = JSON.parse(data);
      setInitialData(parsed);
      setFormData({
        nameAr: parsed.name || '',
        titleAr: parsed.title || '',
        idNumber: parsed.idNumber || '',
        role: parsed.nameGop || '',
        phone: parsed.numperPone || '',
        email: parsed.email || '',
        stateAcunt: parsed.acount || false,
        id: parsed.id
      });
      setImageSrc(parsed.img || '/img/trrruyeryer.svg');
      setTypeAcount(parsed.acount ? "نشط" : "حساب معطل");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImageSrc(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.nameAr || !formData.email) {
      alert('يرجى ملء الحقول المطلوبة');
      return;
    }

    const data = new FormData();
    data.append('id', initialData.id);
    data.append('nameAr', formData.nameAr);
    data.append('titleAr', formData.titleAr);
    data.append('idNumber', formData.idNumber);
    data.append('role', formData.role);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append("acountState", formData.stateAcunt);
    if (imageFile) data.append('image', imageFile);

    try {
      const response = await fetch('/api/update-moderator', {
        method: 'PUT',
        body: data
      });
      if (response.ok) alert('تم تحديث المشرف بنجاح');
      else alert('حدث خطأ في التحديث');
    } catch (err) {
      console.error(err);
      alert('خطأ في الاتصال');
    }
  };

  if (!initialData) return (
    <div className="w-[94%] m-[2%] bg-white rounded-[11px] p-[15px] h-[85vh] flex items-center justify-center">
      جارٍ تحميل بيانات المشرف...
    </div>
  );


  return (
    <div className=" w-[98%] m-[1%] bg-[#fff] rounded-[11px] p-[15px] h-[85vh]">
      {check && (
          <CheckAcunt
          typeAcunt={formData.stateAcunt}
          onClose={() => setCheck(false)}
          onConfirm={() => {
            setFormData(prev => ({ ...prev, stateAcunt: !prev.stateAcunt }));
          setCheck(false);
          }}
        />

      

      )}


      <div className="w-[97%] mx-[1%] mt-[3%] flex flex-col p-[10px] bg-[#FEFEFE] rounded-[10px] shadow-[0_0_2px_0_rgba(0,0,0,0.25)]">
        <div className="w-[100%] flex justify-between items-center">
          <p className="text-[#131313] font-semibold">تعديل تفاصيل المشرف</p>
          <button className="py-[18px] px-[24px] bg-[#F3F5F7] text-[12px] text-[500]" style={{
            color: formData.stateAcunt ? "#183866" : "#FF3A3A",
          }}
            onClick={() => {
              setCheck(true)

            }}>
            {formData.stateAcunt ? "ايقاف الحساب" : "اعادة تفعيل الحساب"}
          </button>
        </div>
        <div className="flex justify-between my-[10px]">
          <div className="ml-[8px] mt-[35px]">
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
                className="flex justify-center items-center bg-[rgba(19,19,19,0.5)] text-[#fff] text-xs font-medium gap-[10px] w-[163px] h-[34px] rounded-[10px] mt-[-34px] relative z-[99] cursor-pointer"
              >
                <img src="/img/UploadSimple.svg" alt="أيقونة تحميل" />
                تحميل الصورة
              </label>
            </div>
            <p className="text-[#6E7485] text-[400] text-[10px] w-[178px] text-center mt-[15px]">
              يجب أن يكون حجم الصورة أقل من 1 ميجا بايت ويجب أن تكون نسبة الصورة 1:1
            </p>
          </div>
          <div className="flex flex-col gap-[10px] ml-[40px]">
            <div className="flex flex-col gap-[18px]">
              <label htmlFor="nameAr" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">اسم المستخدم</label>
              <input
                type="text"
                name="nameAr"
                value={formData.nameAr}
                onChange={handleChange}
                className="text-[#8C94A3] text-[12px] font-normal w-[290px] h-[42px] border border-gray-300 rounded px-[5px]"
                placeholder="أدخل اسم المستخدم"
                required
              />
            </div>
            <div className="flex flex-col gap-[18px]">
              <label htmlFor="phone" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">رقم الجوال</label>
              <input
                type="numer"
                name="phone"
                value={initialData.numperPone}
                onChange={handleChange}
                className="text-[#8C94A3] text-[12px] font-normal w-[290px] h-[42px] border border-gray-300 rounded px-[5px]"
                placeholder="أدخل رقم الجوال"
                required
              />
            </div>
            <div className="flex flex-col gap-[18px]">
              <label htmlFor="idNumber" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">رقم الهوية</label>
              <input
                type="numbr"
                name="idNumber"
                value={initialData.idNumber}
                onChange={handleChange}
                className="text-[#8C94A3] text-sm font-normal w-[290px] h-[42px] border border-gray-300 rounded px-[5px]"
                placeholder="أدخل رقم الهوية"
                required
              />
            </div>
            <div className="flex flex-col gap-[18px]">
              <label htmlFor="role" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">الدور</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="text-[#8C94A3] text-sm font-normal w-[290px] h-[42px] border border-gray-300 rounded px-[5px] bg-white"
                required
              >
                <option value="" disabled>حدد الدور</option>
                <option value="مشرف">مشرف</option>
                <option value="سيلز">سيلز</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-[10px] ml-[30px]">
            <div className="flex flex-col gap-[18px]">
              <label htmlFor="email" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                dir="ltr"
                className="text-[#8C94A3] text-sm font-normal w-[290px] h-[42px] border border-gray-300 rounded px-[5px]"
                placeholder="أدخل البريد الإلكتروني"
                required
              />
            </div>
            <div className="flex flex-col gap-[18px]">
              <label htmlFor="titleAr" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">العنوان (AR)</label>
              <input
                type="text"
                name="titleAr"
                value={formData.titleAr}
                onChange={handleChange}
                className="text-[#8C94A3] text-sm font-normal w-[290px] h-[42px] border border-gray-300 rounded px-[5px]"
                placeholder="أدخل العنوان"
                required
              />
            </div>
            <div className="flex flex-col gap-[18px]">
              <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">حالة الحساب</label>
              <input
                type="text"
                value={typeAcunt}
                style={{
                  color: formData.stateAcunt ? "#23BD33" : "#FF3A3A",
                }}
                className="text-sm font-normal w-[290px] h-[42px] border border-gray-300 rounded px-[5px] bg-gray-100"
                readOnly
              />
            </div>



            <div className="flex flex-col gap-[18px]">
              <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">حالة الحساب</label>
              <input
                type="text"

                value={initialData.Powers}

                className="text-sm font-normal w-[290px] h-[42px] border border-gray-300 rounded px-[5px] bg-gray-100"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[94%] m-[3%] flex justify-between">
        <button className="text-[#6E7485] text-base font-semibold tracking-[-1%] bg-white border border-[#E9EAF0] w-[81px] h-12 rounded-xl flex justify-center items-center"
          onClick={() => {
            router.push("./ModeratorsFor/AllMoerators")
          }}>
          إلغاء
        </button>
        <button
          onClick={() => {
            handleSubmit();
          }}

          style={{
            background: "#183866"
          }}
          className=" text-[#fff] w-[100px] h-12 rounded-xl flex justify-center items-center text-base font-medium tracking-[-1%]"
        >
          حفظ
        </button>
      </div>
    </div>
  );
}