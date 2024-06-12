"use server";
import { Auction, PagedResult } from "@/types";

export async function getData(query: string): Promise<PagedResult<Auction>> {
  const result = await fetch(`http://localhost:6001/search${query}`);
  if (!result.ok) {
    throw new Error("Failed to fetch data");
  }
  return result.json();
}
