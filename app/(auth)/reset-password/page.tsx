"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Card, Input, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

const schema = z
  .object({
    password: z.string().min(8, "Use at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

type ResetPasswordForm = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(values: ResetPasswordForm) {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: values.password });

      if (error) {
        throw error;
      }

      showToast({
        title: "Password updated",
        description: "You can now continue to your account.",
        tone: "success",
      });
      router.push("/login");
    } catch (error) {
      showToast({
        title: "Could not update password",
        description: error instanceof Error ? error.message : "Please request a new reset link.",
        tone: "error",
      });
    }
  }

  return (
    <Card>
      <div className="mb-6 text-center">
        <h1 className="text-h2 text-text-primary">Choose a password</h1>
        <p className="mt-2 text-body text-text-secondary">Set a new password for your Loglime account.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="New password" type="password" autoComplete="new-password" error={errors.password?.message} {...register("password")} />
        <Input label="Confirm password" type="password" autoComplete="new-password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
        <Button className="w-full" type="submit" isLoading={isSubmitting}>
          Update password
        </Button>
      </form>
    </Card>
  );
}
