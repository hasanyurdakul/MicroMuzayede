"use client";
import React, { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import { Auction } from "@/types";
import AppPagination from "../components/AppPagination";
import { getData } from "../actions/auctionActions";

export default function Listings() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    getData(pageNumber).then((data) => {
      setAuctions(data.results);
      setPageCount(data.pageCount);
    });
  }, [pageNumber]);
  if (auctions.length === 0) {
    return (
      <div className="items-center">
        <h3>Loading...</h3>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <AppPagination
          pageChanged={setPageNumber}
          currentPage={pageNumber}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
