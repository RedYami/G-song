"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/app/firebase-config";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(1, {
    message: "Email type is not correct.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 character.",
  }),
});

export default function RegisterHere() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    await registerUser(data.username, data.email, data.password)
      .then(() => router.push("/songs"))
      .catch((error) => console.log(error));
  };
  const registerUser = async (
    userName: string,
    email: string,
    password: string
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((res) =>
        updateProfile(res.user, {
          displayName: userName,
          photoURL: "https://github.com/shadcn.png",
        }).catch((error) => alert(error.message))
      );
    } catch (error) {
      console.log(error);
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
        </form>
      </main>
    </Form>
  );
}
