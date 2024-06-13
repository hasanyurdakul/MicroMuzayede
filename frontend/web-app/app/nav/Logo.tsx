"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import React from "react";
import { IoCarSport } from "react-icons/io5";

export default function Logo() {
  const reset = useParamsStore((state) => state.reset);
  return (
    <div
      onClick={reset}
      className="flex cursor-pointer items-center gap-2 text-3xl font-semibold text-red-500"
    >
      <IoCarSport size={34} />
      <div>Micro Muzeyede</div>
    </div>
  );
}
