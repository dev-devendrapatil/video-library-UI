import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import userAPI from "../../Service/userApi.service";
import { useState } from "react";
import UTILITY from "../../utils";
import { useNavigate } from "react-router-dom";
import Loader from "../../Common/Loader";

// Validation schema
const userSchemaValidator = Joi.object({
  fullName: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Full name is required.",
  }),
  userName: Joi.string().trim().alphanum().min(3).max(30).required().messages({
    "string.empty": "Username is required.",
  }),
  email: Joi.string().trim().email({ tlds: false }).required().messages({
    "string.email": "Email must be valid.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,16}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 6-16 chars, with uppercase, lowercase, number & special character.",
      "string.empty": "Password is required.",
    }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
    "any.required": "Please confirm your password.",
  }),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(userSchemaValidator),
  });

  const onSubmit = (data) => {
    setLoading(true);
    const payload = {
      userName: data.userName,
      email: data.email,
      fullName: data.fullName,
      password: data.password,
    };
    userAPI
      .registerUser(payload)
      .then((res) => {
        console.log(res);
        if (res.success === false) {
          UTILITY.TOST("error", res.message);
        }
        UTILITY.TOST("success", res.message);

        navigate("/login");
        setLoading(false);
      })
      .catch((error) => {
        UTILITY.TOST("error", error.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white px-4">
      {
        loading&&<Loader/>
      }
      <div className="w-full max-w-4xl flex flex-col-reverse md:flex-row shadow-lg overflow-hidden rounded-2xl bg-[#1e1e1e]">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-sm text-gray-400 mb-6">Join us and get started</p>

          <form className="space-y-2.5" onSubmit={handleSubmit(onSubmit)}>
            {/* All errors on top */}

            <div>
              <label className="block mb-1 text-sm">Username</label>
              <input
                type="text"
                {...register("userName")}
                className={`w-full px-4 py-2 rounded-md bg-[#2b2b2b] text-white outline-none ${
                  errors.userName
                    ? "ring-1 ring-red-500"
                    : "focus:ring-1 focus:ring-[#ae7aff]"
                }`}
                placeholder="Enter your username"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                {...register("email")}
                className={`w-full px-4 py-2 rounded-md bg-[#2b2b2b] text-white outline-none ${
                  errors.email
                    ? "ring-1 ring-red-500"
                    : "focus:ring-1 focus:ring-[#ae7aff]"
                }`}
                placeholder="Enter your email"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block mb-1 text-sm">Full Name</label>
              <input
                type="text"
                {...register("fullName")}
                className={`w-full px-4 py-2 rounded-md bg-[#2b2b2b] text-white outline-none ${
                  errors.fullName
                    ? "ring-1 ring-red-500"
                    : "focus:ring-1 focus:ring-[#ae7aff]"
                }`}
                placeholder="Enter your full name"
              />
            </div>

            {/* Password */}
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
                placeholder="Create a password"
              />
            </div>

            {/* Confirm Password */}
            <div className="pb-10">
              <label className="block mb-1 text-sm">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword")}
                className={`w-full px-4 py-2 rounded-md bg-[#2b2b2b] text-white outline-none ${
                  errors.confirmPassword
                    ? "ring-1 ring-red-500"
                    : "focus:ring-1 focus:ring-[#ae7aff]"
                }`}
                placeholder="Repeat your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full  bg-[#ae7aff] text-black font-bold py-2 rounded-md shadow-[4px_4px_0_0_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            >
              Sign up
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <button  className="text-[#ae7aff] hover:underline" onClick={()=>navigate("/login")}>
              Log in
            </button>
          </p>
        </div>

        {/* Right side - Visual section */}
        <div
          className={`w-full md:w-1/2 flex flex-col items-center justify-center p-6 transition-colors duration-500 ease-in-out ${
            Object.keys(errors).length > 0
              ? "bg-[#121212] border border-white rounded-r-2xl"
              : "bg-[#ae7aff]"
          }`}
        >
          {" "}
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 rounded-md bg-red-500/10 p-3">
              <ul className="list-disc list-inside text-sm text-red-400 space-y-1">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error?.message}</li>
                ))}
              </ul>
            </div>
          )}
          <img src="/icons/logo.svg" className="mx-auto px-10 " />
          <h1 className="text-4xl font-extrabold text-white text-center leading-snug mt-4">
            Join the Future <br /> Create Your Account 🚀
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
