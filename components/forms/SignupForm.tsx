"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../ui/form"

import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).max(20, {
        message: "Username must be at most 20 characters.",
    }),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.", path: ["confirmPassword"]
  })

export default function SignupForm() {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
          confirmPassword: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await fetch("/api/auth/user", {
            method: "POST",
            body: JSON.stringify({
                username: values.username,
                password: values.password,
            }),
        });

        if(response.status === 201) {
            router.push("/signin?registered=true");
        } else {
            const data = await response.json();
            console.log('error')
        }
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter a username..." {...field} />
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
                        <Input type="password" placeholder="Enter a password..." {...field} />
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
                        <Input type="password" placeholder="Confirm a password..." {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <Button variant={"outline"} className="border-black hover:text-white hover:bg-black" type="submit">Sign Up</Button>
        </form>
    </Form>
}