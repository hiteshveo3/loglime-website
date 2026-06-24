import nodemailer from "nodemailer";

// Zoho SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST,
  port: parseInt(process.env.ZOHO_SMTP_PORT || "587"),
  secure: process.env.ZOHO_SMTP_PORT === "465",
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASSWORD,
  },
});

// Loops Transactional Email Client
async function sendLoopsEmail(
  transactionalId: string,
  to: string,
  dataVariables: Record<string, string>
) {
  try {
    const response = await fetch("https://app.loops.so/api/v1/transactional/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LOOPS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transactionalId,
        email: to,
        dataVariables,
      }),
    });

    if (!response.ok) {
      throw new Error(`Loops API error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("[Loops Email] Sent:", result);
    return result;
  } catch (error) {
    console.error("[Loops Email] Error:", error);
    throw error;
  }
}

export type EmailType = "ai_chat" | "lead_capture" | "contact_form" | "support_ticket" | "ticket_update";

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const result = await transporter.sendMail({
      from: options.from || process.env.ZOHO_FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });
    console.log("[Email] Sent:", result.messageId);
    return result;
  } catch (error) {
    console.error("[Email] Error:", error);
    throw error;
  }
}

// Email template generators
export function generateAIChatNotification(visitorEmail: string, visitorName: string, message: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1f2937; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #FF5A5F 0%, #FF7570 100%); padding: 30px; border-radius: 12px; color: white; text-align: center; }
    .content { background: #f9fafb; padding: 30px; margin-top: 20px; border-radius: 12px; }
    .message-box { background: white; padding: 20px; border-left: 4px solid #FF5A5F; margin: 20px 0; border-radius: 8px; }
    .button { display: inline-block; background: #FF5A5F; color: white; padding: 12px 30px; border-radius: 24px; text-decoration: none; margin: 20px 0; }
    .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🤖 New Zest AI Message</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>A visitor just sent a message through Zest AI:</p>

      <div class="message-box">
        <p><strong>From:</strong> ${visitorName} (${visitorEmail})</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      </div>

      <p>Review this conversation in your CRM dashboard to respond.</p>
      <a href="${process.env.NEXT_PUBLIC_DOMAIN || "https://loglime.com"}/crm/dashboard" class="button">View in Dashboard</a>

      <p>Best regards,<br>Loglime Team</p>
    </div>
    <div class="footer">
      <p>© 2024 Loglime LLC. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateLeadCaptureAdmin(name: string, email: string, message: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1f2937; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #FF5A5F 0%, #FF7570 100%); padding: 30px; border-radius: 12px; color: white; text-align: center; }
    .card { background: white; border: 1px solid #e5e7eb; padding: 20px; margin: 15px 0; border-radius: 8px; }
    .label { color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { color: #1f2937; font-size: 16px; font-weight: 600; margin-top: 5px; }
    .button { display: inline-block; background: #FF5A5F; color: white; padding: 12px 30px; border-radius: 24px; text-decoration: none; margin: 20px 0; }
    .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✨ New Lead Captured</h1>
    </div>

    <div class="card">
      <div class="label">Name</div>
      <div class="value">${name}</div>
    </div>

    <div class="card">
      <div class="label">Email</div>
      <div class="value">${email}</div>
    </div>

    <div class="card">
      <div class="label">Message</div>
      <div class="value">${message || "No message"}</div>
    </div>

    <a href="${process.env.NEXT_PUBLIC_DOMAIN || "https://loglime.com"}/crm/leads" class="button">View All Leads</a>

    <div class="footer">
      <p>© 2024 Loglime LLC. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateLeadCaptureCustomer(name: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1f2937; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #FF5A5F 0%, #FF7570 100%); padding: 30px; border-radius: 12px; color: white; text-align: center; }
    .content { background: #f9fafb; padding: 30px; margin-top: 20px; border-radius: 12px; }
    .button { display: inline-block; background: #FF5A5F; color: white; padding: 12px 30px; border-radius: 24px; text-decoration: none; margin: 20px 0; }
    .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You, ${name}! 🎉</h1>
    </div>
    <div class="content">
      <p>We've received your inquiry and our team will be in touch within 24 hours.</p>
      <p>In the meantime, check out our <strong>demo video</strong> to see Loglime in action.</p>
      <a href="${process.env.NEXT_PUBLIC_DOMAIN || "https://loglime.com"}/demo" class="button">Watch Demo</a>
      <p>Questions? Reply to this email or visit our help center.</p>
      <p>Best regards,<br>The Loglime Team</p>
    </div>
    <div class="footer">
      <p>© 2024 Loglime LLC. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateContactFormNotification(name: string, email: string, subject: string, message: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1f2937; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #FF5A5F 0%, #FF7570 100%); padding: 30px; border-radius: 12px; color: white; text-align: center; }
    .card { background: white; border: 1px solid #e5e7eb; padding: 20px; margin: 15px 0; border-radius: 8px; }
    .label { color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; }
    .value { color: #1f2937; font-size: 15px; font-weight: 600; margin-top: 5px; }
    .message { background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 10px; }
    .reply-button { display: inline-block; background: #FF5A5F; color: white; padding: 12px 30px; border-radius: 24px; text-decoration: none; margin: 20px 0; }
    .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 New Contact Form Submission</h1>
    </div>

    <div class="card">
      <div class="label">From</div>
      <div class="value">${name}</div>
      <div style="color: #6b7280; margin-top: 5px;">${email}</div>
    </div>

    <div class="card">
      <div class="label">Subject</div>
      <div class="value">${subject}</div>
    </div>

    <div class="card">
      <div class="label">Message</div>
      <div class="message">${message.replace(/\n/g, "<br>")}</div>
    </div>

    <p style="text-align: center;">
      <a href="mailto:${email}" class="reply-button">Reply to ${name}</a>
    </p>

    <div class="footer">
      <p>© 2024 Loglime LLC. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateSupportTicketNotification(ticketId: string, title: string, category: string, priority: string, customerName?: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1f2937; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #FF5A5F 0%, #FF7570 100%); padding: 30px; border-radius: 12px; color: white; text-align: center; }
    .badge { display: inline-block; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin: 10px 5px 0 0; }
    .badge.urgent { background: #dc2626; color: white; }
    .badge.normal { background: #3b82f6; color: white; }
    .badge.low { background: #10b981; color: white; }
    .card { background: white; border: 1px solid #e5e7eb; padding: 20px; margin: 15px 0; border-radius: 8px; }
    .button { display: inline-block; background: #FF5A5F; color: white; padding: 12px 30px; border-radius: 24px; text-decoration: none; margin: 20px 0; }
    .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎫 New Support Ticket</h1>
      <p style="margin: 0; font-size: 14px; opacity: 0.9;">Ticket ID: ${ticketId}</p>
    </div>

    <div class="card">
      <h3 style="margin-top: 0;">${title}</h3>
      <div>
        <span class="badge ${priority === "urgent" ? "urgent" : priority === "normal" ? "normal" : "low"}">${priority.toUpperCase()}</span>
        <span class="badge" style="background: #8b5cf6; color: white;">${category}</span>
      </div>
      ${customerName ? `<p style="margin-top: 15px; color: #6b7280;"><strong>From:</strong> ${customerName}</p>` : ""}
    </div>

    <a href="${process.env.NEXT_PUBLIC_DOMAIN || "https://loglime.com"}/crm/support" class="button">View Ticket</a>

    <div class="footer">
      <p>© 2024 Loglime LLC. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}
