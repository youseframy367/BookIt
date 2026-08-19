"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TimeSupscribtion({ typeScren = "big" }) {
  const [showTime, setShowTime] = useState(true);
  const [currentSponsor, setCurrentSponsor] = useState(0);

  const sponsors = [
    "/media/dashboard/branding/devmaster-logo.png",
    "/media/dashboard/branding/obayah-logo.png",
    "/media/dashboard/branding/cloud-boutique-logo.png",
  ];

  // تبديل العرض بين الوقت والصور كل 5 ثوانٍ
  useEffect(() => {
    const interval = setInterval(() => {
      setShowTime((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // تبديل الصور نفسها كل 5 ثوانٍ في حالة عرض الصور
  useEffect(() => {
    if (!showTime) {
      const imgInterval = setInterval(() => {
        setCurrentSponsor((prev) => (prev + 1) % sponsors.length);
      }, 5000);
      return () => clearInterval(imgInterval);
    }
  }, [showTime, sponsors.length]);

  const fadeVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.4 } },
  };

  return (
    <div
      className={
        typeScren === "big"
          ? "w-full flex justify-center items-center bg-[#20202033] h-[70px] font-poppins overflow-hidden relative z-[99999]"
          : "fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[320px] bg-[#183866] backdrop-blur-md border border-white/10 rounded-2xl h-[55px] flex justify-center items-center z-[99999] shadow-2xl"
      }
    >
      <AnimatePresence mode="wait">
        {showTime ? (
          <motion.p
            key="time"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute text-white font-[700] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${
              typeScren === "big" ? "text-[32px]" : "text-[18px]"
            }`}
            dir="ltr"
          >
            2 DAY : 59 : 25
          </motion.p>
        ) : (
          <motion.img
            key={sponsors[currentSponsor]}
            src={sponsors[currentSponsor]}
            alt="sponsor"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute object-contain transition-all duration-500 ${
              typeScren === "big" ? "h-[60px]" : "h-[35px]"
            } w-auto`}
          />
        )}
      </AnimatePresence>
    </div>
  );
}