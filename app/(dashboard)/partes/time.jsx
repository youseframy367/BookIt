"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TimeSupscribtion() {
  // ⏱️ الحالة: بنعرض الوقت ولا الصور؟
  const [showTime, setShowTime] = useState(true);
  const [currentSponsor, setCurrentSponsor] = useState(0);

  const sponsors = [
    "/img/result 1.png",
    "/img/FAxacBciPwmGGziG44usNqMrhpSsBJqVGg6QXn0Q 1.png",
    "/img/e6b08986e699dd21b87627e3b0a86a309ee36f03.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTime((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showTime) {
      const imgInterval = setInterval(() => {
        setCurrentSponsor((prev) => (prev + 1) % sponsors.length);
      }, 5000);
      return () => clearInterval(imgInterval);
    }
  }, [showTime, sponsors.length]);

  const fadeVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full flex justify-center items-center bg-[#20202033] h-[70px] font-poppins overflow-hidden relative z-99999">
      <AnimatePresence mode="wait">
        {showTime ? (
          <motion.p
            key="time"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute text-[32px] text-white font-[700] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
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
            className="absolute h-[70px] w-auto object-contain transition-all duration-500"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
