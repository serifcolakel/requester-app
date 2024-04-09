"use client";

import { useForm } from "react-hook-form";
import { CircleUser, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { paths } from "@/constants/paths";
import { ILoginSchema, loginSchema } from "@/schemas/auth";
import { login } from "@/services/auth/actions";

export default function LoginPage() {
  const { toast } = useToast();

  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  const router = useRouter();

  async function onSubmit(values: ILoginSchema) {
    const response = await login({
      email: values.email,
      password: values.password,
    });

    if (response.success) {
      toast({
        title: "Login successful",
        description: "You have successfully logged in to your account.",
      });

      router.push(paths.dashboard.index);
    } else {
      toast({
        title: "Login failed",
        description: response.message,
        variant: "destructive",
      });
    }
  }

  return (
    <main className="flex flex-col justify-between min-h-screen bg-slate-100 lg:py-4 md:px-8">
      <Header />
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="md:w-[450px] leading-8 font-normal w-10/12 p-6 lg:px-10 border-none mx-auto">
            <CardHeader className="text-center gap-4">
              <section className="border w-[88px] h-[88px] mx-auto grid items-center rounded-full p-4 bg-gradient-to-b from-gray-100 to-accent">
                <CircleUser className="w-full h-full bg-white rounded-full border p-2" />
              </section>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email and password to login to your account.
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-4 p-0 py-5 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                      />
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
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="p-0 flex-col">
              <div className="flex justify-between items-center gap-4 flex-1 w-full mb-4">
                <div className="flex items-center space-x-2 w-full">
                  <Checkbox className="border-gray-500" id="remember-me" />
                  <Label
                    className="text-gray-500 cursor-pointer"
                    htmlFor="remember-me"
                  >
                    Remember me
                  </Label>
                </div>
                <Link href={paths.resetPassword}>
                  <Button className="underline" type="button" variant="link">
                    Forgot password?
                  </Button>
                </Link>
              </div>
              <div className="flex justify-between items-center gap-4 flex-1 w-full flex-col">
                <Button
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                  type="submit"
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign in
                </Button>
                <div className="flex items-center gap-1">
                  <span className="text-sm">Dont have an account?</span>
                  <Link href={paths.register}>
                    <Button
                      className="underline px-1"
                      type="button"
                      variant="link"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <Footer />
    </main>
  );
}
