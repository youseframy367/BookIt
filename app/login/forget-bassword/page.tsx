"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Submit from "../../components/public/Submit";
import "../../assets/css/globals.css";

export default function ForgetPassword() {
  const router = useRouter();
  const [click, setClick] = useState(false);
  const [email, setEmail] = useState("");
  const [activ, setActive] = useState(false);

  useEffect(() => {
    setActive(email !== "");
  }, [email]);

  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // router.push("/login/verification-code");

    if (!email) {
      alert("Please enter your email");
      return;
    }

    setClick(true);

    try {
      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Failed to send verification code");

      const result = await response.json();
      console.log("Server response:", result);

      alert("Verification code sent to your email!");
      router.push("/login/verification-code");
    } catch (error) {
      console.error(error);
      alert("Error sending code. Please try again.");
      setClick(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/icons/select.png')" }}
    >
      <div className="container flex flex-col justify-center items-center">
        <form action=""
          method=""
          onSubmit={handleSendCode} className="flex flex-col items-center md:w-[781px] h-[659px] p-10 bg-white rounded-lg">
          {/* Logo */}
          <img
            src="/assets/icons/logo-navbar.png"
            width={80}
            height={70}
            className="-mt-2"
            alt="logo"
          />

          {/* Titles */}
          <p className="text-[#2B2F38] text-2xl font-semibold mt-4 mb-1">
            Forgot Password
          </p>
          <p className="text-[#667085] text-sm leading-6">
            Don’t worry, we’ll help you reset your password.
          </p>

          {/* Email Input */}
          <div className="flex flex-col w-[90%] gap-2 my-3">
            <label htmlFor="Email" className="text-[#48505E] text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="Email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none"
            />
          </div>

          {/* Send Code Button */}
          <div className="my-4 w-[90%]">
            <Submit title="Send Code" width="w-full" />
          </div>
        </form>
      </div>
    </div >
  );
}
