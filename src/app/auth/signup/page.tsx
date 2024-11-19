"use client";

import Link from "next/link";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: "example@example.com",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const data = await response.json();
      console.log("User registered successfully:", data);

      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
      });
      setError("");

      alert("User registered successfully!");
    } catch (err: any) {
      console.error("Error during registration:", err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="w-full max-w-md bg-content2 rounded-xl shadow-xl p-8 transform transition-all duration-300 ease-in-out">
        <div className="flex justify-start items-center mb-6 ml-20 ">
          <img
            className="h-12 mr-2 ml-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          <span className="text-3xl font-semibold">Admin</span>
        </div>

        <h1 className="text-xl font-bold text-center mb-6">
          Create an account
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-6">
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

          <Input
            required
            type={visibleConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            endContent={
              <Button
                isIconOnly
                variant="light"
                onClick={() =>
                  setVisibleConfirmPassword(!visibleConfirmPassword)
                }
              >
                {visibleConfirmPassword ? <FaEye /> : <FaEyeSlash />}
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
        </form>
      </section>
    </div>
  );
};

export default SignUp;
