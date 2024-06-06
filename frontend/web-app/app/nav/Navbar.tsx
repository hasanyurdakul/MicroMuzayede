import React from "react";
import { IoCarSport } from "react-icons/io5";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md ">
      <div className="flex items-center gap-2 text-3xl font-semibold text-red-500">
        <IoCarSport size={34} />
        <div>Micro Muzeyede</div>
      </div>
      <div>SEARCH</div>
      <div>LOGIN</div>
    </header>
  );
}
