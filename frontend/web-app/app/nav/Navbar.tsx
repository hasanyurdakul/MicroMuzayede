import React from "react";
import Search from "./Search";
import Logo from "./Logo";
import LoginButton from "./LoginButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md ">
      <Logo />
      <Search />
      <LoginButton />
    </header>
  );
}
