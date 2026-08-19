"use client";

import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ar } from "date-fns/locale";

export default function CalendarPicker({ title, }) {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ar}>
      <div className="relative inline-block">

        <div
          onClick={() => setOpen((prev) => !prev)}
          className="w-[110px] h-[36px] border border-gray-300 shadow-[0_1px_2px_#1018280D] bg-white flex justify-center items-center gap-[5px] px-[8px] rounded-[4px] cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <img src="/media/dashboard/reservations/calendar.svg" alt="calendar icon" className="w-4 h-4" />
          <span className="text-[14px] font-[500] text-[#5D6679]">
            {value ? new Date(value).toLocaleDateString("ar-EG") : "شهرياً"}
          </span>
        </div>

        <DatePicker
          open={open}
          onClose={() => setOpen(false)}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            setOpen(false);
          }}

          dayOfWeekFormatter={(date) =>
            new Intl.DateTimeFormat('ar-EG', { weekday: 'short' }).format(date)
          }

          slotProps={{
            textField: {
              sx: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                opacity: 0,
                width: 0,
                height: 0,
                pointerEvents: 'none'
              }
            },
            popper: {
              placement: "bottom-start",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -35],
                  },
                },
              ],
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
}