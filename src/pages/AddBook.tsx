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
import { ArrowLeft, Plus } from "lucide-react";
import { nanoid } from "nanoid";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
  const form = useForm();
  const navigate = useNavigate();

  const [createBook] = useCreateBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bookData = {
      ...data,
      available: true,
      isbn: nanoid(),
    };

    const response = await createBook(bookData).unwrap();
    // console.log("Book created:", res);
    toast.success(response.message || "Book Add successfully!", {
      position: "top-center",
    });
    navigate("/books");
    form.reset();
  };

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
              <Plus className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Add Book</h1>
                <p className="text-blue-100">
                  {" "}
                  Create a new book entry in your library
                </p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div>
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                          {...form.register("title")}
                          placeholder="Book Title"
                        />
                      </FormControl>
                    </FormItem>
                  </div>

                  {/* Author */}
                  <div>
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("author")}
                          placeholder="Author Name"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                        />
                      </FormControl>
                    </FormItem>
                  </div>

                  {/* Image URL */}
                  <div>
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("image")}
                          placeholder="Image URL"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                        />
                      </FormControl>
                    </FormItem>
                  </div>

                  {/* Copies */}
                  <div>
                    <FormItem>
                      <FormLabel>Copies</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("copies")}
                          type="number"
                          placeholder="Number of Copies"
                          min={1}
                          defaultValue={1}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                        />
                      </FormControl>
                    </FormItem>
                  </div>

                  {/* Genre Dropdown */}
                  <div>
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
                            required
                          >
                            <FormControl>
                              <SelectTrigger
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                              >
                                <SelectValue placeholder="Select Genre" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="FICTION">Fiction</SelectItem>
                              <SelectItem value="SCIENCE">Science</SelectItem>
                              <SelectItem value="FANTASY">Fantasy</SelectItem>
                              <SelectItem value="TECHNOLOGY">
                                Technology
                              </SelectItem>
                              <SelectItem value="BIOGRAPHY">
                                Biography
                              </SelectItem>
                              <SelectItem value="SCI-FI">Sci-Fi</SelectItem>
                              <SelectItem value="NON_FICTION">
                                Non-Fiction
                              </SelectItem>
                              <SelectItem value="HISTORY">History</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
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
                    className="w-full from-[#20a4f3] to-[#2398db] text-white hover:bg-blue-700"
                  >
                    Add Book
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

export default AddBook;
