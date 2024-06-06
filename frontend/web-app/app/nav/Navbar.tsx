import React from "react";
import { IoCarSport } from "react-icons/io5";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md ">
      <div className="flex items-center">
        <IoCarSport />
        <div>MicroMuzeyede</div>
      </div>
      <div>MID</div>
      <div>RIGHT</div>
    </header>
  );
}
