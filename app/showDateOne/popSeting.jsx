"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PopSeting({ data, onClose }) {
  const router=useRouter();
  const [showPassOne, setShowPassOne] = useState(false);
  const [showPassTwo, setShowPassTwo] = useState(false);
  const [showPassThree, setShowPassThree] = useState(false);




  const [typePop, setTypePop] = useState("");











  // ✅ حالات إدخال كلمة المرور
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ دالة الإرسال للباك
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("كلمة المرور الجديدة وتأكيدها غير متطابقين ❌");
      return;
    }

    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (!res.ok) throw new Error("حدث خطأ أثناء تغيير كلمة المرور");

      const data = await res.json();
      alert("تم تغيير كلمة المرور بنجاح ✅");
      setTypePop("");
      onClose();
    } catch (err) {
      console.error(err);
      alert("تعذر تغيير كلمة المرور ⚠️");
    }
  };

  const handleInnerClick = (e) => e.stopPropagation();








  return (
    <div
      className={`${
        typePop === "changePassword"||"technicalSupport"
          ? "flex justify-center items-center fixed top-[70px] left-0 p-[0px]  w-[100%] h-[100%] bg-[#1D1D1D99] z-[999]"
          : "fixed top-[70px] left-0 w-[100%] h-[100%] bg-[#1D1D1D99] z-[999]"
      }`}
      onClick={onClose}
    >
      {/* -------------------------------- Main PopUp -------------------------------- */}
      {typePop === "" && (
        <div
          className="absolute top-[10px] w-[316px] h-[259px] p-[0px] bg-[#fff]  shadow-[0_0px_2px_rgba(0,0,0,0.25)] rounded-[12px] left-[10px]  flex flex-col shadow-[0_0px_2px_rgba(0,0,0,0.25)]"
          onClick={handleInnerClick}
        >
          {/* Header */}
          <div className="flex gap-[16px] items-center p-[10px] px-[15px]">
            <img src={data.img} className="w-[36px] h-[36px]" />
            <div className="flex flex-col gap-[8px]">
              <p className="text-[10px] font-[500] text-[#3D3D3D]">{data.name}</p>
              <p className="text-[8px] font-[400] text-[rgba(61,61,61,0.8)]">
                {data.email}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="w-full border-t-[1px] border-[#1717170D] flex flex-col gap-[8px] py-[8px] px-[4px] mt-[6px] ">
            <p className="font-[400] text-[10px] text-[#3D3D3D] flex gap-[8px] p-[12px] mx-[10px]  rounded-[4px]"
            onClick={()=>{
              onClose()
              router.push("/showDateOne/Portfolio")
            }}>
              <img src="/img/ollll.svg" />
              عرض الملف الشخصى
            </p>

            <p
              className="font-[400] text-[10px] text-[#3D3D3D] flex gap-[8px] mx-[10px] p-[12px] rounded-[4px]"
              onClick={() => setTypePop("changePassword")}
            >
              <img src="/img/gggg.svg" />
              تغيير كلمة المرور
            </p>


              <p
              className="font-[400] text-[10px] text-[#3D3D3D] flex gap-[8px] mx-[10px] p-[12px] rounded-[4px]"
              onClick={() => setTypePop("technicalSupport")}
            >
              <img src="/img/ChatCircleDots.svg" />
             الدعم الفنى
            </p>

<hr className="w-[100%] h-[1px] bg-[#f5f1f1] border-none m-[0px]"></hr>

            <p className="font-[600]  text-[10px] text-[#2A50BB] flex gap-[8px] mx-[10px] p-[12px] rounded-[0px] m-[-7px] w-[100%]  ">
              <img src="/img/حطتنح.svg" />
              تسجيل الخروج
            </p>
            </div>
           
        </div>
      )}

      {/* ----------------------------- Change Password Pop ---------------------------- */}
    {typePop === "changePassword" && (
  <form
    onSubmit={handleSubmit}
    className="w-[448px] h-[494px] rounded-[20px] bg-[#fff] p-[24px]"
    onClick={handleInnerClick}
  >
          {/* Header */}
          <div className="flex justify-between items-center">
            <p className="font-[600] text-[#131313]">تغير كلمة المرور</p>
            <img src="/img/;;.svg" className="cursor-pointer ml-[20px]" onClick={onClose} />
          </div>

          {/* Password Input */}
          <div className="mt-[20px] flex flex-col gap-[12px] ">
            <label className="text-[12px] font-[600] text-[#131313]">
              كلمة المرور الحالية
            </label>
            <div className="relative w-full  mt-[8px] m-[0px]">
              <input
                type={showPassOne ? "text" : "password"}
                   value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                placeholder="ادخل كلمة المرور الحاليه"
                className="w-full px-2 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none shadow-sm transition"
              />
              <button
                type="button"
                onClick={() => setShowPassOne(!showPassOne)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassOne ? "🙈" : "👁️"}
              </button>
            </div>
          </div>


 <div className="mt-[20px] flex flex-col gap-[12px]">
            <label className="text-[12px] font-[600] text-[#131313]">
              كلمة المرور الجديده
            </label>
            <div className="relative w-full  mt-[8px] m-[0px]">
              <input
                type={showPassTwo ? "text" : "password"}
                 value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                placeholder="ادخل كلمة المرور "
                className="w-full px-2 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none shadow-sm transition"
              />
              <button
                type="button"
                onClick={() => setShowPassTwo(!showPassTwo)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassTwo ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

           <div className="mt-[20px] flex flex-col gap-[12px]">
            <label className="text-[12px] font-[600] text-[#131313]">
             تأكيد كلمة المرور الجديده 
            </label>
            <div className="relative w-full  mt-[8px] m-[0px]">
              <input
                type={showPassThree ? "text" : "password"}
                   value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="ادخل كلمة المرور "
                className="w-full px-2 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none shadow-sm transition"
              />
              <button
                  type="button"
                  onClick={() => setShowPassThree(!showPassThree)}
            
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassThree ? "🙈" : "👁️"}
              </button>
            </div>
               <button
                  type="submit"
                  className="w-[400px] h-[48px] bg-[#183866] text-[#fff] rounded-[12px] text-[14px] font-[600] mt-[20px]"
                >
                  حفظ
                </button>
          </div>
      


        </form>
      )}
      {typePop==="technicalSupport" &&(
        <form 
            onClick={handleInnerClick}

        className="w-[448px] h-[609px] rounded-[20px] bg-[#fff] flex flex-col gap-[24px] p-[20px]">

            {/* Header */}
          <div className="flex justify-between items-center mt-[15px]">
            <p className="font-[600] text-[#131313]">استفسار لخدمه العملا </p>
            <img src="/img/;;.svg" className="cursor-pointer ml-[20px]" onClick={onClose} />
          </div>
          <div className=" flex flex-col gap-[32px]">

          <div className="flex flex-col gap-[12px]">
            <label htmlFor="Email" className="text-[12px] font-[600] text-[#131313]">ادخل البريد الالكترونى</label>
            <input type='email' id="Email" placeholder="ادخل البريد " required className="w-[400] h-[48px] bg-[#fff]   border-[1px] border-[#f0eeee] text-[14px] font-[400] text-[#13131340] px-[10px] rounded-[10px]"></input>
          </div>

             <div className="flex flex-col gap-[12px]">
            <label htmlFor="num" className="text-[12px] font-[600] text-[#131313]">ادخل رقم الهاتف</label>
            <input type='numer' id="num" placeholder="ادخل رقم الهاتف " required className="w-[400] h-[48px] bg-[#fff]  border-[1px] border-[#f0eeee] text-[14px] font-[400] text-[#13131340] px-[10px] rounded-[10px]"></input>
          </div>
          <div className="flex flex-col gap-[12px]">
            <label htmlFor="inq" className="text-[12px] font-[600] text-[#131313]">ادخل استفسارك </label>
            <textarea id="inq" rows={10} className="w-[400px] h-[160px]   bg-[#fff]  border-[1px] border-[#f0eeee] rounded-[10px] p-[10px]" ></textarea>
            </div>
</div>
          <button className="w-[400px] h-[48px] mt-[10px] bg-[#183866] text-[#fff] rounded-[12px] flex justify-center items-center gap-3">ارسال <img src="/img/paper-plane 1.png"></img></button>
        </form>
      )}
    </div>
  );
}
