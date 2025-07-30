import LoadingSpinner from "@/components/Modal/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/api/baseApi";
import { updateBookSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Edit } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type z from "zod";

type BookFormData = z.infer<typeof updateBookSchema>;

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateBook] = useUpdateBookMutation();
  const { data: responseData, isLoading } = useGetBookByIdQuery(id as string);

  const book = responseData?.data;

  // Zod
  const form = useForm<BookFormData>({
    resolver: zodResolver(updateBookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      copies: 1,
      image: "",
      description: "",
    },
  });

  useEffect(() => {
    if (book) {
      form.reset(book);
    }
  }, [book, form]);

  const onSubmit = async (updatedData: BookFormData) => {
    try {
      await updateBook({ id, data: updatedData }).unwrap();
      toast.success("Book updated successfully!");
      navigate("/books");
    } catch {
      toast.error(" Failed to update book");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!book) return <p>Book not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
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
          <div className="bg-gradient-to-r from-[#20a4f3] to-[#2398db] px-8 py-6">
            <div className="flex items-center space-x-3 text-white">
              <Edit className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Edit Book</h1>
                <p className="text-blue-100">Update book information</p>
              </div>
            </div>
          </div>

          {/* Form  */}
          <div className="  text-gray-700 p-8 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Title<span className="text-red-500 font-bold">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Book Title"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-required="true"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Author */}
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Author
                          <span className="text-red-500 font-bold">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Author Name"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-required="true"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Genre */}
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Genre<span className="text-red-500 font-bold">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Genre"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-required="true"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* ISBN */}
                  <FormField
                    control={form.control}
                    name="isbn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          ISBN<span className="text-red-500 font-bold">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Genre"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-required="true"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Copies */}
                  <FormField
                    control={form.control}
                    name="copies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Copies
                          <span className="text-red-500 font-bold">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Number of Copies"
                            min={1}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-required="true"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Image URL */}
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Image URL"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...form.register("description")}
                      placeholder="Short book description"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                    />
                  </FormControl>
                </FormItem>

                {/* Submit Button */}
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-gradient-to-r from-[#20a4f3] to-[#2398db] text-white hover:bg-blue-700 ${
                      isLoading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {isLoading ? "Updating..." : "Updated Book"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
