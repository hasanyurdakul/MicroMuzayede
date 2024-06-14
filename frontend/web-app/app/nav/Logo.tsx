"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoCarSport } from "react-icons/io5";

export default function Logo() {
  const router = useRouter();
  const pathName = usePathname();
  const reset = useParamsStore((state) => state.reset);
  function doReset() {
    if (pathName !== "/") {
      router.push("/");
      reset();
    }
  }
  return (
    <div
      onClick={doReset}
      className="flex cursor-pointer items-center gap-2 text-3xl font-semibold text-red-500"
    >
      <IoCarSport size={34} />
      <div>Micro Muzeyede</div>
    </div>
  );
}
