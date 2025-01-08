// components/RegisterForm.tsx
"use client";

import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (response.ok) {
      alert("Registration successful");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      <div className="flex justify-center items-center h-screen">
        <section className="flex flex-col gap-4 w-full max-w-md bg-content2 rounded-xl shadow-xl p-8 transform transition-all duration-300 ease-in-out">
        <h1 className="text-xl font-bold text-center mb-6">
          Create an account
        </h1>
        <Input
            required
            type="text"
            placeholder=" "
            id="username"
            label="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        <Input
            required
            type="email"
            placeholder=" "
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}     
          />

        <Input
            required
            type={visiblePassword ? "text" : "password"}
            placeholder=" "
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
          <div>
            <Button type="submit" fullWidth>
              Register
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
      
        </section>
      </div>
    </form>
  );
}
