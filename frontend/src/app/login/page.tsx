"use client";
import { useState, useTransition } from "react";

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
import { useTranslations } from "next-intl";

export default function Login() {
  const t = useTranslations("Auth");

  const LoginFormSchema = z.object({
    email: z.string().email({
      message: t("invalidEmail"),
    }),
    password: z.string(),
  });

  const LoginForm = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const route = useRouter();

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
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
          title: t("successfulLogin"),
          description: t("redirect"),
        });
        route.push("/dashboard");
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
        <h1 className="text-2xl font-bold">{t("welcomBack")}</h1>
        <p className="text-gray-500">{t("monitorAllYourStuffInJustFewClick")}</p>
      </div>
      <Card className="w-[350px]">
        <Form {...LoginForm}>
          <form onSubmit={LoginForm.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4 mt-4">
                <FormField
                  control={LoginForm.control}
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
                  control={LoginForm.control}
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
                {t("lostPassword")}
              </a>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <a className="mt-4 text-gray-500" href="/signup">
        {t("createYourAccount")}
      </a>
    </div>
  );
}
