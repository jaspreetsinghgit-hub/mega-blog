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
      console.log("Error in signup component's create function : ", err);
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
          Create a New Account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 sm:text-base">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
        {error && <p className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-7">
          <p className="mb-4 text-left text-xs text-slate-500"><span className="text-red-500">*</span> Required fields</p>
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
                required: true,
              })}
            />
            <Button
              children="Create Account"
              type="submit"
              className="w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
