import type { RootState } from "@/redux/store";
import type { IBook } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  books: IBook[];
  filter: "all" | "high" | "medium" | "low";
}

const initialState: InitialState = {
  books: [],
  filter: "all",
};

// reducer part => 1
type DraftBook = Pick<
  IBook,
  "title" | "author" | "genre" | "isbn" | "copies" | "description" | "image"
>;

// reducer part => 2
const createBook = (bookData: DraftBook): IBook => {
  return { _id: nanoid(), available: true, ...bookData };
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<DraftBook>) => {
      const bookData = createBook(action.payload);
      state.books.push(bookData);
    },
  },
});

export const selectBooks = (state: RootState) => {
  return state.book.books;
};

export const selectBooksFilter = (state: RootState) => {
  return state.book.filter;
};

export const { addBook } = bookSlice.actions;

export default bookSlice.reducer;
