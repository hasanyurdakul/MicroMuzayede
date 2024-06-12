import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <div className="flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm">
      <input
        type="text"
        placeholder="Search for cars by make, model or color"
        className="border-transparent flex-grow rounded-full bg-transparent pl-5 focus:outline-none focus:border-transparent focus:ring-0 text-sm text-gray-600 "
      />
      <button className="">
        <FaSearch
          size={34}
          className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"
        />
      </button>
    </div>
  );
}
