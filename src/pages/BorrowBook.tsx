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
import {
  useBorrowBookMutation,
  useGetBookByIdQuery,
} from "@/redux/api/baseApi";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, Plus } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Atom, ThreeDot } from "react-loading-indicators";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BorrowBook = () => {
  const form = useForm();
  const navigate = useNavigate();

  const { bookId } = useParams();

  const [borrowBook, { data, isLoading, isError }] = useBorrowBookMutation();
  const { data: borrowData, isLoading: borrowloading } = useGetBookByIdQuery(
    bookId!
  );
  const borrow = borrowData?.data;
  console.log("Borrow", borrow);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log("Submiting data:", data); // for check data from Form submit

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
      // console.log("api:", error);
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
  if (isLoading || borrowloading) {
    return (
      <h1 className="mx-auto text-center items-center justify-center my-40">
        <Atom color="#32cd32" size="large" text="" textColor="" />;
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-48">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {/* error handle */}
        <div>
          {isError && (
            <p className=" mx-auto flex justify-center items-center text-red-600">
              <h1 className="mr-2">FAILED! try again </h1>
              <ThreeDot
                color="#e50a2e"
                size="small"
                // text="Failed! try again"
                textColor="#ed1111"
              />
            </p>
          )}

          {data && <Atom color="#32cd32" size="small" text="" textColor="" />}
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
          {/* book details */}
          <div className=" border-b border-gray-200 px-6 py-4 rounded-t-xl shadow-sm">
            <div className="rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {borrow.title}
                </h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                  Available: {borrow.copies}{" "}
                  {borrow.copies === 1 ? "copy" : "copies"}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium text-gray-800">Author:</span>{" "}
                {borrow.author}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-800">Genre:</span>{" "}
                {borrow.genre}
              </p>
            </div>
          </div>

          {/* Form  */}
          <div className="  text-gray-700 p-8 bg-gray-50  ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Borrowed Name */}
                <div>
                  <FormField
                    control={form.control}
                    name="borrowerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                            {...field}
                            value={field.value || ""}
                            placeholder="Your Name"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Quantity */}
                <div className="mt-2.5">
                  <FormField
                    control={form.control}
                    name="quantity"
                    rules={{
                      required: "Quantity is required",
                      min: { value: 1, message: "Minimum quantity is 1" },
                    }}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>
                          Quantity{" "}
                          <span className="text-red-500 font-bold">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min={1}
                            max={borrow?.copies}
                            placeholder="Number of Copies"
                            className={cn(
                              "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2",
                              fieldState.invalid
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:ring-blue-500"
                            )}
                          />
                        </FormControl>
                        {fieldState.error && (
                          <p className="text-red-500 text-xs mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
                {/* dueDate */}
                <div className="mt-2.5">
                  <FormField
                    control={form.control}
                    name="dueDate"
                    rules={{ required: "Due date is required" }}
                    render={({ field, fieldState }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Due Date{" "}
                          <span className="text-red-500 font-bold">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal w-full",
                                  !field.value && "text-muted-foreground",
                                  fieldState.invalid
                                    ? "border-red-500 focus:ring-red-500"
                                    : "focus:ring-blue-500"
                                )}
                              >
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Select a date"}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              captionLayout="dropdown"
                              className="rounded-md border shadow"
                            />
                          </PopoverContent>
                        </Popover>
                        {fieldState.error && (
                          <p className="text-red-500 text-xs mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    className={`w-full mt-4 bg-gradient-to-r from-[#fb8500] to-[#ffb703] text-[#023047] hover:bg-blue-700 ${
                      isLoading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
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
