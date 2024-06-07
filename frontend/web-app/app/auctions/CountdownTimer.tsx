"use client";
import React from "react";
import Countdown, { zeroPad } from "react-countdown";

type rendererProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

type Props = {
  auctionEnd: string;
};
const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: rendererProps) => {
  return (
    <div
      className={`
    border-2 border-white text-white py-1 px-1 rounded-lg flex justify-center
    ${
      completed
        ? "bg-red-500"
        : days === 0 && hours < 10
        ? "bg-amber-500"
        : "bg-green-500"
    }
    `}
    >
      {completed ? (
        <span>Finished!</span>
      ) : (
        <span suppressHydrationWarning={true}>
          {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )}
    </div>
  );
};

export default function CountdownTimer({ auctionEnd }: Props) {
  return (
    <div>
      <Countdown date={auctionEnd} renderer={renderer} />
    </div>
  );
}
