"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Card, Input, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  email: z.string().email("Enter a valid email."),
});

type ForgotPasswordForm = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordForm) {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      showToast({
        title: "Reset link sent",
        description: "Check your inbox for password reset instructions.",
        tone: "success",
      });
    } catch (error) {
      showToast({
        title: "Could not send reset link",
        description: error instanceof Error ? error.message : "Please try again.",
        tone: "error",
      });
    }
  }

  return (
    <Card>
      <div className="mb-6 text-center">
        <h1 className="text-h2 text-text-primary">Reset password</h1>
        <p className="mt-2 text-body text-text-secondary">Enter your email and we will send a reset link.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <Button className="w-full" type="submit" isLoading={isSubmitting}>
          Send reset link
        </Button>
      </form>
      <a className="mt-5 block text-center text-small font-semibold text-coral" href="/login">
        Back to login
      </a>
    </Card>
  );
}
