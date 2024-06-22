"use client";
import { useAuctionStore } from "@/hooks/useAuctionStore";
import { useBidStore } from "@/hooks/useBidStore";
import { Bid } from "@/types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

export default function SignalRProvider({ children }: Props) {
  const [connection, setConnection] = useState<HubConnection | null>();
  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:6001/notifications")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR");

          connection.on("BidPlaced", (bid: Bid) => {
            console.log("Bid Placed Event Received");

            if (bid.bidStatus.includes("Accepted")) {
              setCurrentPrice(bid.auctionId, bid.amount);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      connection?.stop();
    };
  }, [connection, setCurrentPrice]);
  return children;
}
