import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useGetBorrowsQuery } from "@/redux/api/baseApi";
import type { BorrowSummaryItem } from "@/types";
import { ArrowLeft, BookOpen, FileText, Hash, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";

export const BorrowSummary = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetBorrowsQuery(undefined, {
    refetchOnReconnect: true,
  });
  const borrows = data?.data;
  // console.log("BorrowBooks:", borrows);

  const totalBorrowedBooks =
    borrows?.reduce(
      (sum: number, item: BorrowSummaryItem) => sum + item.totalQuantity,
      0
    ) || 0;

  // console.log("Borrow Summary:", totalBorrowedBooks);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading borrow summary</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate("/books")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Books</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-6">
            <div className="flex items-center space-x-3 text-white">
              <FileText className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Borrow Summary</h1>
                <p className="text-amber-100">Overview of all borrowed books</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {borrows.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  No books have been borrowed yet
                </p>
                <button
                  onClick={() => navigate("/books")}
                  className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Browse Books
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-8 w-8" />
                      <div>
                        <p className="text-blue-100 text-sm">Total Books</p>
                        <p className="text-2xl font-bold">{borrows.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-6 text-white">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-8 w-8" />
                      <div>
                        <p className="text-emerald-100 text-sm">
                          Total Borrowed Books
                        </p>
                        <p className="text-2xl font-bold">
                          {totalBorrowedBooks}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8" />
                      <div>
                        <p className="text-purple-100 text-sm">
                          Active Records
                        </p>
                        <p className="text-2xl font-bold">{borrows.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Borrowed Books Summary
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-700">
                            Book Title
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">
                            ISBN
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">
                            Total Quantity Borrowed
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {borrows.map(
                          (item: BorrowSummaryItem, index: number) => (
                            <tr
                              key={index}
                              className="hover:bg-white transition-colors"
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-3">
                                  <BookOpen className="h-5 w-5 text-gray-400" />
                                  <span className="font-medium text-gray-900">
                                    {item.book.title}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  <Hash className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-600">
                                    {item.book.isbn}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                  {item.totalQuantity} copies
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
