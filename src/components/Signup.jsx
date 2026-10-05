import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    console.log("Inside signup component (Submit)");
    setError("");

    try {
      const uData = await authService.createAccount(data);

      if (uData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (err) {
      console.log("Signup error:", err);

      if (err.code === 400) {
        setError(
          "Please check your email and password. Password must be at least 8 characters.",
        );
      } else if (err.code === 409) {
        setError("An account with this email already exists.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex w-full items-center justify-center px-4 py-10 text-center text-black sm:py-16">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:p-10">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-25 rounded-xl bg-slate-50 px-3 py-2">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
          Create a New Account
        </h2>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
        {error && (
          <p className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-left text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <p className="mb-4 text-left text-xs text-slate-500">
            <span className="text-red-500">*</span> Required fields
          </p>
          <div className="space-y-5 text-left">
            <Input
              label="Full name"
              required
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
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
              type="password"
              placeholder="Enter password"
              label="Password"
              required
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            <Button
              children="Create Account"
              type="submit"
              className="w-full py-3"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
