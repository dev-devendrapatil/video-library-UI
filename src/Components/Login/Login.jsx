import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import userAPI from "../../Service/userApi.service";
import UTILITY from "../../utils";
import Loader from "../../Common/Loader";

// Validation schema (identifier can be email or username)
const loginSchema = Joi.object({
  identifier: Joi.string().required().messages({
    "string.empty": "Email or Username is required.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
  }),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    console.log("data", data);
    const payload = {
      password: data.password,
    };
    if (data.identifier.includes("@")) {
      payload.email = data.identifier;
    } else {
      payload.userName = data.identifier;
    }
    userAPI
      .loginUser(payload) 
      .then((res) => {
        if (res.success === false) {
          UTILITY.TOST("error", res.message);
        } else {
          UTILITY.TOST("success", res.message);
          navigate("/dashboard");
        }
        setLoading(false);
      })
      .catch((error) => {
        UTILITY.TOST("error", error.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
      {
        loading&&<Loader/>
      }
      <div className="w-full max-w-4xl flex flex-col-reverse md:flex-row shadow-lg overflow-hidden rounded-2xl bg-[#1e1e1e]">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-400 mb-6">Login to your account</p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(errors).length > 0 && (
              <div className="mb-4 rounded-md bg-red-500/10 p-3">
                <ul className="list-disc list-inside text-sm text-red-400 space-y-1">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error?.message}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <label className="block mb-1 text-sm">Email or Username</label>
              <input
                type="text"
                {...register("identifier")}
                className={`w-full px-4 py-2 rounded-md bg-[#2b2b2b] text-white outline-none ${
                  errors.identifier
                    ? "ring-1 ring-red-500"
                    : "focus:ring-1 focus:ring-[#ae7aff]"
                }`}
                placeholder="Enter your email or username"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                {...register("password")}
                className={`w-full px-4 py-2 rounded-md bg-[#2b2b2b] text-white outline-none ${
                  errors.password
                    ? "ring-1 ring-red-500"
                    : "focus:ring-1 focus:ring-[#ae7aff]"
                }`}
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-400">
             
              <a href="#" className="text-[#ae7aff] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-[#ccc]" : "bg-[#ae7aff]"
              } text-black font-bold py-2 rounded-md shadow-[4px_4px_0_0_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[4px] active:translate-y-[4px] active:shadow-none`}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400 text-center">
            Don't have an account?{" "}
            <button  className="text-[#ae7aff] hover:underline" onClick={()=>navigate("/signup")}>
              Sign up
            </button>
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-[#ae7aff] flex items-center justify-center p-6">
          <img src="/icons/logo.svg" alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Login;
