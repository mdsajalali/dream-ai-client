"use client";
import React, { useEffect, useState } from "react"; 
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";

type Image = {
  _id: string;
  userId: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

const DashboardImages = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/discover-image?page=${currentPage}&limit=9`,
        );
        setImages(response?.data?.images);
        setTotalPages(response?.data?.totalPages);
      } catch (error) {
        console.error("Error fetching images", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [currentPage]);

  const handleDelete = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/image/${id}`);
      setImages(images.filter((image) => image._id !== id));
      if (res?.status === 200) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };

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
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Prompt</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array(9)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={4}>
                        <div className="h-64 w-full animate-pulse rounded-md bg-gray-200" />
                      </TableCell>
                    </TableRow>
                  ))
              : images.map((image) => (
                  <TableRow key={image._id}>
                    <TableCell>
                      <img
                        src={image.imageUrl}
                        alt={image.prompt}
                        className="h-16 w-16 object-cover"
                      />
                    </TableCell>
                    <TableCell>{image.prompt}</TableCell>
                    <TableCell>
                      {new Date(image.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        onClick={() => handleDelete(image._id)}
                        className="flex items-center"
                      >
                        <Trash2 className="mr-2" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center">
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

            {/* Page Numbers with Ellipsis */}
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
    </div>
  );
};

export default DashboardImages;
