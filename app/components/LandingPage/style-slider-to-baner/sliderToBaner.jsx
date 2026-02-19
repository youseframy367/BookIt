"use client";
import { motion } from "framer-motion";

import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

import { useDataSliders } from "../../../data/dataSliders";

export default function SlideSimple() {
  const { mounted } = useTranslationSetup();

  const dataSystem = useDataSliders();

  const sliderVariants = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div id="down" className="mt-[33px] md:mt-[40px] sliderSimple-section" dir="ltr">
      <motion.div className="sliderSimple-track" variants={sliderVariants} animate="animate">
        {[...dataSystem, ...dataSystem].map((item, index) => (
          <div key={index} className="flex flex-col gap-[20px] sliderSimple-item md:mt-5" style={{ width: "180px" }}>
            <div className="shadow-[0_0_20px_rgba(0,0,0,0.25)] rounded-full">
              <img src={item.img} alt={mounted ? item.title : '...'} />
            </div>
            <span className="!text-sm md:!text-lg font-normal">{mounted ? item.title : '...'}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
