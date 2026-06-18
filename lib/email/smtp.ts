import nodemailer from "nodemailer";

type SubscriptionEmailInput = {
  email: string;
  source: string;
};

function env(name: string) {
  return process.env[name]?.trim() || "";
}

export function isSmtpConfigured() {
  return Boolean(env("SMTP_HOST") && env("SMTP_USER") && env("SMTP_PASSWORD"));
}

function getTransporter() {
  const port = Number(env("SMTP_PORT") || 587);
  const secure = env("SMTP_SECURE") === "true" || port === 465;

  return nodemailer.createTransport({
    host: env("SMTP_HOST"),
    port,
    secure,
    auth: {
      user: env("SMTP_USER"),
      pass: env("SMTP_PASSWORD")
    }
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendSubscriptionEmails({ email, source }: SubscriptionEmailInput) {
  if (!isSmtpConfigured()) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  const transporter = getTransporter();
  const from = env("SMTP_FROM") || env("SMTP_USER");
  const notifyTo = env("SUBSCRIBE_NOTIFY_TO") || env("SMTP_FROM") || env("SMTP_USER");
  const siteName = env("NEXT_PUBLIC_SITE_URL") || "Loglime website";
  const safeEmail = escapeHtml(email);
  const safeSource = escapeHtml(source || "website");

  await transporter.sendMail({
    from,
    to: notifyTo,
    replyTo: email,
    subject: "New Loglime email subscriber",
    text: [`New subscriber: ${email}`, `Source: ${source || "website"}`, `Site: ${siteName}`].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1a1c">
        <h2 style="margin:0 0 12px">New Loglime email subscriber</h2>
        <p style="margin:0 0 8px"><strong>Email:</strong> ${safeEmail}</p>
        <p style="margin:0 0 8px"><strong>Source:</strong> ${safeSource}</p>
        <p style="margin:0;color:#62666d"><strong>Site:</strong> ${escapeHtml(siteName)}</p>
      </div>
    `
  });

  if (env("SUBSCRIBE_SEND_CONFIRMATION") === "false") {
    return;
  }

  await transporter.sendMail({
    from,
    to: email,
    subject: "You are subscribed to Loglime updates",
    text:
      "Thanks for subscribing to Loglime updates. We will send practical notes about restaurant app launches, ordering, menus, bookings and loyalty growth.",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.7;color:#1a1a1c">
        <h2 style="margin:0 0 12px">You are subscribed</h2>
        <p style="margin:0 0 12px">
          Thanks for subscribing to Loglime updates. We will send practical notes about restaurant app launches,
          ordering, menus, bookings and loyalty growth.
        </p>
        <p style="margin:0;color:#62666d">Loglime - smart restaurant apps for modern businesses.</p>
      </div>
    `
  });
}
