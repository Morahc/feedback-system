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
  firstname: z.string().min(1, {
    message: "Firstname must be at least 1 characters.",
  }),
  lastname: z.string().min(1, {
    message: "Lastname must be at least 1 characters.",
  }),
  email: z.string().email({ message: "Email address is not valid" }),
  password: z.string().min(8, {
    message: "Password must be a minimum of 8 characters",
  }),
});

export type registerInput = z.TypeOf<typeof formSchema>;

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
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
          <div className="border shadow rounded p-2 md:p-4 flex w-full flex-col space-y-8  lg:w-[500px]">
            <h1 className="text-3xl font-semibold tracking-tight text-center">Create an account</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input placeholder="doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="johndoe@email.com" {...field} />
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
                        <Input
                          placeholder="Should be a minimum of 8 characters."
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full rounded capitalize bg-black" type="submit">
                  Continue
                </Button>
              </form>
            </Form>
            <div className="text-sm text-muted-foreground flex gap-1">
              <p>Already have an account?</p>
              <Link to="/login" className="hover:underline whitespace-nowrap">
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1">334</div>
      </div>
    </main>
  );
};

export default Register;
