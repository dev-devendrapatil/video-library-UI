import React from 'react';
import { FaHome } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import { FaFolder } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate()
  return (
     <aside
      className="group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] lg:sticky lg:max-w-[250px]">
      <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
        <li className="">
          <button
            className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4" onClick={()=>navigate('/')}>
            <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
             <FaHome/>
            </span>
            <span className="block sm:hidden sm:group-hover:inline lg:inline">Home</span>
          </button>
        </li>
        <li className="hidden sm:block">
          <button
            className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4" onClick={()=>navigate('/likedVideo')}>
            <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4" >
              <AiFillLike/>
            </span>
            <span className="block sm:hidden sm:group-hover:inline lg:inline">Liked Videos</span>
          </button>
        </li>
        <li className="">
          <button
            className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4" onClick={()=>navigate('/watchHistory')}>
            <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4" >
             <FaHistory/>
            </span>
            <span className="block sm:hidden sm:group-hover:inline lg:inline">History</span>
          </button>
        </li>
        <li className="hidden sm:block">
          <button
            className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4">
            <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
              <IoVideocam/>
            </span>
            <span className="block sm:hidden sm:group-hover:inline lg:inline">My Content</span>
          </button>
        </li>

        <li className="">
          <button
            className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4" onClick={()=>navigate('/subscriptions')}>
            <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
            <FaUserCheck/>
            </span>
            <span className="block sm:hidden sm:group-hover:inline lg:inline">Subscriptions</span>
          </button>
        </li>
        <li className="hidden sm:block mt-auto">
          <button
            className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4">
            <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
            <MdOutlineSupportAgent size={20}/>
            </span>
            <span className="block sm:hidden sm:group-hover:inline lg:inline">Support</span>
          </button>
        </li>
        <li className="hidden sm:block">
          <button
            className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4">
            <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
              <IoMdSettings size={20}/>
            </span>
            <span className="block sm:hidden sm:group-hover:inline lg:inline">Settings</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
