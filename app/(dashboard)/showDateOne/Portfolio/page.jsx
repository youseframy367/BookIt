"use client";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { QRCodeCanvas } from "qrcode.react";
export default function Portfolio() {
  //////////////////////////////////////////////////
  //////link of site
  //////////////////////////////////////////////
  const link = `
  https://www.restaurant-management-system-t...
`

  /////////////////////////////////////////////////////

  // downlod qr code
  ////////////////////////////////////////////////////////

  const qrRef = useRef(null);

  const downloadQR = () => {
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png").replace(
        "image/png",
        "image/octet-stream"
      );

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qr-code.png";
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgStr);
  };



  const [dataPortfolio, setDataPortfolio] = useState({
    placeName: "قصر الكبابجى",
    site: "القاهره",
    email: "youssefRamy@gmail.com",
    numPon: "010 2352 2063",
    lastNumPon: "0102358890",
    TypeOfTrade: "حساب خاص بمطعم",
    image: "/img/lkhgkjggujk.svg",
  });

  const [disabledInputs, setDisabledInputs] = useState({
    placeName: true,
    site: true,
    email: true,
    numPon: true,
    lastNumPon: true,
    TypeOfTrade: true,
  });

  const [newImageFile, setNewImageFile] = useState(null);

  // إندفاع (debounce) لتجنب إرسال طلب API مع كل ضغطة مفتاح
  const debounceTimer = useRef(null);

  // فتح input معين عند الضغط على صورته
  const handleEditClick = (key) => {
    setDisabledInputs((prev) => ({ ...prev, [key]: false }));
  };

  // تعديل أي input وإرسال البيانات للباك بعد توقف المستخدم عن الكتابة (500ms)
  const handleInputChange = (key, value) => {
    const updatedData = { ...dataPortfolio, [key]: value };
    setDataPortfolio(updatedData);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      try {
        await fetch("/api/update-portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });
        console.log(`${key} updated`);
      } catch (err) {
        console.error(err);
      }
    }, 500);
  };

  // تعديل الصورة وإرسالها للباك
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast.error("حجم الصورة أكبر من 1 ميجا بايت ❌");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width !== img.height) {
        toast.error("يجب أن تكون نسبة الصورة 1:1 ❌");
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        const updatedData = { ...dataPortfolio, image: reader.result };
        setDataPortfolio(updatedData);
        setNewImageFile(file);

        const formData = new FormData();
        formData.append("image", file);
        formData.append("data", JSON.stringify(updatedData));

        try {
          await fetch("/api/update-portfolio", {
            method: "POST",
            body: formData,
          });
          console.log("Image updated");
        } catch (err) {
          console.error(err);
        }
      };
      reader.readAsDataURL(file);
    };
  };

  return (
    <div className="w-[98%] m-[1%] h-auto md:h-[100vh] bg-[#fff] rounded-[16px] shadow-[0_1px_6px_#E5E9F2] p-[20px]">
      <p className="text-[18px] font-[600] text-[#3D3D3D] m-[10px]">تعديل تفاصيل المعاين</p>

      <div className="flex gap-[15px]">
        <div className="w-[90%] md:w-[264px] h-[316px] bg-[#F4F4FE] rounded-[20px] m-[10px] mt-[20px] relative">
          <label className="flex relative translate-x-[-1rem] translate-y-[1rem] z-10 justify-center items-center gap-[8px] bg-[#fff] w-[89px] h-[36px] rounded-[8px] shadow-[0_1px_1px_rgba(0,0,0,0.25)] cursor-pointer">
            <img src="/img/نمالمخهناه.svg" width="14px" height="14px" />
            <p>تعديل</p>
            <input
              type="file"
              accept="image/*"
              className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </label>

          <img
            src={dataPortfolio.image}
            width="200px"
            height="200px"
            className="mx-auto rounded-[14px]"
          />
          <p className="text-[12px] font-[400] text-[#6E7485] leading-[16px] mx-[32px] my-[20px] text-center">
            يجب أن يكون حجم الصورة أقل من 1 ميجا بايت ويجب أن تكون نسبة الصورة 1:1
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-[80%] gap-[10px] mt-[10px]">
          <div className="flex flex-col gap-[6px] relative">
            <label className="text-[14px] font-[400] text-[#131313]">اسم المكان التجارى</label>
            <input
              type="text"
              value={dataPortfolio.placeName}
              disabled={disabledInputs.placeName}
              onChange={(e) => handleInputChange("placeName", e.target.value)}
              className=" text-[16px] font-[400] text-[#8C94A3] w-[100%] h-[48px] rounded-[8px] px-[5px] border-[#E9EAF0] border-[1px] outline-none"
            />
            <img
              src="/img/نمالمخهناه.svg"
              className="w-[16px] h-[16px] absolute top-[50px] right-[10px] -translate-y-1/2 cursor-pointer z-30"
              alt="Edit"
              onClick={() => handleEditClick("placeName")}
            />
          </div>

          <div className="flex flex-col gap-[6px] relative">
            <label className="text-[14px] font-[400] text-[#131313]">موقع المكان التجارى</label>
            <input
              type="text"
              value={dataPortfolio.site}
              disabled={disabledInputs.site}
              onChange={(e) => handleInputChange("site", e.target.value)}
              className=" text-[16px] font-[400] text-[#8C94A3] w-[100%] h-[48px] rounded-[8px] px-[5px] border-[#E9EAF0] border-[1px] outline-none"
            />
            <img
              src="/img/نمالمخهناه.svg"
              className="w-[16px] h-[16px] absolute top-[50px] right-[10px] -translate-y-1/2 cursor-pointer z-30"
              alt="Edit"
              onClick={() => handleEditClick("site")}
            />
          </div>

          <div className="flex flex-col gap-[6px] relative">
            <label className="text-[14px] font-[400] text-[#131313]">البريد الالكترونى</label>
            <input
              dir="ltr"
              type="text"
              value={dataPortfolio.email}
              disabled={disabledInputs.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className=" text-[16px] font-[400] text-[#8C94A3] w-[100%]  h-[48px] rounded-[8px] px-[5px] border-[#E9EAF0] border-[1px] outline-none"
            />
            <img
              src="/img/نمالمخهناه.svg"
              className="w-[16px] h-[16px] absolute top-[50px] right-[5%] -translate-y-1/2 cursor-pointer z-30"
              alt="Edit"
              onClick={() => handleEditClick("email")}
            />
          </div>

          <div className="flex flex-col gap-[6px] relative">
            <label className="text-[14px] font-[400] text-[#131313]">رقم الجوال</label>
            <input
              type="text"
              value={dataPortfolio.numPon}
              disabled={disabledInputs.numPon}
              onChange={(e) => handleInputChange("numPon", e.target.value)}
              className=" text-[16px] font-[400] text-[#8C94A3] w-[100%] h-[48px] rounded-[8px] px-[5px] border-[#E9EAF0] border-[1px] outline-none"
            />
            <img
              src="/img/نمالمخهناه.svg"
              className="w-[16px] h-[16px] absolute top-[50px] right-[10px] -translate-y-1/2 cursor-pointer z-30"
              alt="Edit"
              onClick={() => handleEditClick("numPon")}
            />
          </div>

          <div className="flex flex-col gap-[6px] relative">
            <label className="text-[14px] font-[400] text-[#131313]">نوع التجاره</label>
            <input
              type="text"
              value={dataPortfolio.TypeOfTrade}
              disabled={disabledInputs.TypeOfTrade}
              onChange={(e) => handleInputChange("TypeOfTrade", e.target.value)}
              className=" text-[16px] font-[400] text-[#23BD33] w-[100%] h-[48px] rounded-[8px] px-[5px] border-[#E9EAF0] border-[1px] outline-none"
            />
            <img
              src="/img/نمالمخهناه.svg"
              className="w-[16px] h-[16px] absolute top-[50px] right-[10px] -translate-y-1/2 cursor-pointer z-30"
              alt="Edit"
              onClick={() => handleEditClick("TypeOfTrade")}
            />
          </div>

          <div className="flex flex-col gap-[6px] relative">
            <label className="text-[14px] font-[400] text-[#131313]">رقم هاتف اخر</label>
            <input
              type="text"
              value={dataPortfolio.lastNumPon}
              disabled={disabledInputs.lastNumPon}
              onChange={(e) => handleInputChange("lastNumPon", e.target.value)}
              className=" text-[16px] font-[400] text-[#8C94A3] w-[100%] h-[48px] rounded-[8px] px-[5px] border-[#E9EAF0] border-[1px] outline-none"
            />
            <img
              src="/img/نمالمخهناه.svg"
              className="w-[16px] h-[16px] absolute top-[50px] right-[10px] -translate-y-1/2 cursor-pointer z-30"
              alt="Edit"
              onClick={() => handleEditClick("lastNumPon")}
            />
          </div>
        </div>
      </div>
      <div className=" flex m-[15px] mx-[20px] justify-between">

        <button className="w-[81px] h-[48px] border-[1px] border-[#E9EAF0] bg-[#fff] text-[#6E7485] rounded-[12px]">
          الغاء
        </button>
        <button className="w-[100px] h-[48px] bg-[#183866] rounded-[12px] text-[#fff] text-[16px] gap-[16px]">
          حفظ
        </button>

      </div>
      <hr className="w-[96%] m-[2%] h-[1px] bg-black/17 border-none" />
      <p className="text-[18px] font-[600] text-[#3D3D3D]">
        تفاصيل اخري مثل مشاركة  ( لينك السايت و QR )
      </p>
      <div className="w-[237px] flex flex-col  border-[1px] border-[#2BFFFF1A] m-[20px] h-[322px] rounded-[32px] bg-[linear-gradient(to_right,rgba(43,255,255,0.3),rgba(43,255,255,0.38),rgba(43,255,255,0.31))] backdrop-blur-[40px]">
        <div className="w-[215px] h-[31px] rounded-[30px] border-[0.3px] border-[rgba(0,0,0,0.7)] mx-auto my-[15px] flex items-center overflow-hidden">
          <div className="flex justify-center items-center w-[24px] h-[24px] rounded-full bg-[#fff] my-auto mx-[5px]"
            onClick={() => {
              navigator.clipboard.writeText(link).then(() => {
              });
            }}
          >
            <img src="/img/gtfg.svg" alt="icon" />
          </div>

          <a
            className="flex-1 overflow-hidden whitespace-nowrap text-[8px] font-[600] px-[8px]"
            ref={qrRef}
            dir="ltr"
            href={link}
          >
            {link}
          </a>

        </div>
        <div
          ref={qrRef}
          className="mt-[-4px] p-[10px] bg-white rounded-lg shadow-lg w-[187px] h-[207px] mx-auto rounded-[17px] flex justify-center items-center">
          <QRCodeCanvas value={link} size={170} />
        </div>

        <button
          onClick={() => {
            const canvas = qrRef.current.querySelector("canvas");
            if (!canvas) return;

            const pngUrl = canvas.toDataURL("image/png").replace(
              "image/png",
              "image/octet-stream"
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "qr-code.png";
            downloadLink.click();
          }} className="w-[186px] text-[14px] font-[500] text-[#fff] h-[37px] rounded-[12px]  bg-[linear-gradient(to_bottom,#2BFFFF,#1A9999)] shadow-[0_0_1px_2px_rgba(0,0,0,0.15)] mx-auto mt-[9px]">
          تحميل الصوره بصيغه PNG
        </button>

      </div>

    </div>
  );
}
