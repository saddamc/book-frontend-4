import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/api/baseApi";
import type { IBook } from "@/types";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateBook] = useUpdateBookMutation();
  const { data: responseData, isLoading } = useGetBookByIdQuery(id as string);

  const book = responseData?.data;

  const form = useForm<IBook>();

  useEffect(() => {
    if (book) {
      form.reset(book);
    }
  }, [book, form]);

  const onSubmit = async (updatedData: IBook) => {
    try {
      await updateBook({ id, data: updatedData }).unwrap();
      toast.success("Book updated successfully!");
      navigate("/books");
    } catch {
      toast.error(" Failed to update book");
    }
  };

  if (isLoading) return <p>Loading book...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div className="max-w-3xl mx-auto px-12 py-8 ">
      <h1 className="bg-sky-500 px-12 py-3 ml-2 rounded-2xl text-2xl font-bold mb-8 text-center">
        Edit Book
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input {...form.register("title")} placeholder="Title" />
          <Input {...form.register("author")} placeholder="Author" />
          <Input {...form.register("isbn")} placeholder="ISBN" />
          <Input {...form.register("image")} placeholder="Image URL" />
          <Input
            {...form.register("copies")}
            type="number"
            placeholder="Copies"
          />
          {/* genre */}
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FICTION">Fiction</SelectItem>
                    <SelectItem value="SCIENCE">Science</SelectItem>
                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                    <SelectItem value="TECHNOLOGY">Technology</SelectItem>
                    <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                    <SelectItem value="SCI-FI">Sci-Fi</SelectItem>
                    <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Textarea
            {...form.register("description")}
            placeholder="Description"
          />

          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Update Book
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default EditBook;
