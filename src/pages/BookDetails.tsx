import { useGetBookByIdQuery } from "@/redux/api/baseApi";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Edit,
  Hash,
  Tag,
  User,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams();
  const {
    data: responseData,
    isLoading,
    error,
  } = useGetBookByIdQuery(id as string);
  const navigate = useNavigate();

  const book = responseData?.data;
  // console.log("Books:", book);

  if (isLoading) return <p>Loading...</p>;
  if (error || !book) return <p>Book not found!</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg p-2  text-center">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-40 object-cover rounded-t-xl mb-4"
                  />
                  <div
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      book.available
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.available ? "Available" : "Unavailable"}
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3">
                <div className="space-y-6 text-gray-600">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {book.title}
                    </h1>
                    <div className="flex items-center space-x-2 text-lg text-gray-600">
                      <User className="h-5 w-5" />
                      <span>by {book.author}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Tag className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Genre</p>
                        <p className="font-medium">{book.genre}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Hash className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">ISBN</p>
                        <p className="font-medium">{book.isbn}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Available Copies
                        </p>
                        <p className="font-medium ">{book.copies}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Added</p>
                        <p className="font-medium">
                          {new Date(book.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Link to={`/edit-book/${book._id}`}>
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Edit className="h-5 w-5" />
                        <span>Edit Book</span>
                      </button>
                    </Link>

                    {book.available && (
                      <Link to={`/borrow/${book._id}`}>
                        <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                          <BookOpen className="h-5 w-5" />
                          <span>Borrow Book</span>
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
    </div>
  );
};

export default BookDetails;
