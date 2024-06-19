"use server";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { Auction, PagedResult } from "@/types";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";

export async function getData(query: string): Promise<PagedResult<Auction>> {
  // const result = await fetch(`http://localhost:6001/search${query}`);
  // if (!result.ok) {
  //   throw new Error("Failed to fetch data");
  // }
  // return result.json();
  return await fetchWrapper.get(`search${query}`);
}

export async function UpdateAuctionTest() {
  const data = {
    mileage: Math.floor(Math.random() * 100000) + 1,
  };

  return await fetchWrapper.put(
    "auctions/466e4744-4dc5-4987-aae0-b621acfc5e39",
    data
  );
}

export async function getTokenWorkaround() {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  } as NextApiRequest;

  return await getToken({ req });
}
