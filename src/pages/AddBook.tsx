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
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
  const form = useForm();
  const navigate = useNavigate();

  const [createBook, { data, isLoading, isError }] = useCreateBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bookData = {
      ...data,
      available: true,
    };

    const response = await createBook(bookData).unwrap();
    // console.log("Book created:", res);
    toast.success(response.message || "Book borrowed successfully!", {
      position: "top-center",
    });
    navigate("/books");
    form.reset();
  };

  return (
    <div className=" max-w-xl mx-auto px-12 py-6 my-4 shadow-md rounded-xl  bg-center ">
      <h1 className=" py-1.5 ml-2 text-2xl font-bold mb-8 text-center mx-auto w-[50%] text-black rounded-sm bg-amber-300 ">
        + Add Book
      </h1>
      {/* Error handle */}
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
          {/* ISBN */}
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
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
                    {...field}
                    value={field.value || ""}
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
              Submit Book
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default AddBook;
