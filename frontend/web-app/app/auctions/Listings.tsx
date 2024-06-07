import React from "react";
import AuctionCard from "./AuctionCard";

async function getData() {
  const result = await fetch("http://localhost:6001/search?pageSize=10");
  if (!result.ok) {
    throw new Error("Failed to fetch data");
  }
  return result.json();
}

export default async function Listings() {
  const data = await getData();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {data &&
        data.results.map((auction: any) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
    </div>
  );
}
