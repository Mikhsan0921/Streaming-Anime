// components/LoginForm.tsx
"use client";

import { Button, Input, Link } from "@nextui-org/react";
import { div } from "framer-motion/client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="w-full max-w-md bg-content2 rounded-xl shadow-xl p-8">
        <h1 className="text-xl font-bold text-center mb-6">
          Sign in to your account
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            required
            type="email"
            placeholder="Enter your email"
            name="username"
            id="username"
            label="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <Input
            required
            type={visiblePassword ? "text" : "password"}
            placeholder="Enter your password"
            name="password"
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endContent={
            <Button
              isIconOnly
              variant="light"
              onClick={() => setVisiblePassword(!visiblePassword)}
              >
              {visiblePassword ? <FaEye /> : <FaEyeSlash />}
            </Button>
            }
          />
           <Button type="submit" fullWidth>
            Login
          </Button>
          <p className="text-center text-sm text-gray-500">
            Don’t have an account yet?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </section>
    </div>   
  );
}
