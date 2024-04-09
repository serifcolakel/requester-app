/* eslint-disable @typescript-eslint/no-unsafe-member-access */

"use client";

import { useLayoutEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Loader2, UserPlus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import { IRegisterSchema, registerSchema } from "@/schemas/auth";

export default function Register() {
  const { toast } = useToast();

  const { isLoaded, signUp } = useSignUp();

  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const emailVerification = searchParams.get("emailVerification");

  const { watch, ...form } = useForm<IRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
    mode: "all",
  });

  const email = watch("email");

  const pendingVerification = useMemo(
    () => emailVerification === "true" && email && form.formState.isSubmitted,
    [emailVerification, email, form.formState.isSubmitted]
  );

  async function onSubmit(values: IRegisterSchema) {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast({
        variant: "default",
        description: "Please check your email for a verification code.",
      });
      router.push(`${pathname}?emailVerification=true`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const message = (err?.errors[0].message as string) ?? "Unknown error";

      toast({
        variant: "destructive",
        description: message,
      });
    }
  }

  //   const onPressVerify = async (code: string) => {
  //     if (!isLoaded) {
  //       return;
  //     }

  //     try {
  //       const completeSignUp = await signUp.attemptEmailAddressVerification({
  //         code,
  //       });

  //       const values = form.getValues();

  //       if (
  //         completeSignUp.status === "complete" &&
  //         completeSignUp.createdUserId &&
  //         completeSignUp.emailAddress &&
  //         completeSignUp.createdSessionId
  //       ) {
  //         await createUser({
  //           email: completeSignUp.emailAddress,
  //           id: completeSignUp.createdUserId,
  //           name: values.fullName ?? "",
  //         });
  //         await setActive({ session: completeSignUp.createdSessionId });
  //         router.push("/");
  //       }
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     } catch (err: any) {
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  //       const message =
  //         err?.errors[0].longMessage ||
  //         (err?.errors[0].message as string) ||
  //         "Unknown error";

  //       toast({
  //         variant: "destructive",
  //         description: message as string,
  //       });
  //     }
  //   };

  useLayoutEffect(() => {
    if (!pendingVerification) {
      router.replace(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingVerification]);

  return (
    <main className="flex flex-col justify-between min-h-screen bg-slate-100 lg:py-4 md:px-8">
      <Header />
      {!pendingVerification && (
        <Form {...form} watch={watch}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="md:w-[450px] leading-8 font-normal w-10/12 p-6 lg:px-10 border-none mx-auto">
              <CardHeader className="text-center gap-4">
                <section className="border w-[88px] h-[88px] mx-auto grid items-center rounded-full p-4 bg-gradient-to-b from-gray-100 to-accent">
                  <UserPlus className="w-full h-full bg-white rounded-full border p-2" />
                </section>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Enter your email and password to create a new account.
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="flex flex-col gap-4 p-0 py-5 w-full">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-1">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
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
                        <Input
                          placeholder="Please enter your email address"
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
                          placeholder="• • • • • • • •"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="• • • • • • • •"
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
                <div className="flex justify-between items-center gap-4 flex-1 w-full flex-col pb-3">
                  <div className="flex items-center gap-1 flex-col">
                    <Label className="text-gray-500" variant="paragraph-xs">
                      By clicking Register, you agree to our Terms and that you
                      have read our Data Policy, including our Cookie Use.
                    </Label>
                  </div>
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
                    Register
                  </Button>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">Already have an account?</span>
                    <Link
                      className={cn(buttonVariants({ variant: "link" }))}
                      href={paths.login}
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      )}

      {/* {pendingVerification && (
        <VerifyEmail email={email} onVerify={onPressVerify} />
      )} */}
      <Footer />
    </main>
  );
}
