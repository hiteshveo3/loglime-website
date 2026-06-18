"use client";

import { type ReactNode, useId, useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

type SubscribeFormProps = {
  buttonClassName?: string;
  buttonIcon?: ReactNode;
  buttonLabel?: string;
  className?: string;
  inputClassName?: string;
  inputLabel?: string;
  placeholder?: string;
  source: string;
  successMessage?: string;
};

export function SubscribeForm({
  buttonClassName,
  buttonIcon,
  buttonLabel = "Subscribe",
  className,
  inputClassName,
  inputLabel = "Email address",
  placeholder = "Email address",
  source,
  successMessage = "Thanks. You are subscribed."
}: SubscribeFormProps) {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, source, company })
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState("error");
        setMessage(data.message || "We could not subscribe this email right now.");
        return;
      }

      setState("success");
      setEmail("");
      setCompany("");
      setMessage(data.message || successMessage);
    } catch {
      setState("error");
      setMessage("We could not subscribe this email right now. Please try again shortly.");
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={emailId}>
        {inputLabel}
      </label>
      <input
        autoComplete="email"
        className={inputClassName}
        id={emailId}
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder={placeholder}
        required
        type="email"
        value={email}
      />
      <label className="subscribe-hp" htmlFor={`${emailId}-company`}>
        Company
      </label>
      <input
        aria-hidden="true"
        autoComplete="off"
        className="subscribe-hp"
        id={`${emailId}-company`}
        name="company"
        onChange={(event) => setCompany(event.target.value)}
        tabIndex={-1}
        type="text"
        value={company}
      />
      <button className={buttonClassName} disabled={state === "loading"} type="submit">
        {state === "loading" ? "Subscribing..." : buttonLabel}
        {state === "loading" ? null : buttonIcon}
      </button>
      {message ? (
        <p className={state === "success" ? "subscribe-message success" : "subscribe-message error"} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
