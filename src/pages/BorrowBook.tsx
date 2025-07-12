import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, Plus } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BorrowBook = () => {
  const form = useForm();
  const navigate = useNavigate();

  const { bookId } = useParams();

  const [borrowBook, { data, isLoading, isError }] = useBorrowBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log("Submiting data:", data);  // for check data from Form submit

    const borrowData = {
      borrowerName: data.borrowerName,
      dueDate: data.dueDate,
      quantity: data.quantity,
    };

    try {
      const response = await borrowBook({ bookId, ...borrowData }).unwrap();
      toast.success(response.message || "Book borrowed successfully!", {
        position: "top-center",
      });
      navigate("/books");
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-48">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {/* error handle */}
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
        </div>
        ;
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
          <div className="bg-gradient-to-r from-[#fb8500] to-[#ffb703] px-8 py-6">
            <div className="flex items-center space-x-3 text-[#023047]">
              <Plus className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Borrow Book</h1>
                <p className="text-[#023047]">
                  {" "}
                  Borrow book entry in your library
                </p>
              </div>
            </div>
          </div>

          {/* Form  */}
          <div className="  text-gray-700 p-8 ">
            {/* Author */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Borrowed Name */}
                <div>
                  <FormField
                    control={form.control}
                    name="borrowerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Borrow Name</FormLabel>
                        <FormControl>
                          <Input
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Quantity */}
                <div>
                  <FormField
                    control={form.control}
                    name="quantity"
                    rules={{ required: true, min: 1 }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Borrow Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            defaultValue={1}
                            value={field.value || ""}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {/* dueDate */}
                <div>
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Select a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                              selected={field.value}
                              onSelect={field.onChange}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    className="w-full mt-4 bg-gradient-to-r from-[#fb8500] to-[#ffb703] text-[#023047] hover:bg-blue-700"
                  >
                    Borrow Book
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

export default BorrowBook;
