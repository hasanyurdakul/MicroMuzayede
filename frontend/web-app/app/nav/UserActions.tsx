"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import { Button, Dropdown } from "flowbite-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { HiCog, HiUser } from "react-icons/hi";

type Props = {
  user: User;
};

export default function UserActions({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const setParams = useParamsStore((state) => state.setParams);
  function setWinner() {
    setParams({ winner: user.username, seller: undefined });
    if (pathname !== "/") {
      router.push("/");
    }
  }
  function setSeller() {
    setParams({ winner: undefined, seller: user.username });
    if (pathname !== "/") {
      router.push("/");
    }
  }
  return (
    <Dropdown label={`Welcome ${user.name}`} inline>
      <Dropdown.Item icon={HiUser} onClick={setSeller}>
        My Auctions
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy} onClick={setWinner}>
        Auctions Won
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href="/auctions/create">Sell My Car</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href="/session">Session (DEV ENV ONLY)</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        icon={AiOutlineLogout}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Logout
      </Dropdown.Item>
    </Dropdown>
  );
}
