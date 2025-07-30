import LoadingSpinner from "@/components/Modal/LoadingSpinner";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types"; // Ensure IBook is correctly defined
import { Grid, List, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { BookCard } from "./BookCard";
import { BookTable } from "./BookTable";

const Books = () => {
  const navigate = useNavigate();
  const {
    data: responseData,
    isLoading,
    error,
  } = useGetBooksQuery(undefined, {
    pollingInterval: 30000,
    refetchOnReconnect: true,
  }) as {
    data?: { data: IBook[] };
    isLoading: boolean;
    error: any;
  };
  const books: IBook[] | undefined = responseData?.data;
  // console.log("All Books", books);

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks: IBook[] | undefined = books?.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (book: IBook) => {
    navigate(`/books/${book._id}`);
  };

  const handleEdit = (book: IBook) => {
    navigate(`/edit-book/${book._id}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!filteredBooks) {
    return (
      <div className="text-center py-12 items-center my-24 text-red-500">
        <p>No books found</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading books</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search Option  */}
      <div className="bg-gradient-to-br from-[#0d41e1] to-[#1b4ce0]  shadow-3xl ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 pt-8  ">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl  font-bold text-white">Book Library</h1>
                <p className="text-gray-200 mt-1">
                  Manage your book collection
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books by title, author, or genre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white text-gray-600 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "table"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BookCard filter  */}
      <div className="min-h-screen bg-gradient-to-br from-[#e5e5e5] to-[#f1dddd] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 ">
          {filteredBooks?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No books found</p>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredBooks.map((book) => (
                    <BookCard
                      key={book._id}
                      book={book}
                      onView={handleView}
                      onEdit={handleEdit}
                    />
                  ))}
                </div>
              ) : (
                <BookTable
                  books={filteredBooks}
                  onView={handleView}
                  onEdit={handleEdit}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
