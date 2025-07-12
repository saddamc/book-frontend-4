import App from "@/App";
import AddBook from "@/pages/AddBook";
import Books from "@/pages/AllBooks/Books";
import BookDetails from "@/pages/BookDetails";
import BorrowBook from "@/pages/BorrowBook";
import { BorrowSummary } from "@/pages/BorrowSummary";
import EditBook from "@/pages/EditBook";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "books",
        Component: Books,
      },
      {
        path: "books/:id",
        Component: BookDetails,
      },
      {
        path: "create-book",
        Component: AddBook,
      },
      {
        path: "edit-book/:id",
        Component: EditBook,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
      {
        path: "borrow/:bookId",
        Component: BorrowBook,
      },
    ],
  },
]);

export default router;
