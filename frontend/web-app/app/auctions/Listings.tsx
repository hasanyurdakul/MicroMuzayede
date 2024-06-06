import React from "react";

async function getData() {
  const result = await fetch("http://localhost:6001/search");
  if (!result.ok) {
    throw new Error("Failed to fetch data");
  }
  return result.json();
}

export default async function Listings() {
  const data = await getData();
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
