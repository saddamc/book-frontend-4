import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.svg";
import { ModeToggle } from "../mode-toggler";
import { Button } from "../ui/button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between px-5 md:px-8 ">
      {/* Logo */}
      <Link to="/" className="flex items-center ">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <h1 className="text-sm md:text-base bg-sky-500  px-2  py-0.5 rounded-sm">
          <span className="font-extrabold text-black ">Library</span>
          <span className="text-red-500 font-bold ">Hub</span>
        </h1>
      </Link>
      {/* nav icon */}
      <div className=" md:flex gap-6 items-center hidden font-semibold">
        <Link
          to="/create-book"
          className="hover:text-red-500 bg-sky-500 py-1.5 px-3 rounded-xl text-white flex items-center gap-1"
        >
          <span className="">+</span> Add Book
        </Link>
        <Link to="/books" className="hover:text-sky-600 ">
          All Books
        </Link>

        <Link to="/borrow-summary" className="hover:text-sky-600">
          Borrow Summary
        </Link>
      </div>
      {/* mode */}
      <div className="flex items-center gap-4 ">
        <ModeToggle />
        <Button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>
      {/* mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-center py-4 z-50 md:hidden text-sky-400">
          <Link to="/books" onClick={() => setMenuOpen(false)} className="py-2">
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
    </nav>
  );
}
