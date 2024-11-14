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
import axios from "axios";

import { signIn } from "next-auth/react"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).max(20, {
        message: "Username must be at most 20 characters.",
    }),
    password: z.string().min(6),
  })

export default function SigninForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await signIn("credentials", { username: values.username, password: values.password, redirect: true, callbackUrl: "http://localhost:3000" })
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
                        <Input placeholder="Enter a password..." {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <Button variant={"outline"} className="border-black hover:text-white hover:bg-black" type="submit">Sign In</Button>
        </form>
    </Form>
}