import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import userAPI from "../../Service/userApi.service";
import Loader from "../../Common/Loader";
import UTILITY from "../../utils";
import { AppContext } from "../../Context/AppContext";

// Validation schema
const personalDetailsSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(30).required().messages({
    "string.empty": "First name is required.",
  }),
  lastName: Joi.string().trim().min(2).max(30).required().messages({
    "string.empty": "Last name is required.",
  }),
  email: Joi.string().trim().email({ tlds: false }).required().messages({
    "string.email": "Email must be valid.",
    "string.empty": "Email is required.",
  }),
});

const EditPersonalDetails = ({getUserDetails}) => {
  const [loading, setLoading] = useState(false);
  const {user,setUser} = useContext(AppContext)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(personalDetailsSchema),
      defaultValues: {
    firstName: user.fullName.split(" ")[0],
    lastName: user.fullName.split(" ")[1],
    email: user.email,
  },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const payLoad = {
    fullName : `${data.firstName} ${data.lastName}`,
    email: data.email
}
    try {
      const response = await userAPI.updateUserDetails(payLoad);
      if (!response.success) {
        UTILITY.TOST("error", response.message);
      } else {
        UTILITY.TOST("success", response.message);
        getUserDetails()
      }
    } catch (error) {
      UTILITY.TOST("error", error.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="grid grid-cols-7 text-white">
      {loading && <Loader />}
      <div className="col-span-2 pt-14 pl-14">
        <div className="text-lg font-semibold">Personal Information</div>
        <div className="text-sm font-thin text-gray-300">
          Update your photo and personal details.
        </div>
      </div>

      <div className="col-span-5 mt-5 px-7">
        <form
          className="border rounded-lg w-full py-4 px-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 text-sm">First Name</label>
              <input
                type="text"
                {...register("firstName")}
                className={`w-full border px-4 py-2 rounded-md bg-[#2b2b2b] text-white outline-none ${
                  errors.firstName ? "ring-1 ring-red-500" : "focus:ring-1 focus:ring-[#ae7aff]"
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="text-sm text-red-400 mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div className="w-1/2">
              <label className="block mb-1 text-sm">Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                className={`w-full border px-4 py-2 rounded-md bg-[#2b2b2b] text-white outline-none ${
                  errors.lastName ? "ring-1 ring-red-500" : "focus:ring-1 focus:ring-[#ae7aff]"
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="text-sm text-red-400 mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="text"
              {...register("email")}
              className={`w-full border px-4 py-2 rounded-md bg-[#2b2b2b] text-white outline-none ${
                errors.email ? "ring-1 ring-red-500" : "focus:ring-1 focus:ring-[#ae7aff]"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          <hr className="my-4" />
          <div className="flex items-center gap-2 justify-end">
            <button type="reset" className="border py-2 px-7 text-sm rounded-lg">
              Cancel
            </button>
            <button
              type="submit"
              className="mr-1 bg-[#ae7aff] px-3 py-2 text-sm text-black transition-all duration-150 ease-in-out rounded-lg active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPersonalDetails;
