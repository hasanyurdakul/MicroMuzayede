"use client";
import { Button, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";
import DateInput from "../components/DateInput";
import { createAuction, updateAuction } from "../actions/auctionActions";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Auction } from "@/types";

type Props = {
  auction?: Auction;
};

export default function AuctionForm({ auction }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({ make, model, color, mileage, year });
    }
    setFocus("make");
  }, [setFocus, reset, auction]);

  async function onSubmit(data: FieldValues) {
    try {
      let id = "";
      let res;
      if (pathname === "/auctions/create") {
        res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          res = await updateAuction(data, auction.id);
          id = auction.id;
        }
      }
      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${id}`);
    } catch (error: any) {
      toast.error(error.status + " " + error.message);
    }
  }

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={"Make"}
        name={"make"}
        control={control}
        rules={{ required: "Make is required" }}
      />
      <Input
        label={"Model"}
        name={"model"}
        control={control}
        rules={{ required: "Model is required" }}
      />
      <Input
        label={"Color"}
        name={"color"}
        control={control}
        rules={{ required: "Color is required" }}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label={"Year"}
          name={"year"}
          control={control}
          type="number"
          rules={{ required: "Year is required" }}
        />
        <Input
          label={"Mileage"}
          name={"mileage"}
          control={control}
          type="number"
          rules={{ required: "Mileage is required" }}
        />
      </div>
      {pathname === "/auctions/create" && (
        <>
          <Input
            label={"Image URL"}
            name={"imageUrl"}
            control={control}
            rules={{ required: "Image URL is required" }}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label={"Reserve Price (Enter 0 for no reserve)"}
              name={"reservePrice"}
              control={control}
              type="number"
              rules={{ required: "Reserve Price is required" }}
            />
            <DateInput
              label={"Auction End Date"}
              name={"auctionEnd"}
              control={control}
              dateFormat={"dd MMMM yyyy h:mm a"}
              showTimeSelect
              rules={{ required: "Auction End Date is required" }}
            />
          </div>
        </>
      )}
      <div className="flex justify-between">
        <Button outline color={"gray"}>
          Cancel
        </Button>
        <Button
          outline
          color={"success"}
          isProcessing={isSubmitting}
          disabled={!isValid}
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
