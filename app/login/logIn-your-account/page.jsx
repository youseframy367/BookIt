"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Submit from "../../components/public/Submit";
import "../../assets/css/globals.css";

export default function LogAcount() {
  const router = useRouter();
  const [click, setClick] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activ, setActive] = useState(false);

  useEffect(() => {
    setActive(email !== "" && password !== "");
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setClick(true);

    const data = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const result = await response.json();
      console.log("Login success:", result);

      alert("Login successful!");
      router.push("/home");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your email or password.");
      setClick(false);
    }
  };

  return (
    <section>
      <div
        className="fixed inset-0 flex flex-col justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/icons/bg-login.png')" }}
      >
        <div className="container flex flex-col justify-center items-center">
          <form action=""
            method=""
            onSubmit={handleLogin} className="flex flex-col items-center md:w-[781px] h-[659px] p-5 rounded-lg bg-white shadow-md">
            {/* Close Button */}
            <div className="w-full flex justify-end">
              <button
                className="border-none outline-none"
                onClick={() => router.back()}
              >
                <img src="/assets/icons/close.png" alt="back" />
              </button>
            </div>

            {/* Logo */}
            <img
              src="/assets/icons/logo-navbar.png"
              width={80}
              height={70}
              className="-mt-2"
              alt="logo"
            />

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
              <Submit title="Confirm" width="w-full" />
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex justify-between w-[90%]">
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
          </form>
        </div>
      </div>
    </section>
  );
}
