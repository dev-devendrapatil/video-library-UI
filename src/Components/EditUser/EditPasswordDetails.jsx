import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import Loader from "../../Common/Loader";
import UTILITY from "../../utils";
import userAPI from "../../Service/userApi.service";
import { FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Validation schema
const passwordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "string.empty": "Current password is required.",
  }),
  newPassword: Joi.string().min(6).max(30).required().messages({
    "string.empty": "New password is required.",
    "string.min": "New password must be at least 6 characters.",
  }),
  confirmPassword: Joi.any().equal(Joi.ref("newPassword")).required().messages({
    "any.only": "Passwords do not match.",
    "string.empty": "Please confirm your password.",
  }),
});

const EditPasswordDetails = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(passwordSchema),
  });

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const payload = {
      password: data.currentPassword,
      newPassword: data.newPassword,
    };

    try {
      const response = await userAPI.updatePassword(payload);
      if (!response.success) {
        UTILITY.TOST("error", response.message);
      } else {
        UTILITY.TOST("success", response.message);
      }
    } catch (error) {
      UTILITY.TOST("error", error.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-7 text-white">
      {loading && <Loader />}
      <div className="col-span-2 pt-14 pl-14">
        <div className="text-lg font-semibold">Change Password</div>
        <div className="text-sm font-thin text-gray-300">
          Update your account password.
        </div>
      </div>

      <div className="col-span-5 mt-5 px-7">
        <form
          className="border rounded-lg w-full py-4 px-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {[
            { name: "currentPassword", label: "Current Password", show: showPassword.current },
            { name: "newPassword", label: "New Password", show: showPassword.new },
            { name: "confirmPassword", label: "Confirm New Password", show: showPassword.confirm },
          ].map(({ name, label, show }, i) => (
            <div key={name} className="mb-4">
              <label className="block mb-1 text-sm">{label}</label>
              <div className="relative">
                <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
                  <FaLock />
                </span>
                <input
                  type={show ? "text" : "password"}
                  {...register(name)}
                  className={`w-full pl-10 pr-10 py-2 border rounded-md bg-[#2b2b2b] text-white outline-none ${
                    errors[name] ? "ring-1 ring-red-500" : "focus:ring-1 focus:ring-[#ae7aff]"
                  }`}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => toggleVisibility(name === "currentPassword" ? "current" : name === "newPassword" ? "new" : "confirm")}
                >
                  {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors[name] && (
                <p className="text-sm text-red-400 mt-1">{errors[name].message}</p>
              )}
            </div>
          ))}

          <hr className="my-4" />
          <div className="flex items-center gap-2 justify-end">
            <button type="reset" className="border py-2 px-7 text-sm rounded-lg">
              Cancel
            </button>
            <button
              type="submit"
              className="mr-1 bg-[#ae7aff] px-3 py-2 text-sm text-black transition-all duration-150 ease-in-out rounded-lg active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPasswordDetails;
