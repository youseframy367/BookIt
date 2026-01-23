"use client";
import { motion } from "framer-motion";

import "./sliderToBaner.css";

export default function SlideSimple() {
  const items = [
    { img: "/assets/icons/meal-1.jpg", title: "BBQ / Grill" },
    { img: "/assets/icons/meal-2.jpg", title: "Pizza" },
    { img: "/assets/icons/meal-3.png", title: "Burgers" },
    { img: "/assets/icons/meal-4.jpg", title: "Seafood" },
    { img: "/assets/icons/meal-5.png", title: "Desserts" },
    { img: "/assets/icons/meal-6.png", title: "Healthy" },
    { img: "/assets/icons/meal-7.png", title: "Drinks / Café" },
  ];

  const sliderVariants = {
    animate: {
      x: ["0%", "-50%"], // يتحرك من اليمين لليسار
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
    <div className="sliderSimple-section">
      <motion.div className="sliderSimple-track" variants={sliderVariants} animate="animate">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="sliderSimple-item" style={{ width: "180px" }}>
            <img src={item.img} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
