import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  return (
    <header className="sticky inset-x-0 px-10 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
      <nav className="mx-auto flex max-w-8xl items-center py-2">
        <div className="mr-4 w-12 shrink-0 sm:w-16">
          <img src="/icons/logo.svg" />
        </div>
        <div className="relative mx-auto  w-full max-w-md max-md:hidden overflow-hidden ">
          <input
            className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
            placeholder="Search"
          />
          <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
            <IoIosSearch size={20} />
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2 max-md:hidden">
          <button className="w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] sm:w-auto sm:bg-transparent" onClick={()=>navigate("/login")}>
            Log in
          </button>
          <button className="mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto" onClick={()=>navigate("/signup")}>
            Sign up
          </button>
        </div>
             
      </nav>
    </header>
  );
};

export default React.memo(Header);
