"use client";

import Link from "next/link";
import { Button, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cookies, setCookies] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookies = () => {
    return document.cookie; 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      const { user } = data;

      setCookie("authToken", JSON.stringify(user), 1); 
      console.log("Login successful, token stored in cookies:", user);
      alert("Login successful!");

      router.push("/admin/anime");


    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="w-full max-w-md bg-content2 rounded-xl shadow-xl p-8">
        <h1 className="text-xl font-bold text-center mb-6">Sign in to your account</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            required
            name="username"
            id="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            required
            type={visiblePassword ? "text" : "password"}
            name="password"
            id="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
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
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>

        {cookies && (
          <div className="mt-4 text-center">
            <h3>Cookies:</h3>
            <pre>{cookies}</pre>
          </div>
        )}
      </section>
    </div>
  );
};

export default Login;
