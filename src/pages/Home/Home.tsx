import LoadingSpinner from "@/components/Modal/LoadingSpinner";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import BookTitle from "./BookTitle";
import HeroSection from "./HeroSection";
import HomeCard from "./HomeCard";

const Home = () => {
  const { data: responseData, isLoading } = useGetBooksQuery(undefined, {
    pollingInterval: 30000,
    refetchOnReconnect: true,
  });
  const books = responseData?.data;
  // console.log("Books:", books);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          {/* Hero Section */}
          <HeroSection />
          <BookTitle />
        </div>

        <div>
          {!isLoading && books && (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.slice(0, 8).map((book: IBook) => (
                <HomeCard key={book._id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
