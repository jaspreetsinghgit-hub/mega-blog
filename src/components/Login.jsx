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

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    console.log(data);
    setError("");
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));

        navigate("/");
      }
    } catch (err) {
      setError(err.message);
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
        {error && <p className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-7">
          <div className="space-y-5 text-left">
            <Input
              type="email"
              label="Email"
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
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button children="Sign in" type="submit" className="w-full" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
