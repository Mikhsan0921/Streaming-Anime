import Link from "next/link";
import { Button } from "@nextui-org/react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <section className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 transform transition-all duration-300 ease-in-out">
      <div className="flex justify-start items-center mb-6 ml-20 ">
        <img
          className="h-12 mr-2 ml-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
          />
          <span className="text-3xl font-semibold text-gray-900">Admin</span>
        </div>

        <h1 className="text-xl font-bold text-center text-gray-900 mb-6">
          Sign in to your account
        </h1>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input  
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-600"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <div>
            <Button
              radius="full"
              className="w-full bg-gradient-to-tr from-blue-500 to-blue-700 text-white shadow-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition"
            >
              Sign in
            </Button>
          </div>
          <p className="text-center text-sm text-gray-500">
            Don’t have an account yet?{" "}
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;
