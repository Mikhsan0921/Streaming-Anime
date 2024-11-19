"use client";

import Link from "next/link";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          Sign in to your account
        </h1>
        <form className="space-y-6">
          <Input required name="username" id="username" label="Username" />
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
          <div>
            <Button fullWidth type="submit">
              Login
            </Button>
          </div>
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
};

export default Login;
