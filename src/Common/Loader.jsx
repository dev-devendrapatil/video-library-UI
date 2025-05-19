import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-0 bg-opacity-40 flex justify-center items-center min-h-screen bg-[#121212]">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-4 h-4 bg-[#ae7aff] rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
