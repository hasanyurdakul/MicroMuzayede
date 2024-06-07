"use server";
import { Auction, PagedResult } from "@/types";

export async function getData(
  pageNumber: number,
  pageSize: number
): Promise<PagedResult<Auction>> {
  const result = await fetch(
    `http://localhost:6001/search?&pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
  if (!result.ok) {
    throw new Error("Failed to fetch data");
  }
  return result.json();
}
