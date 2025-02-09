"use client";
import { useEffect, useState } from "react";
import Container from "@/components/shared/Container";
import ImageCard from "@/components/shared/ImageCard";
import axiosInstance from "@/utils/axiosInstance";
import { SingleImageCardProps } from "@/types/index.type";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Discover = () => {
  const [images, setImages] = useState<SingleImageCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/discover-image?page=${currentPage}&limit=9`)
      .then((res) => {
        setImages(res?.data?.images);
        setTotalPages(res?.data?.totalPages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [currentPage]);

  const generatePaginationNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 4;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 2) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
        {loading
          ? Array(9)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-64 w-full animate-pulse rounded-md bg-gray-200"
                />
              ))
          : images?.map((image) => (
              <ImageCard key={image?._id} image={image} />
            ))}
      </div>

      {/* Pagination Controls */}
      <div className="mb-10 mt-6 flex justify-center">
        <Pagination>
          <PaginationContent className="gap-2">
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  if (currentPage === 1) e.preventDefault();
                  else setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {/* Page Numbers with Ellipsis - Hidden on Extra Small Screens */}
            <div className="hidden gap-2 sm:flex">
              {generatePaginationNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {typeof page === "number" ? (
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  ) : (
                    <PaginationEllipsis />
                  )}
                </PaginationItem>
              ))}
            </div>

            {/* Mobile View - Show Only Current Page */}
            <div className="px-3 text-sm font-medium sm:hidden">
              Page {currentPage} of {totalPages}
            </div>

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  if (currentPage === totalPages) e.preventDefault();
                  else setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Container>
  );
};

export default Discover;
