"use client";
import { Pagination } from "flowbite-react";
import React, { useState } from "react";
type Props = {
  currentPage: number;
  pageCount: number;
};

export default function AppPagination({ currentPage, pageCount }: Props) {
  const [pageNumber, setPageNumber] = useState(currentPage);
  return (
    <Pagination
      currentPage={pageNumber}
      onPageChange={(e) => setPageNumber(e)}
      totalPages={pageCount}
      showIcons={true}
      layout="pagination"
      className="text-blue-500 mb-5"
    />
  );
}
