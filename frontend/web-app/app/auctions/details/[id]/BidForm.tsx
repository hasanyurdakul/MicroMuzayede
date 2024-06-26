"use client";
import { placeBidForAuction } from "@/app/actions/auctionActions";
import { numberWithCommas } from "@/app/lib/NumberWithComma";
import { useBidStore } from "@/hooks/useBidStore";
import { hi } from "date-fns/locale";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  auctionId: string;
  highBid: number;
};

export default function BidForm({ auctionId, highBid }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const addBid = useBidStore((state) => state.addBid);

  function onSubmit(data: FieldValues) {
    if (data.amount <= highBid) {
      reset();
      return toast.error(
        `Your bid must be higher than the $${numberWithCommas(highBid)}!`
      );
    }
    placeBidForAuction(auctionId, +data.amount)
      .then((bid) => {
        if (bid.error) throw bid.error;
        addBid(bid);
      })
      .catch((err) => toast.error(err.message));
    reset();
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center border-2 rounded-lg py-2"
    >
      <input
        type="number"
        {...register("amount")}
        className="input-custom text-sm text-gray-600"
        placeholder={`Enter your bid (minimum bid is $${numberWithCommas(
          highBid + 1
        )})`}
      />
    </form>
  );
}
