import { Link, useNavigate } from "react-router-dom";
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
import { useAuthContext } from "@/context/authContext";

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

  const navigate = useNavigate();
  const { login, loading } = useAuthContext();

  function onSubmit(formData: z.infer<typeof formSchema>) {
    login(formData, navigate);
  }

  return (
    <section className="h-screen flex">
      <div className="bg-[url(./large-triangles.svg)] container lg:grid lg:grid-cols-2 place-content-center lg:place-content-stretch lg:max-w-none lg:px-0">
        <div className="grid place-items-center bg-white">
          <div className="border shadow-lg p-4 lg:px-6 lg:py-8 flex w-full flex-col space-y-8 lg:w-[500px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-4xl font-semibold text-primary">Welcome back</h1>
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
                <Button disabled={loading} className="rounded w-full capitalize" type="submit">
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
    </section>
  );
};

export default Login;
