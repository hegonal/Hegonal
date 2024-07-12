"use client";

import { Loader2, SquarePlus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function CreateNewTeam({ isOpen }: MenuProps) {
  const t = useTranslations("Sidebar");

  const CreateNewTeamSchema = z.object({
    name: z.string().min(2, {
      message: t("teamNameTooShort"),
    }),
    description: z.string(),
  });

  const CreateNewTeamForm = useForm<z.infer<typeof CreateNewTeamSchema>>({
    resolver: zodResolver(CreateNewTeamSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const route = useRouter();

  async function onSubmit(data: z.infer<typeof CreateNewTeamSchema>) {
    setLoading(true);
    const origin = window.location.origin;

    try {
      const response = await fetch(`${origin}/api/team/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: t("successfulCreateNewTeam"),
          description: t("redirect"),
        });
        window.location.replace("/dashboard/" + result.team.team_id);
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
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => {}}
                variant="outline"
                className="w-full justify-center h-10 mt-5"
              >
                <span className={cn(isOpen === false ? "" : "mr-4")}>
                  <SquarePlus size={18} />
                </span>
                <p
                  className={cn(
                    "whitespace-nowrap",
                    isOpen === false ? "opacity-0 hidden" : "opacity-100"
                  )}
                >
                  {t("createNewTeam")}
                </p>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <Form {...CreateNewTeamForm}>
                <form onSubmit={CreateNewTeamForm.handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>{t("createNewTeam")}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <FormField
                      control={CreateNewTeamForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("name")}</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              type="text"
                              placeholder={t("name")}
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={CreateNewTeamForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("description")}</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              type="Text"
                              placeholder={t("description")}
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={loading}>
                      {" "}
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <></>
                      )}
                      {t("create")}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        {isOpen === false && (
          <TooltipContent side="right">{t("createNewTeam")}</TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
