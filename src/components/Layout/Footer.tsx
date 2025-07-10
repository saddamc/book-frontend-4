import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";
import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center ">
                <img src={logo} alt="Logo" className="h-10 w-auto" />
                <h1 className="text-sm md:text-base bg-sky-500  px-2  py-0.5 rounded-sm">
                  <span className="font-extrabold text-black ">Library</span>
                  <span className="text-red-500 font-bold ">Hub</span>
                </h1>
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">
              Your digital library management system. Discover, borrow, and
              manage books with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Browse Books
                </Link>
              </li>
              <li>
                <Link
                  to="/create-book"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Add New Book
                </Link>
              </li>
              <li>
                <Link
                  to="/borrow-summary"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Borrow Summary
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-muted-foreground text-sm">
                  Fiction, Biography
                </span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  Science, Sci-Fi
                </span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  Fantasy, Non_Fiction
                </span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  Technology, History
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  info@library.com
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  123 Library St, Book City
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 LibraryHub Management System. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
