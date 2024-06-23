import React from "react";
import Image from "next/image";

export default function MicroImage() {
  return <Image src={"/logo.png"} alt={""} width={100} height={100} />;
}
