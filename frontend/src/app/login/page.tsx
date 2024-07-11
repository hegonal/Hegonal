"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function Signup() {
  const SignupFormSchema = z.object({
    email: z.string().email({
      message: "Invalid email address.",
    }),
    password: z.string(),
  });

  const SignupForm = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const route = useRouter();

  async function onSubmit(data: z.infer<typeof SignupFormSchema>) {
    setLoading(true);
    const origin = window.location.origin;

    try {
      const response = await fetch(`${origin}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Successful login",
          description: "Redirect...",
        });
        route.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Uh something went wrong!",
          description: "This error already log, please try again later :)",
        });
      }
      setLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh something went wrong!",
        description: "This error already log, please try again later :)",
      });
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center mb-4 space-y-2">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-gray-500">Monitor your all think just few click</p>
      </div>
      <Card className="w-[350px]">
        <Form {...SignupForm}>
          <form onSubmit={SignupForm.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4 mt-4">
                <FormField
                  control={SignupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="john.smith@example.com"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={SignupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          type="password"
                          placeholder="Password"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <></>
                )}
                Login
              </Button>
              <a className="mt-4 text-gray-400" href="/forgotpassword">
                Lost Password?
              </a>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <a className="mt-4 text-gray-500" href="/signup">
        Create your account!
      </a>
    </div>
  );
}
