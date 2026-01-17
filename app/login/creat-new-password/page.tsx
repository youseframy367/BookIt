"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Submit from "@/app/components/public/Submit";

export default function NewBassword() {
  const [click, setClick] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activ, setActive] = useState(false);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [email, password]);

  const handleSubmit = async () => {
    setClick(true);

    const data = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      const result = await response.json();
      console.log("Server response:", result);
      alert("Password changed successfully!");
      // navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error resetting password");
      setClick(false);
    }
  };

  return (
    <section>
      <div
        className="fixed inset-0 flex flex-col justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/icons/bg-new-password.png')" }}
      >
        <div className="container flex flex-col justify-center items-center">
          <form action=""
            method=""
            onClick={handleSubmit} className="flex flex-col items-center md:w-[781px] h-[659px] p-10 bg-white rounded-lg">
            <div className="w-full flex justify-end">
              <button
                className="border-none outline-none"
              >
                {/* onClick={() => navigate("/login")} */}
                <div className="w-[20px] h-[20px] relative">
                  <Image src="/assets/icons/close.png" alt="back" fill />
                </div>
              </button>
            </div>

            <Image
              src="/assets/icons/logo-navbar.png"
              width={80}
              height={70}
              className="-mt-2"
              alt="logo"
            />

            <p className="text-[#2B2F38] text-[30px] font-semibold leading-[38px] my-4">
              Create a new password
            </p>
            <p className="text-[#667085] leading-6 font-normal mt-0">
              Change your password, enter a strong password
            </p>

            {/* Email */}
            <div className="flex flex-col w-[90%] gap-2 mb-2 mt-2">
              <label
                htmlFor="Email"
                className="text-[#48505E] text-sm font-medium"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col w-[90%] gap-2">
              <label
                htmlFor="Password"
                className="text-[#48505E] text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                id="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none"
              />
            </div>

            <div className="my-4 w-[90%]">
              <Submit title="Confirm" width="w-full" />
            </div>
            
          </form>
        </div>
      </div>
    </section >
  );
}