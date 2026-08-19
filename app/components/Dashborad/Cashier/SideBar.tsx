"use client"

/* ============================== Sidebar الكاشير — حفظ الطلبات في الباك إند ==============================
   عند "طباعة وتأكيد العملية": POST /api/orders مع بيانات الفاتورة + السلة
   الفشل لا يمنع الطباعة — نطبع محلياً ونسجل التحذير فقط
   ============================================================================ */
import React, { useRef, useState , useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image"
import { usePaymentGetwayData } from "@/app/data/dataPaymentGetway";
import RemoveRoles from "../AccessAndRoles/RemoveRoles";
import WarningProducts from "./Warning";
import { useInvoice } from "@/app/(dashboard)/context/InvoiceContext";
import PrintTheInvoice from "./PrintTheInvoice";
import { ordersApi } from "@/utils/api";

interface items {
    title: string;
    price: number;
    amount: number;
    singlePrice: number;
    id?: string;
}

interface typeProducts {
    isCart: items[];
    setCart: React.Dispatch<React.SetStateAction<items[]>>;
}

export default function SideBar({ isCart, setCart }: typeProducts) {
    const {
        customerData,
        setCustomerData,
        products,
        setProducts,
        takeawayOrSala,
        setTakeawayOrSala
    } = useInvoice();

    const [selectedDetailsEmployees, setSelectedDetailsEmployees] = useState<string | null>("Details Employees");
    const [selectedDetailsClients, setSelectedDetailsClients] = useState<string | null>("Details Clients");
    const [selectedProducts, setSelectedProducts] = useState<string | null>("");
    const [selectedInvoice, setSelectedInvoice] = useState<string | null>("Invoice Details");
    const [removeRoles, setRemovRoles] = useState(false)
    const [warningProducts, setWarningProducts] = useState(false)
    const [lastWarningProducts, setLastWarningProducts] = useState(false)
    const [paymentGetway, setPaymentGetway] = useState(usePaymentGetwayData());
    const [activePaymentIndex, setActivePaymentIndex] = useState(0);

  const [smoleScreen, setSmoleScreen] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);

  /* حفظ الطلب في الباك إند بعد الطباعة */
  const saveOrderToBackend = async () => {
    if (isCart.length === 0) return;
    setSavingOrder(true);
    try {
      await ordersApi.create({
        items: isCart.map((item) => ({
          name: item.title,
          quantity: item.amount,
          price: item.singlePrice,
        })),
        customerName: takeawayOrSala === 1 ? customerData.name : undefined,
        customerCode: takeawayOrSala === 1 ? customerData.code : undefined,
        employeeName: customerData.name || undefined,
        cashierId: customerData.code || undefined,
        /* "نقدي" → cash ، "فيزا" → visa ، "محفظه" تُسجل visa كافتراضي لأن الباك يدعم cash/visa فقط */
        paymentMethod: activePaymentIndex === 0 ? "cash" : "visa",
      });
      toast.success("تم تسجيل الطلب بنجاح ✅");
    } catch (e) {
      console.error("فشل حفظ الطلب في الباك إند:", e);
      toast.warn("تمت الطباعة لكن فشل تسجيل الطلب في النظام — راجع السجل");
    } finally {
      setSavingOrder(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
     
      const isSmall = window.innerWidth <= 1200;
      setSmoleScreen(isSmall);
    };


    handleResize();

   
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); 

    const handleDelete = (index: number) => {
        const productToDelete = isCart[index];

        if (!productToDelete) return;

        setProducts(categories =>
            categories.map(cat => ({
                ...cat,
                items: cat.items.map(item =>
                    item.name === productToDelete.title
                        ? { ...item, quantity: 0 }
                        : item
                )
            }))
        );

        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const deleteAllProducts = () => {
        setCart([]);

        setProducts(categories =>
            categories.map(cat => ({
                ...cat,
                items: cat.items.map(item => ({
                    ...item,
                    quantity: 0
                }))
            }))
        );

        setRemovRoles(false);
    }

    const totalItems = isCart.reduce((sum, item) => sum + item.amount, 0);
    const subtotal = isCart.reduce((sum, item) => sum + item.price, 0);
    const vatRate = 0.14;
    const vat = subtotal * vatRate;
    const totalWithVat = subtotal + vat;
    const deliveryFee = takeawayOrSala === 1 ? subtotal * 0.1 : 0;
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (printRef.current) {
            const printWindow = window.open("", "", "width=800,height=600");

            if (printWindow) {
                const styles = Array.from(document.styleSheets)
                    .map(sheet => {
                        try {
                            return Array.from(sheet.cssRules).map(rule => rule.cssText).join("");
                        } catch (e) {
                            return "";
                        }
                    })
                    .join("");

                printWindow.document.write(`
        <html>
          <head>
            <style>${styles}</style>
          </head>
          <body>
            ${printRef.current.innerHTML}
          </body>
        </html>
      `);
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
            }
        }
    };

    return (
<div className={`fixed left-[15px] overflow-hidden ${smoleScreen ? 'w-[25%]' : 'w-[20%]'}`}>
                <div ref={printRef} className="hidden">
                <PrintTheInvoice vat={vat} deliveryFee={deliveryFee} subtotal={subtotal} totalWithVat={totalWithVat} isCart={isCart} />
            </div>
            {removeRoles && (
                <RemoveRoles
                    text="هل أنت متأكد أنك تريد حذف هذه الفاتوره ؟"
                    handleDelete={deleteAllProducts}
                    onClose={() => setRemovRoles(false)}
                />
            )}
            {warningProducts && (
                <WarningProducts
                    isColor="color-golden-light"
                    onClose={() => setWarningProducts(false)}
                />
            )}
            {lastWarningProducts && (
                <WarningProducts
                    isColor="color-red-bright-tow"
                    onClose={() => setLastWarningProducts(false)}
                />
            )}
            <div className=" top-20 flex flex-col gap-[10px] ">
                <div className="h-[89vh] overflow-scroll  shadow-[0_0_10px_rgba(0,0,0,0.10)] bg-[#fff] rounded-[11px] py-[24px] px-[15px] flex flex-col gap-[24px] " style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    <div className="flex gap-[6px] justify-center">
                        <button onClick={() => setTakeawayOrSala(0)} title="صاله" className={`${takeawayOrSala == 0 && 'hover:text-[var(--color-light-blue)] hover:bg-white bg-[var(--color-light-blue)] text-white'} text-[var(--color-light-blue)] cursor-pointer text-xs font-semibold transition-all duration-300 w-[110px] h-[30px] border border-2 border-[var(--color-light-blue)] rounded-[13px]`}>
                            صاله
                        </button>
                        <button onClick={() => setTakeawayOrSala(1)} title="تيك اوي" className={`${takeawayOrSala == 1 && 'hover:text-[var(--color-light-blue)] hover:bg-white bg-[var(--color-light-blue)] text-white'} cursor-pointer text-xs text-[var(--color-light-blue)] hover:text-white font-semibold whitespace-nowrap transition-all duration-300 w-[110px] h-[30px] hover:bg-[var(--color-light-blue)] border border-2 border-[var(--color-light-blue)] rounded-[13px]`}>
                            تيك اوي
                        </button>
                    </div>
                    <div className="flex flex-col gap-[13px]">
                        <div>
                            <h2 className="font-semibold text-lg text-[var(--color-dark-gray)]">تفاصيل الفاتوره</h2>
                        </div>
                        <div className="flex flex-col gap-[11px]">
                            <div className="flex justify-between" onClick={() =>
                                setSelectedDetailsEmployees(prev =>
                                    prev === "Details Employees" ? null : "Details Employees"
                                )
                            }>
                                <h2 className="font-semibold text-sm">بيانات الموظف</h2>
                                <Image src="/media/shared/icons/arrow-details.svg" alt="arraw" width={10} height={10} className={`transition-all duration-300 ${selectedDetailsEmployees === "Details Employees" ? 'rotate-0' : 'rotate-180'}`} />
                            </div>
                            <span className={`text-xs text-[var(--color-dark-gray-translucent)] overflow-hidden transition-all duration-300 ${selectedDetailsEmployees === "Details Employees" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                {customerData.name}
                            </span>
                        </div>
                        <div className="flex flex-col gap-[11px]">
                            <div className="flex justify-between" onClick={() =>
                                setSelectedDetailsClients(prev =>
                                    prev === "Details Clients" ? null : "Details Clients"
                                )
                            }>
                                <h2 className="font-semibold text-sm">بيانات العميل</h2>
                                <Image src="/media/shared/icons/arrow-details.svg" alt="arraw" width={10} height={10} className={`transition-all duration-300 ${selectedDetailsClients === "Details Clients" ? 'rotate-0' : 'rotate-180'}`} />
                            </div>
                            <div className="text-xs flex flex-col gap-[12px] overflow-auto transition-all duration-300">
                                <div className="flex justify-between">
                                    <span className="text-[var(--color-dark-gray-translucent)]">
                                        كود العميل
                                    </span>
                                    {
                                        isCart.length == 0 ?
                                            <span className="text-[var(--color-dark-gray-translucent)]">
                                                #
                                            </span>
                                            : <span className="text-[var(--color-dark-gray)]">
                                                {customerData.code}
                                            </span>
                                    }
                                </div>
                                {
                                    takeawayOrSala == 1 && <>
                                        <input type="text" className="text-xs placeholder:text-[var(--color-light-blue-2)] border border-[var(--color-light-blue)] px-[7px] py-[5px] rounded-[8px]" placeholder="أدخل اسم العميل" value={customerData.name}
                                            onChange={(e) =>
                                                setCustomerData((prev) => ({ ...prev, name: e.target.value }))
                                            } />
                                        <input type="text" className="text-xs placeholder:text-[var(--color-light-blue-2)] border border-[var(--color-light-blue)] px-[7px] py-[5px] rounded-[8px]" placeholder="أدخل عنوان الطلب" value={customerData.address}
                                            onChange={(e) =>
                                                setCustomerData(prev => ({ ...prev, address: e.target.value }))
                                            } />
                                        <input type="number" className="text-xs placeholder:text-[var(--color-light-blue-2)] border border-[var(--color-light-blue)] px-[7px] py-[5px] rounded-[8px]" placeholder="أدخل رقم هاتف العميل" value={customerData.phone}
                                            onChange={(e) =>
                                                setCustomerData(prev => ({ ...prev, phone: e.target.value }))
                                            } />
                                        <input type="number" className="text-xs placeholder:text-[var(--color-light-blue-2)] border border-[var(--color-light-blue)] px-[7px] py-[5px] rounded-[8px]" placeholder="أدخل رقم هاتف آخر ( اختياري )" value={customerData.phone2}
                                            onChange={(e) =>
                                                setCustomerData(prev => ({ ...prev, phone2: e.target.value }))
                                            } />
                                    </>
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-[11px]">
                            <div className="flex justify-between" onClick={() =>
                                setSelectedProducts(prev =>
                                    prev === "products" ? null : "products"
                                )
                            }>
                                <h2 className="font-semibold text-sm">المنتجات</h2>
                                <Image src="/media/shared/icons/arrow-details.svg" alt="arraw" width={10} height={10} className={`transition-all duration-300 ${selectedProducts === "products" ? 'rotate-0' : 'rotate-180'}`} />
                            </div>
                            <div className="flex flex-col gap-[18px] min-h-[20px]">
                                {
                                    isCart.length == 0 ? <div className={`${selectedProducts === "products" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                        <span className="text-xs text-[var(--color-dark-gray-translucent)]">
                                            لم يحدد بعد
                                        </span>
                                    </div> :
                                        isCart.map((item, index) => {
                                            return <div key={index} className="flex flex-col gap-[14px]">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="text-[10px] font-semibold">{item.title}</h2>
                                                    <button title="حذف" className="cursor-pointer" onClick={() => handleDelete(index)}>
                                                        <Image src="/media/shared/icons/delete.png" alt="delete" width={10} height={12} />
                                                    </button>
                                                </div>
                                                <ul className="flex flex-col gap-[12px]">
                                                    <li className="text-[10px] flex justify-between items-center">
                                                        <span className="font-semibold text-[var(--color-dark-gray-translucent)]">السعر</span>
                                                        <div className="text-center min-w-[20px]">
                                                            <span className="font-bold text-[var(--color-dark-gray)]">{item.price}</span>
                                                        </div>
                                                    </li>
                                                    <li className="text-[10px] flex justify-between items-center">
                                                        <span className="font-semibold text-[var(--color-dark-gray-translucent)]">الكميه</span>
                                                        <div className="text-center min-w-[20px]">
                                                            <span className="font-bold text-[var(--color-dark-gray)]">{item.amount}</span>
                                                        </div>
                                                    </li>
                                                    <li className="text-[10px] flex justify-between items-center">
                                                        <span className="font-semibold text-[var(--color-dark-gray-translucent)]">سعر الوحده</span>
                                                        <div className="text-center min-w-[20px]">
                                                            <span className="font-bold text-[var(--color-dark-gray)]">{item.singlePrice}</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        })
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-[11px]">
                            <div className="flex justify-between" onClick={() =>
                                setSelectedInvoice(prev =>
                                    prev === "Invoice Details" ? null : "Invoice Details"
                                )
                            }>
                                <h2 className="font-semibold text-sm">تفاصيل الفاتوره</h2>
                                <Image src="/media/shared/icons/arrow-details.svg" alt="arraw" width={10} height={10} className={`transition-all duration-300 ${selectedInvoice === "Invoice Details" ? 'rotate-0' : 'rotate-180'}`} />
                            </div>
                            <div className={`transition-all duration-300 ${selectedInvoice === "Invoice Details" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                <ul className="flex flex-col gap-[12px]">
                                    <li className="text-[10px] flex justify-between items-center">
                                        <span className="font-semibold text-[var(--color-dark-gray-translucent)]">عدد المنتجات</span>
                                        <div className="text-center min-w-[20px]">
                                            <span className="font-bold text-[var(--color-dark-gray)]">{totalItems}</span>
                                        </div>
                                    </li>
                                    <li className="text-[10px] flex justify-between items-center">
                                        <span className="font-semibold text-[var(--color-dark-gray-translucent)]">اجمالي القيمه بدون ضريبه المضافه</span>
                                        <div className="text-center min-w-[20px]">
                                            <span className="font-bold text-[var(--color-dark-gray)]">{subtotal.toFixed(2)}</span>
                                        </div>
                                    </li>
                                    {
                                        takeawayOrSala == 1 &&
                                        <li className="text-[10px] flex justify-between items-center">
                                            <span className="font-semibold text-[var(--color-dark-gray-translucent)]">ضريبة التوصيل</span>
                                            <div className="text-center min-w-[20px]">
                                                <span className="font-bold text-[var(--color-dark-gray)]">{deliveryFee.toFixed(2)}</span>
                                            </div>
                                        </li>
                                    }
                                    <li className="text-[10px] flex justify-between items-center">
                                        <span className="font-semibold text-[var(--color-dark-gray-translucent)]">ضريبة القيمه المضافه 14%</span>
                                        <div className="text-center min-w-[20px]">
                                            <span className="font-bold text-[var(--color-dark-gray)]">{vat.toFixed(2)}</span>
                                        </div>
                                    </li>
                                    <li className="text-[10px] flex justify-between items-center">
                                        <span className="font-semibold text-[var(--color-dark-gray-translucent)]">الاجمالي شامل ضريبة القيمه المضافه</span>
                                        <div className="text-center min-w-[20px]">
                                            <span className="font-bold text-[var(--color-dark-gray)]">{totalWithVat.toFixed(2)}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <hr className="text-[var(--alpha)]" />
                            <textarea className="h-[98px] resize-none text-xs placeholder:text-[var(--color-light-blue-2)] border border-[var(--color-light-blue)] px-[7px] py-[5px] rounded-[8px]" placeholder="أدخل رقم هاتف آخر ( اختياري )" value={customerData.notes}
                                onChange={(e) =>
                                    setCustomerData(prev => ({ ...prev, notes: e.target.value }))
                                }></textarea>
                        </div>
                        <hr className="text-[var(--alpha)]" />
                        <div className="flex flex-col gap-[13px]">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-[var(--color-dark-gray-translucent)]">الاجمالي</span>
                                {
                                    isCart.length == 0 ?
                                        <span className="text-[var(--color-dark-gray-light-translucent)]">-------</span> : <span className="text-[10px] text-[var(--color-dark-gray)]">{totalWithVat.toFixed(2)}</span>
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-[22px]">
                            <div className="flex flex-col gap-[13px]">
                                <h2 className="font-semibold text-sm">تفاصيل الدفع</h2>
                                <div className="flex gap-[6px] justify-between">
                                    {
                                        paymentGetway.map((item, index) => {
                                            return <button key={index} onClick={() => setActivePaymentIndex(index)} title={item.title} className={`${activePaymentIndex == index ? 'bg-[var(--color-light-blue)] text-white hover:bg-white hover:text-[var(--color-light-blue)]' : 'hover:text-white hover:bg-[var(--color-light-blue)]'} group text-[var(--color-light-blue)] transition-all duration-300 cursor-pointer w-full py-[8px] flex gap-[6px] justify-center border border-[var(--color-light-blue)] rounded-[8px]`}>
                                                <Image src={`/media/shared/icons/${item.icon}`} alt="critical" width={20} height={15} className={`${activePaymentIndex == index ? 'brightness-0 invert group-hover:brightness-[unset] group-hover:invert-[unset]' : 'group-hover:brightness-0 group-hover:invert'} transition-all duration-300`} />
                                                <span className="text-[14px]">{item.title}</span>
                                            </button>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="flex gap-[12px]">
                                <button
                                    disabled={savingOrder}
                                    onClick={async () => {
                                        handlePrint();
                                        await saveOrderToBackend();
                                    }}
                                    title="طباعه ، وتأكيد العمليه"
                                    className={`${isCart.length == 0 ? 'opacity-[0.5]' : 'cursor-pointer transition-all duration-300 hover:text-[var(--color-light-blue)] hover:bg-white'} w-full text-sm text-white font-semibold py-[12px] border border-2 border-[var(--color-light-blue)] bg-[var(--color-light-blue)] rounded-[13px] disabled:opacity-50`}
                                >
                                    {savingOrder ? "جارٍ..." : "طباعه ، وتأكيد العمليه"}
                                </button>
                                <Image src="/media/shared/icons/remove.svg" alt="critical" width={31} height={31} className="cursor-pointer" title="Remove" onClick={() => {
                                    setRemovRoles(true)
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
                {activePaymentIndex != 0 && (
                    <div className="shadow-[0_0_10px_rgba(0,0,0,0.10)] bg-[#fff] rounded-[16px] py-[24px] px-[15px] flex items-center gap-[13px]">
                        <Image src="/media/shared/icons/pin.svg" alt="pin" width={15} height={15} />
                        <span className="font-semibold text-xs text-[var(--color-dark-gray-50)]">سيتم تسجيل العمليه عند مشرف المطعم بأنها قد تمت من خلال البطاقه البنكيه وليس دفع نقدي .</span>
                    </div>
                )}
            </div>
        </div>
    )
}