"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Card, Input, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(1, "Password is required."),
});

type LoginForm = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginForm) {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword(values);

      if (error) {
        throw error;
      }

      router.push(searchParams.get("next") ?? "/crm/dashboard");
      router.refresh();
    } catch (error) {
      showToast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        tone: "error",
      });
    }
  }

  async function signInWithGoogle() {
    try {
      setIsGoogleLoading(true);
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setIsGoogleLoading(false);
      showToast({
        title: "Google login failed",
        description: error instanceof Error ? error.message : "Please try again.",
        tone: "error",
      });
    }
  }

  return (
    <Card>
      <div className="mb-6 text-center">
        <h1 className="text-h2 text-text-primary">Welcome back</h1>
        <p className="mt-2 text-body text-text-secondary">Sign in to continue to Loglime.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <Input label="Password" type="password" autoComplete="current-password" error={errors.password?.message} {...register("password")} />
        <div className="flex justify-end">
          <a className="text-small font-semibold text-coral" href="/forgot-password">
            Forgot Password?
          </a>
        </div>
        <Button className="w-full" type="submit" isLoading={isSubmitting}>
          Login
        </Button>
      </form>
      <div className="my-5 flex items-center gap-3 text-small text-text-muted">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
      <Button className="w-full" type="button" variant="secondary" onClick={signInWithGoogle} isLoading={isGoogleLoading}>
        Continue with Google
      </Button>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <Card>
          <div className="h-72 animate-pulse rounded-2xl bg-slate-100" />
        </Card>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
