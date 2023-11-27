"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import SomethingLoading from "../loadingSomething";
const formSchema = z.object({
  email: z.string().min(1, {
    message: "Email type is not correct.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 character.",
  }),
});

export default function Login() {
  const router = useRouter();
  const [isLogging, setIsLogging] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const toastError = () => {
    setIsLogging(false);
    toast.error("email or password is incorrect!!");
  };
  const toastSuccess = () => toast.success("Login success");

  const onSubmit = async (data: any) => {
    await lognIn(data.email, data.password);
  };
  const lognIn = async (email: string, password: string) => {
    setIsLogging(true);
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toastSuccess();
          // document.cookie = `loginWithFireBase=true;`;
          Cookies.set("firebase-auth", "true");
          router.push("/songs");
        })
        .catch(() => toastError());
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Form {...form}>
      <main className=" flex justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 xsm:w-[80vw] sm:w-[50vw] flex justify-center flex-col"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Your email</FormDescription>
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
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormDescription>your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          <Link href="authenticate/register">
            {`Haven't account? Register Here`}
          </Link>
        </form>
        {isLogging && (
          <SomethingLoading>
            <h3 className="text-2xl">Logging</h3>
          </SomethingLoading>
        )}
      </main>
    </Form>
  );
}
