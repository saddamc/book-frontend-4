import BookCard from "@/components/module/books/BookCard";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import BookTitle from "./BookTitle";
import HeroSection from "./HeroSection";

const Books = () => {
  const { data: responseData, isLoading } = useGetBooksQuery(undefined, {
    pollingInterval: 30000,
    refetchOnReconnect: true,
  });
  const books = responseData?.data;
  // console.log("Books:", books);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 mb-24">
      <div>
        {/* Hero Section */}
        <HeroSection />
        <BookTitle />
      </div>

      <div>
        {!isLoading && books && (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book: IBook) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
