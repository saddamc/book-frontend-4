import type { IBook } from "@/types";
import { User } from "lucide-react";
import { Link } from "react-router";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  book: IBook;
}

export default function HomeCard({ book }: IProps) {
  return (
    <Link to={`/books/${book._id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover rounded-t-xl mb-4"
        />
        <div className="  items-start mb-4">
          <div className="flex-1 px-4 py-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-0.5 line-clamp-2">
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
      </div>
    </Link>
  );
}
