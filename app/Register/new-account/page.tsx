"use client";
import { useState, useEffect } from "react";
import Submit from "@/app/components/public/Submit";
import LayoutLoginAndRegister from "@/app/components/layoutLoginAndRegister/LayoutLoginAndRegister";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";

export default function CreateNewAccount() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [click, setClick] = useState(false);
  const [activ, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email && password && confirmPassword) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [email, password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await api.post("/register", { email, password });
      router.push("/login/verification-code");
    } catch (err: any) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <LayoutLoginAndRegister onSubmit={handleSubmit} bg='bg-login.png'>

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
          <Submit title="Confirm" width="w-full" loading={loading} />
        </div>

        <ToastContainer />
      </LayoutLoginAndRegister>
    </section>
  );
}