"use server";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { Auction, PagedResult } from "@/types";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { FieldValues } from "react-hook-form";

export async function getData(query: string): Promise<PagedResult<Auction>> {
  // const result = await fetch(`http://localhost:6001/search${query}`);
  // if (!result.ok) {
  //   throw new Error("Failed to fetch data");
  // }
  // return result.json();
  return await fetchWrapper.get(`search${query}`);
}

export async function updateAuctionTest() {
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

export async function createAuction(data: FieldValues) {
  return await fetchWrapper.post("auctions", data);
}

export async function getDetailedViewData(id: string): Promise<Auction> {
  return await fetchWrapper.get(`auctions/${id}`);
}

export async function updateAuction(data: FieldValues, id: string) {
  revalidatePath(`/auctions/${id}`);
  return await fetchWrapper.put(`auctions/${id}`, data);
}

export async function deleteAuction(id: string) {
  return await fetchWrapper.del(`auctions/${id}`);
}
