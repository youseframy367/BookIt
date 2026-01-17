"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Submit from "@/app/components/public/Submit";

export default function CreateNewAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [click, setClick] = useState(false);
  const [activ, setActive] = useState(false);

  useEffect(() => {
    if (email && password && confirmPassword) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [email, password, confirmPassword]);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setClick(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Failed to register");

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
      alert("Error registering user");
      setClick(false);
    }
  };

  return (
    <section>
      <div
        className="fixed inset-0 flex flex-col justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/icons/bg-login.png')" }}>
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

            <p className="mt-4 text-[30px] font-semibold leading-[38px] text-[#2B2F38]">
              Create a New Account
            </p>

            <p className="text-[#667085] leading-6 font-normal mt-0">
              Change your password, enter a strong password
            </p>

            {/* Email */}
            <div className="flex flex-col w-[90%] gap-2 mt-4">
              <label className="text-sm font-medium text-[#48505E]">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col w-[90%] gap-2 mt-3">
              <label className="text-sm font-medium text-[#48505E]">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-3 py-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col w-[90%] gap-2 mt-3">
              <label className="text-sm font-medium text-[#48505E]">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-3 py-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="my-4 w-[90%]">
              <Submit title="Confirm" width="w-full" />
            </div>
            
          </form>
        </div>
      </div>
    </section>
  );
}