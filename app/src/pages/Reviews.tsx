import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/context/authContext";
import { useReviewContext } from "@/context/reviewContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  rating: z.string().min(1, { message: "Please give us a rating" }),
  description: z.string().trim().min(1,{
    message: "Please give a short review"
  }),
});

export type reviewInput = z.TypeOf<typeof formSchema>;

const Reviews = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: "",
      description: "",
    },
  });

  const { createReviews, loading } = useReviewContext();
  const { logout, user } = useAuthContext()

  function onSubmit(formData: z.infer<typeof formSchema>) {
    createReviews(formData);
    form.reset()
  }

  return (
    <main className="h-screen">
      <div className="bg-secondary p-4 lg:p-12 flex items-center justify-between">
        <h1 className="text-2xl lg:text-4xl text-white">Hello {user?.firstname}, Write a review</h1>
        <Button className="border-secondary text-secondary text-md" variant={"outline"}
        onClick={logout}
        >
          Logout
        </Button>
      </div>
      <div className="container max-w-3xl mt-10">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Give us a rating</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a rating" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Bad</SelectItem>
                          <SelectItem value="2">Ok</SelectItem>
                          <SelectItem value="3">Good</SelectItem>
                          <SelectItem value="4">Very Good</SelectItem>
                          <SelectItem value="5">Perfect</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review</FormLabel>
                      <FormControl>
                        <Textarea rows={10} placeholder="Leave a review" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                disabled={loading}
                className="rounded w-full capitalize bg-secondary"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Reviews;
