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
import { CalendarIcon } from "lucide-react";
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
    <div className=" max-w-xl mx-auto px-12 py-12 my-12 shadow-md rounded-xl  bg-center ">
      <h1 className=" py-1.5 ml-2 text-2xl font-bold mb-8 text-center mx-auto w-[50%] text-black rounded-sm bg-amber-300 ">
        Borrow Book
      </h1>
      {/* error handle */}
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
          {/* Borrowed Name */}
          <FormField
            control={form.control}
            name="borrowerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Borrow Name</FormLabel>
                <FormControl>
                  <Input className="" {...field} value={field.value || ""} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Quantity */}
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
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* dueDate */}
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
                      selected={field.value}
                      onSelect={field.onChange}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit" className="mt-6">
              Submit Book
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default BorrowBook;
