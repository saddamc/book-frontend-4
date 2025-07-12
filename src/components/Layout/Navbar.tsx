import { BookOpen, FileText, Menu, Plus, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import logo from "../../assets/logo.svg";
import { ModeToggle } from "../mode-toggler";
import { Button } from "../ui/button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const loaction = useLocation();

  const isActive = (path: string) => {
    return loaction.pathname === path;
  };

  return (
    <nav className=" backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className=" max-w-7xl mx-auto h-16 flex items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center ">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <h1 className="text-sm md:text-base bg-sky-500  px-2  py-0.5 rounded-sm">
            <span className="font-extrabold text-black ">Library</span>
            <span className="text-red-500 font-bold ">Hub</span>
          </h1>
        </Link>
        {/* nav icon */}
        <div className=" md:flex gap-6 items-center hidden font-semibold text-gray-600">
          <Link
            to="/books"
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              isActive("/books")
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>All Books</span>
          </Link>
          <Link
            to="/create-book"
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              isActive("/create-book")
                ? "bg-emerald-100 text-emerald-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Add Book</span>
          </Link>

          <Link
            to="/borrow-summary"
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              isActive("/borrow-summary")
                ? "bg-amber-100 text-amber-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Borrow Summary</span>
          </Link>
        </div>
        {/* mode */}
        <div className="flex items-center gap-4 ">
          <ModeToggle />
          <Button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* mobile menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full backdrop-blur-md bg-white/70 shadow-md border-gray-200 flex flex-col items-center py-4 z-50 md:hidden text-sky-400">
            <Link
              to="/books"
              onClick={() => setMenuOpen(false)}
              className="py-2"
            >
              All Books
            </Link>
            <Link
              to="/create-book"
              onClick={() => setMenuOpen(false)}
              className="py-2"
            >
              Add Book
            </Link>
            <Link
              to="/borrow-summary"
              onClick={() => setMenuOpen(false)}
              className="py-2"
            >
              Borrow Summary
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
