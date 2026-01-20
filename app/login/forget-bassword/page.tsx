"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Submit from "../../components/public/Submit";
import "../../assets/css/globals.css";
import api from "@/utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutLoginAndRegister from "@/app/components/layoutLoginAndRegister/LayoutLoginAndRegister";

export default function ForgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/forgot-password", { email });
      router.push("/login/verification-code");
    } catch (err: any) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <LayoutLoginAndRegister onSubmit={handleSendCode} bg='select.png'>

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
          <Submit title="Send Code" width="w-full" loading={loading} />
        </div>
        <ToastContainer />
      </LayoutLoginAndRegister>
    </section>
  );
}
