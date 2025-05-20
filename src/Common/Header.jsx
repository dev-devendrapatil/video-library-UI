import React, { useContext, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import userAPI from "../Service/userApi.service";
import { AppContext } from "../Context/AppContext";
import { FaUserAlt } from "react-icons/fa";
import UTILITY from "../utils";
import ClickAwayListener from "react-click-away-listener";

const Header = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const getUserDetails = () => {
    userAPI.getUserDetails().then((res) => {
      if (res.statusCode !== 403) {
        setIsUserLoggedIn(true);
        setUser(res.data);
      }
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleLogout = () => {
    // Implement actual logout logic here
    userAPI.logoutUser().then((res) => {
      if (res.statusCode === 200) {
        setIsUserLoggedIn(false);
        setUser(null);
        setIsOpen(false)
        navigate("/login");
      } else {
        UTILITY.TOST("error", res.message);
      }
    });
  };
const handleEditUser = ()=>{
navigate("/edit-user")
setIsOpen(false)
}

  return (
    <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
      <nav className="mx-auto flex max-w-8xl items-center py-2 relative">
        <div className="mr-4 w-12 shrink-0 sm:w-16">
          <img src="/icons/logo.svg" />
        </div>
        <div className="relative mx-auto w-full max-w-md max-md:hidden overflow-hidden">
          <input
            className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white text-white outline-none sm:py-2"
            placeholder="Search"
          />
          <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2 text-white">
            <IoIosSearch size={20} />
          </span>
        </div>
        <div className="ml-auto flex items-center gap-3 max-md:hidden relative">
          {!isUserLoggedIn ? (
            <>
              <button
                className="w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] sm:w-auto sm:bg-transparent text-white"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className="mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="capitalize"> {user.userName}</span>

                <div className="w-11 h-11 rounded-full flex items-center justify-center border border-white text-white cursor-pointer">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="User"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <FaUserAlt />
                  )}{" "}
                </div>
              </div>
              {isOpen && (
                <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                  <div className="absolute right-0 top-16 w-44 bg-[#2a2a2a]  rounded-2xl shadow-lg bg- z-50">
                    <button
                      className="block w-full text-left px-4 py-2 rounded-t-2xl text-sm text-white hover:bg-[#3a3a3a]"
                      onClick={() => handleEditUser()}
                    >
                      Edit User
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 rounded-b-2xl  text-sm text-red-600 hover:bg-[#3a3a3a]"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </ClickAwayListener>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Header);
