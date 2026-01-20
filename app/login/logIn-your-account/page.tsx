"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Submit from "../../components/public/Submit";
import "../../assets/css/globals.css";
import api from "@/utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutLoginAndRegister from "@/app/components/layoutLoginAndRegister/LayoutLoginAndRegister";

export default function LogAcount() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/login", { email, password });
      router.push("/home");
    } catch (err: any) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <LayoutLoginAndRegister onSubmit={handleLogin} bg='bg-login.png'>

        {/* Titles */}
        <p className="text-[#2B2F38] text-2xl font-semibold mt-4">
          Log in to your account
        </p>
        <p className="text-[#667085] font-normal leading-6">
          Welcome back! Please enter your details.
        </p>

        {/* Email Input */}
        <div className="flex flex-col w-[90%] gap-2 my-2">
          <label
            htmlFor="Email"
            className="text-[#48505E] text-sm font-medium"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none"
          />
        </div>

        {/* Password Input */}
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

        {/* Confirm Button */}
        <div className="my-4 w-[90%]">
          <Submit title="Confirm" width="w-full" loading={loading} />
        </div>

        {/* Remember & Forgot Password */}
        <div className="flex justify-between gap-5 md:gap-0 md:w-[90%]">
          <div className="flex items-center gap-4">
            <input type="checkbox" id="activ" />
            <label htmlFor="activ" className="text-[#48505E] text-sm font-medium cursor-pointer">
              Remember for 30 days
            </label>
          </div>

          <p
            className="text-[#BF360C] text-sm font-medium cursor-pointer"
            onClick={() => router.push("/login/forget-bassword")}
          >
            Forgot password
          </p>
        </div>

        {/* Sign Up Link */}
        <p
          className="text-[#3a3838] text-sm font-normal mt-12 px-2 cursor-pointer"
          onClick={() => router.push("/create-account")}
        >
          Don't have an account?{" "}
          <span className="text-black underline">SignUp</span>
        </p>
        <ToastContainer />
      </LayoutLoginAndRegister>
    </section>
  );
}
