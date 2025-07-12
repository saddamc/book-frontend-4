import type { IBook } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["book", "borrow"],
  endpoints: (builder) => ({
    getBooks: builder.query<{ data: IBook[] }, void>({
      query: () => "/books",
      providesTags: ["book"],
    }),
    // get single book by id
    getBookById: builder.query({
      query: (id: string) => `/books/${id}`,
    }),
    // post request to create a new book
    createBook: builder.mutation({
      query: (body) => ({
        url: "/create-book",
        method: "POST",
        body,
      }),
      invalidatesTags: ["book"],
    }),
    // delete book
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    // delete book
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/edit-book/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    // get borrow
    getBorrows: builder.query({
      query: () => "/borrow-summary",
      providesTags: ["borrow"],
    }),
    // borrow book
    borrowBook: builder.mutation({
      query: ({ bookId, ...body }) => ({
        url: `/borrow/${bookId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["book", "borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useGetBookByIdQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGetBorrowsQuery,
  useBorrowBookMutation,
} = baseApi;
