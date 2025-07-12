import { useDeleteBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { BookOpen, Edit, Trash2, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface BookCardProps {
  book: IBook;
  onEdit: (book: IBook) => void;
  onView: (book: IBook) => void;
}

export const BookCard = ({ book, onEdit, onView }: BookCardProps) => {
  const [deleteBook] = useDeleteBookMutation();
  const [showConfirm, setShowConfirm] = useState(false);

  // handle Delete
  const handleConfirmDelete = async () => {
    try {
      const response = await deleteBook(book._id).unwrap();
      toast.success(response.message || "Book delete successfully!", {
        position: "top-center",
      });
    } catch (error: unknown) {
      let message = "Something went wrong";

      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof error.data === "object"
      ) {
        const errData = (
          error as {
            data: { message?: string; error?: string; detail?: string };
          }
        ).data;

        message =
          errData.message ||
          errData.error ||
          errData.detail ||
          "Something went wrong";
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message, { position: "top-center" });
    }
    setShowConfirm(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ">
      <div className="p-2">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-40 object-cover rounded-t-xl"
        />
      </div>
      <div className="  items-start mb-4">
        <div className="flex-1 px-4 py-2">
          <h3 className=" font-semibold text-gray-900 mb-0.5 line-clamp-2">
            {book.title}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <User className="h-4 w-4" />
            <span>{book.author}</span>
          </div>
        </div>
        <div className="flex justify-between px-4 mb-1.5">
          <div className="flex items-center text-xs bg-gray-300 rounded-full px-2 py-1 text-gray-700">
            {book.genre}
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              book.available
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {book.available ? "Available" : "Unavailable"}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <span className=" px-4">{book.copies} copies</span>
          </p>
        </div>
      </div>
      {/* 3rd part */}
      <div className="border-t pt-4 px-4">
        <div className="flex justify-between items-center">
          {/* button - 1 View details */}
          <button
            onClick={() => onView(book)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <BookOpen className="h-4 w-4" />
            <span>View Details</span>
          </button>

          <div className="flex items-center space-x-2">
            {/* button -2 Edit */}
            <button
              onClick={() => onEdit(book)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>

            {/* delete book */}
            <div>
              <button
                onClick={() => setShowConfirm(true)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              {/* Confirmation Dialog */}
              {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-opacity-50 z-50">
                  <div className="bg-[#011627] text-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">
                      Are you sure you want to delete this book?
                    </h3>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="px-4 py-2 text-black bg-gray-200 rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/*button - 4 borrow */}
            {book.available && (
              <Link to={`/borrow/${book._id}`}>
                <button className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors">
                  Borrow
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      ;
    </div>
  );
};
