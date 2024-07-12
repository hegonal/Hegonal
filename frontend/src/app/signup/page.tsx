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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Signup() {
  const t = useTranslations("Auth")

  const passwordSchema = z.string().min(8, {
    message: t("passwordToShort"),
  });

  const SignupFormSchema = z
    .object({
      username: z.string().min(2, {
        message: t("usernameToShort"),
      }),
      email: z.string().email({
        message: t("invalidEmail"),
      }),
      password: passwordSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordDontMatch"),
      path: ["confirmPassword"],
    });

  const SignupForm = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const route = useRouter()

  async function onSubmit(data: z.infer<typeof SignupFormSchema>) {
    setLoading(true);
    const origin = window.location.origin;

    try {
      const response = await fetch(`${origin}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: t("successfulRegister"),
          description: t("redirect"),
        });
        route.push("/dashboard")
      } else if (result.msg === ".") {
        SignupForm.setError("email", {
          type: "manual",
          message: t("emailAlreadyInUsed"),
        });
        setLoading(false);
      } else {
        toast({
          variant: "destructive",
          title: t("errorTitle"),
          description: t("errorDescription"),
        });
      }
      setLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("errorTitle"),
        description: t("errorDescription"),
      });
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center mb-4 space-y-2">
        <h1 className="text-2xl font-bold">{t("welcomeToHegonal")}</h1>
        <p className="text-gray-500">{t("monitorAllYourStuffInJustFewClick")}</p>
      </div>
      <Card className="w-[350px]">
        <Form {...SignupForm}>
          <form onSubmit={SignupForm.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4 mt-4">
                <FormField
                  control={SignupForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("username")}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="John smith"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
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
                      <FormLabel>{t("password")}</FormLabel>
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
                <FormField
                  control={SignupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("confirmPassword")}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          type="password"
                          placeholder="Confirm password"
                          {...field}
                          className="w-full mb-2"
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
                {t("signup")}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <a className="mt-4 text-gray-500" href="/login">
        {t("alreadyHaveAnAccount")}
      </a>
    </div>
  );
}
