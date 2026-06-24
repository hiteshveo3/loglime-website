"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Card, Input, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

const schema = z
  .object({
    fullName: z.string().min(2, "Enter your name."),
    password: z.string().min(8, "Use at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

type AcceptInviteForm = z.infer<typeof schema>;

export default function AcceptInvitePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AcceptInviteForm>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: AcceptInviteForm) {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: values.password,
        data: { full_name: values.fullName },
      });

      if (error) {
        throw error;
      }

      showToast({
        title: "Invite accepted",
        description: "Your portal account is ready.",
        tone: "success",
      });
      router.push("/portal/dashboard");
    } catch (error) {
      showToast({
        title: "Could not accept invite",
        description: error instanceof Error ? error.message : "Please ask the Loglime team for a fresh invite.",
        tone: "error",
      });
    }
  }

  return (
    <Card>
      <div className="mb-6 text-center">
        <h1 className="text-h2 text-text-primary">Accept invite</h1>
        <p className="mt-2 text-body text-text-secondary">Create your password to open the customer portal.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Full name" autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
        <Input label="Password" type="password" autoComplete="new-password" error={errors.password?.message} {...register("password")} />
        <Input label="Confirm password" type="password" autoComplete="new-password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
        <Button className="w-full" type="submit" isLoading={isSubmitting}>
          Continue to portal
        </Button>
      </form>
    </Card>
  );
}
