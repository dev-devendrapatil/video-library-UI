import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import Loader from "../../Common/Loader";
import UTILITY from "../../utils";
import { AppContext } from "../../Context/AppContext";
import userAPI from "../../Service/userApi.service";

// Validation schema
const channelDetailsSchema = Joi.object({
  userName: Joi.string().trim().min(3).max(30).alphanum().required().messages({
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters.",
  }),
  description: Joi.string().trim().max(250).allow("").messages({
    "string.max": "Description cannot exceed 250 characters.",
  }),
});

const EditChannelDetails = ({ getUserDetails }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext);
  const [descLength, setDescLength] = useState(user.description?.length || 0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(channelDetailsSchema),
    defaultValues: {
      userName: user.userName || "",
      description: user.description || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await userAPI.updateUserDetails(data);
      if (!response.success) {
        UTILITY.TOST("error", response.message);
      } else {
        UTILITY.TOST("success", response.message);
        getUserDetails();
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
        <div className="text-lg font-semibold">Channel Information</div>
        <div className="text-sm font-thin text-gray-300">
          Update your username and channel description.
        </div>
      </div>

      <div className="col-span-5 mt-5 px-7">
        <form
          className="border rounded-lg w-full py-4 px-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 relative">
            <label className="block mb-1 text-sm">Username</label>
            <span className="absolute top-8 left-2 text-gray-300">@</span>
            <input
              type="text"
              {...register("userName")}
              className={`w-full border pl-6 pr-4 py-2 rounded-md bg-[#2b2b2b] text-white outline-none ${
                errors.userName ? "ring-1 ring-red-500" : "focus:ring-1 focus:ring-[#ae7aff]"
              }`}
              placeholder="Enter your username"
            />
            {errors.userName && (
              <p className="text-sm text-red-400 mt-1">{errors.userName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">Description</label>
            <textarea
              {...register("description")}
              rows="4"
              maxLength={250}
              onChange={(e) => setDescLength(e.target.value.length)}
              className={`w-full border px-4 py-2 rounded-md bg-[#2b2b2b] text-white outline-none resize-none ${
                errors.description ? "ring-1 ring-red-500" : "focus:ring-1 focus:ring-[#ae7aff]"
              }`}
              placeholder="Write something about your channel..."
            />
            <div className="text-xs text-gray-400 text-right mt-1">
              {descLength || 0}/250 characters
            </div>
            {errors.description && (
              <p className="text-sm text-red-400 mt-1">{errors.description.message}</p>
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

export default EditChannelDetails;
