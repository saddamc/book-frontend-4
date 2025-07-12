import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { Plus } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddBookModal() {
  const [open, setOpen] = useState(false);
  const form = useForm();

  const [createBook, { data, isLoading, isError }] = useCreateBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bookData = {
      ...data,
      available: true,
      isbn: nanoid(),
    };

    try {
      const response = await createBook(bookData).unwrap();
      toast.success(response.message || "Book Add successfully!", {
        position: "top-center",
      });
      setOpen(false);
      form.reset();
    } catch (error: unknown) {
      let message = "Something went wrong";

      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof error.data === "object"
      ) {
        const errData = (
          error as {
            data: { message?: string; error?: string; detail?: string };
          }
        ).data;

        message =
          errData.message ||
          errData.error ||
          errData.detail ||
          "Something went wrong";
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message, { position: "top-center" });
    }

    form.reset();
  };

  return (
    <div>
      {isLoading && (
        <p className="text-blue-600 text-center mb-4">Creating book...</p>
      )}
      {isError && (
        <p className="text-red-600 text-center mb-4">
          Failed to create book. Please try again.
        </p>
      )}
      {data && (
        <p className="text-green-600 text-center mb-4">{data.message}</p>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-sky-600 hover:bg-orange-600 text-white rounded-lg ">
            <h1 className="px-4 py-2 text-xl font-bold">+ Add New Book</h1>
          </Button>
          {/* error handle */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogDescription className="sr-only">
            Fill up this form to add book
          </DialogDescription>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-2xl font-semibold rounded-t-lg shadow-md py-3 px-4">
              <Plus className="h-5 w-5" />
              <span>Add Book</span>
            </DialogTitle>
          </DialogHeader>

          {/* From */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Author */}
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Genre */}
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-[100%]">
                        <SelectTrigger>
                          <SelectValue placeholder="Select your Genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FICTION">FICTION</SelectItem>
                        <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                        <SelectItem value="FANTASY">FANTASY</SelectItem>
                        <SelectItem value="TECHNOLOGY">TECHNOLOGY</SelectItem>
                        <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                        <SelectItem value="SCI-FI">SCI-FI</SelectItem>
                        <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                        <SelectItem value="HISTORY">HISTORY</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {/* Copies */}
              <FormField
                control={form.control}
                name="copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        defaultValue={1}
                        {...field}
                        value={field.value || "1"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="https://example.com/cover.jpg"
                        className="input input-bordered w-full border p-1.5 rounded-md"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} value={field.value || ""} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" className="mt-2">
                  Add Book
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
