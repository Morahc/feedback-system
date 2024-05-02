import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be a minimum of 12 characters",
  }),
});

export type loginInput = z.TypeOf<typeof formSchema>;

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    console.log(formData);
  }

  return (
    <main className="h-screen flex">
      <div className="container flex-col justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="flex flex-col gap-6 justify-center items-center">
          <div className="border shadow rounded p-6 flex w-full flex-col space-y-8 lg:w-[500px]">
            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl font-semibold">Welcome back</h1>
              <p className="text-sm text-muted-foreground">
                Enter the information you entered while registering
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input className="placeholder:text-gray-300" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="rounded w-full capitalize bg-black" type="submit">
                  Continue
                </Button>
              </form>
            </Form>
            <div className="text-sm text-muted-foreground flex gap-1">
              <p>Don't have an account?</p>
              <Link to="/register" className="hover:underline whitespace-nowrap">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
