import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin, login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));

        navigate("/");
      }
    } catch (err) {
      if (err.code === 401) {
        setError("Invalid email or password.");
      } else if (err.code === 429) {
        setError("Too many login attempts. Please wait and try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex w-full items-center justify-center px-4 text-center text-black">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
        <div className="mb-5 flex justify-center">
          <span className="inline-block w-full max-w-25">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-slate-900">
          Sign in to Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 sm:text-base">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && (
          <p className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-7">
          <p className="mb-4 text-left text-xs text-slate-500">
            <span className="text-red-500">*</span> Required fields
          </p>
          <div className="space-y-5 text-left">
            <Input
              type="email"
              label="Email"
              required
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+[.-]?\w+@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password"
              required
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
            <Button children="Sign in" type="submit" className="w-full" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
