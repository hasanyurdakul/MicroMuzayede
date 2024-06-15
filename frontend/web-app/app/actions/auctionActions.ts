"use server";
import { Auction, PagedResult } from "@/types";

export async function getData(query: string): Promise<PagedResult<Auction>> {
  const result = await fetch(`http://localhost:6001/search${query}`);
  if (!result.ok) {
    throw new Error("Failed to fetch data");
  }
  return result.json();
}

export async function UpdateAuctionTest() {
  const data = {
    mileage: Math.floor(Math.random() * 100000) + 1,
  };

  const res = await fetch(
    "http://localhost:6001/auctions/466e4744-4dc5-4987-aae0-b621acfc5e39",
    {
      method: "PUT",
      headers: {},
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    return { status: res.status, message: res.statusText };
  }

  return res.statusText;
}
