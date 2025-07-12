import LoadingSpinner from "@/components/Modal/LoadingSpinner";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

interface BookTableProps {
  books: IBook[];
  onEdit: (book: IBook) => void;

  onView: (book: IBook) => void;
}

export const BookTable = ({
  books,
  onEdit,

  onView,
}: BookTableProps) => {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  // handle Delete
  const handleConfirmDelete = async () => {
    if (!selectedBookId) return;

    try {
      const response = await deleteBook(selectedBookId).unwrap();
      toast.success(response.message || "Book delete successful", {
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
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Genre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ISBN
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Copies
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {books.map((book) => (
            <tr key={book._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {book.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{book.author}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{book.genre}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{book.isbn}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{book.copies}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    book.available
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {book.available ? "Available" : "Unavailable"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onView(book)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded"
                    title="View Details"
                  >
                    <BookOpen className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onEdit(book)}
                    className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                    title="Edit Book"
                  >
                    <Edit className="h-4 w-4" />
                  </button>

                  {/* delete book */}
                  <div>
                    <button
                      onClick={() => {
                        setSelectedBookId(book._id);
                        setShowConfirm(true);
                      }}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
