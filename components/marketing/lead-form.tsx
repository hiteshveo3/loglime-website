"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Input, Textarea, useToast } from "@/components/ui";

const leadSchema = z.object({
  fullName: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid email."),
  company: z.string().min(2, "Enter your restaurant or company."),
  phone: z.string().optional(),
  message: z.string().min(10, "Tell us a little more."),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export function LeadForm({ source }: { source: "demo" | "contact" }) {
  const { showToast } = useToast();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { fullName: "", email: "", company: "", phone: "", message: "" },
  });

  async function onSubmit(values: LeadFormValues) {
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Could not submit form.");

      reset();
      showToast({
        title: source === "demo" ? "Demo request received" : "Message received",
        description: "The Loglime team will follow up shortly.",
        tone: "success",
      });
    } catch (error) {
      showToast({
        title: "Could not submit form",
        description: error instanceof Error ? error.message : "Please try again.",
        tone: "error",
      });
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Name" autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
      <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      <Input label="Company or restaurant" autoComplete="organization" error={errors.company?.message} {...register("company")} />
      <Input label="Phone" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
      <Textarea label="Message" error={errors.message?.message} {...register("message")} />
      <Button className="w-full" type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
