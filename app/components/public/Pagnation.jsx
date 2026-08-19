"use client";

/* مكوّن تفاعلي يستقبل setters وrefs من صفحة الكاشير العميلة. */
export default function Pagnation({ numRow, setNumRow, scroll, numbersRef, numPages, currentPage, setCurrentPage }) {
    return (
        <div className="flex w-full justify-between items-center py-[10px] px-[20px]">
            <div className="flex items-center gap-[10px]">
                <p className="text-[12px] font-normal text-[rgba(29,29,29,0.8)]">
                    حدد عدد صفوف السجلات لكل صفحة
                </p>
                <select
                    value={numRow}
                    onChange={(e) => setNumRow(parseInt(e.target.value))}
                    className="appearance-none bg-white text-[16px] bg-[url('/assets/icons/arrow-up.svg')] bg-no-repeat bg-[position:right_10px_center] bg-[length:12px] border border-gray-300 rounded-md px-4 py-1 text-[12px] text-[#1D1D1D] focus:outline-none focus:ring-1 focus:ring-[#183866]"
                >
                    {[10, 20, 30, 40, 50].map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center justify-center gap-2" >
                {/* السهم اليسار */}
                < button
                    onClick={() => scroll("left")
                    }
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-r-[8px] bg-white shadow-[0_0_2px_#00000040] hover:bg-[#f7f8fa] transition-all duration-200"
                >
                    <img
                        src="/img/;lhjn;jh.svg"
                        className="w-3 h-3"
                        alt="next"
                    />
                </button >

                <div
                    ref={numbersRef}
                    className="flex overflow-x-auto overflow-y-hidden w-[200px] scroll-smooth no-scrollbar"
                >
                    {[...Array(numPages)].map((_, i) => {
                        const isActive = currentPage === i + 1;
                        return (
                            <div
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`min-w-[40px] h-[40px] shadow-[0_0_2px_#00000040] flex items-center justify-center  text-[13px] font-medium cursor-pointer transition-all duration-200
                ${isActive
                                        ? "bg-[#183866] text-white shadow-[0_0_4px_#18386680]"
                                        : "bg-white text-[#1D1D1D] hover:bg-[#f3f4f6] shadow-[0_0_2px_#59595933]"
                                    }`}
                            >
                                {i + 1}
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-l-[8px] bg-white shadow-[0_0_2px_#00000040] hover:bg-[#f7f8fa] transition-all duration-200"
                >
                    <img
                        src="/img/;lhjn;jh.svg"
                        className="w-3 h-3 rotate-180"
                        alt="prev"
                    />
                </button>

            </div >
        </div>
    )
}
