import React, { useEffect, useState } from "react";
import ModalWrapper from "../../Common/ModalWrapper";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { FiUpload } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import videoAPI from "../../Service/videoAPI.service";
import UTILITY from "../../utils";

const schema = Joi.object({
  video: Joi.object().required().messages({
    "any.required": "Video file is required",
  }),
  thumbnail: Joi.object().required().messages({
    "any.required": "Thumbnail is required",
  }),
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
  }),
  desc: Joi.string().min(10).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters",
  }),
  isPublished: Joi.boolean().required(),
});

// ...imports remain the same

const UploadVideoModal = ({ isModalOpen, setIsModalOpen }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      isPublished: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("isPublished", data.isPublished);
      formData.append("description", data.desc);
      formData.append("videoFile", data.video);
      formData.append("thumbnail", data.thumbnail);

      await videoAPI.uploadVideo(formData).then((res)=>{{
        if(res.success===true){
        UTILITY.TOST("success",res.message)

        }
        else{
                  UTILITY.TOST("error",res.message)

        }
      }});
      setIsModalOpen(false);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      setValue(name, file, { shouldValidate: true });
      if (name === "video") {
        setVideoPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setValue("video", file, { shouldValidate: true });
      setVideoPreview(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (!isModalOpen) {
      reset();
      setVideoPreview(null);
    }
  }, [isModalOpen, reset]);
  return (
    <ModalWrapper
      isOpen={isModalOpen}
      onClose={() => !isUploading && setIsModalOpen(false)}
      title="Upload Video"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-h-[80vh] overflow-hidden flex flex-col relative ${
          isUploading ? "pointer-events-none opacity-50" : ""
        }`}
      >
        {isUploading && (
          <div className="absolute inset-0 z-20 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <ImSpinner2 className="animate-spin text-[#ae7aff] text-4xl mb-4" />
              <p className="text-white font-semibold">Uploading video...</p>
            </div>
          </div>
        )}

        <div className="mx-auto w-full max-w-4xl flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Video Upload */}
            <div
              className={`col-span-1 md:col-span-2 border-2 border-dashed px-4 py-6 text-center rounded-md transition-all duration-200 ${
                isDragging ? "bg-[#eaeaea]" : ""
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {videoPreview ? (
                <video
                  src={videoPreview}
                  controls
                  className="w-full max-h-80 mx-auto rounded"
                />
              ) : (
                <>
                  <span className="mb-4 inline-block rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                    <FiUpload size={24} />
                  </span>
                  <h6 className="mb-2 font-semibold">
                    Drag and drop video files to upload
                  </h6>
                  <p className="text-gray-400">
                    Your videos will be private until you publish them.
                  </p>
                  <label
                    htmlFor="upload-video"
                    className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-4 py-1 text-sm text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
                  >
                    <input
                      type="file"
                      id="upload-video"
                      accept="video/*"
                      className="sr-only"
                      onChange={(e) => handleFileInput(e, "video")}
                    />
                    Select Video
                  </label>
                </>
              )}
              {errors.video && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.video.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div className="col-span-1">
              <label htmlFor="title" className="mb-1 inline-block font-medium">
                Title <sup className="text-red-500">*</sup>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                className="w-full border rounded bg-transparent px-3 py-2 outline-none"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div className="col-span-1">
              <label
                htmlFor="thumbnail"
                className="mb-1 inline-block font-medium"
              >
                Thumbnail <sup className="text-red-500">*</sup>
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="w-full border rounded px-2 py-1 text-sm file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
                onChange={(e) => handleFileInput(e, "thumbnail")}
              />
              {errors.thumbnail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.thumbnail.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="desc" className="mb-1 inline-block font-medium">
                Description <sup className="text-red-500">*</sup>
              </label>
              <textarea
                id="desc"
                rows={4}
                placeholder="Write a detailed description..."
                className="w-full border rounded bg-transparent px-3 py-2 outline-none resize-none"
                {...register("desc")}
              />
              {errors.desc && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.desc.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer with Publish Toggle and Save Button */}
        <div className="border-t bg-[#121212] px-4 py-3 text-right sticky bottom-0 flex items-center justify-between">
          {/* Publish Toggle */}
          <label className="flex items-center gap-3 text-sm font-medium">
            <span className="text-white">Publish</span>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register("isPublished")}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-[#ae7aff] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
            </div>
          </label>

          <button
            type="submit"
            disabled={isUploading}
            className="group/btn inline-flex items-center gap-x-2 bg-[#ae7aff] px-5 py-2 font-bold text-black shadow-[4px_4px_0px_0px_#4f4e4e] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none rounded disabled:opacity-60"
          >
            {isUploading ? "Uploading..." : "Save"}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default UploadVideoModal;
