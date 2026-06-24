# LOGLIME — UI SYSTEMS DOCUMENT
## Zest Widget · Notifications · Toasts · Skeletons · Search · Modals · Onboarding · Errors
## Version 1.0 | Codex Implementation Document

> **Codex:** These are the shared UI systems used across every surface of the platform.
> Build these as global shared components before building any page-level content.
> They live in `/components/shared/` and are imported everywhere.

---

# PART 1 — ZEST AI CHATBOT WIDGET (Complete System)

## 1.1 What Zest Is

Zest is a floating AI chat widget powered by Gemini 2.0 Flash. It appears on:
- `loglime.com` — marketing website (bottom-right, all pages except /login)
- `app.loglime.com/portal/*` — customer portal (bottom-right)
- `app.loglime.com/crm/*` — internal CRM (bottom-right, slightly different behavior)

Zest is NOT a popup. NOT a banner. It sits quietly as a coral circle until a user initiates.

## 1.2 The Three Modes

```
MODE 1 — VISITOR (loglime.com, no auth)
  Purpose:    Answer product questions, capture leads
  First msg:  "Hi! I'm Zest 👋 Before we chat, what's your name and email?"
  Lead flow:  Email captured → lead auto-created in CRM
  Escalation: "Would you like to book a demo?" → /demo link

MODE 2 — CUSTOMER (portal, logged in as restaurant owner)
  Purpose:    Navigate platform, check project status, create tickets
  First msg:  "Hi [Name]! How can I help you with [Restaurant Name] today?"
  Context:    Knows their products, projects, tickets, invoices
  Escalation: Creates support ticket directly from chat

MODE 3 — TEAM (CRM, logged in as team member)
  Purpose:    Find records, draft responses, summarize data
  First msg:  "Hi [Name]. What do you need?" (no fluff — team is busy)
  Commands:   /find, /summarize, /draft, /faq, /outline
  Escalation: Suggests actions, does not take them autonomously
```

## 1.3 Widget States (5 States)

```
STATE 1 — CLOSED (default)
  ┌─────┐
  │  ⚡ │  ← 56px circle, coral bg, white icon (hgi-ai-chat or hgi-stroke hgi-chat-bot)
  └─────┘
  Position: fixed bottom-6 right-6 (24px from edges)
  Shadow: shadow-floating (0 20px 40px rgba(255,90,95,0.25))
  z-index: 9999
  Hover: scale(1.08), 150ms ease
  Click: → STATE 3 (OPEN)

STATE 2 — UNREAD BADGE
  Same as STATE 1 but with a badge:
  ┌─────┐
  │  ⚡ │ ← [3] red dot badge, top-right of circle
  └─────┘
  Badge: 18px circle, bg-red-500, white text, 10px font
  Appears when: Zest sends a proactive message (visitor mode only)
  Proactive trigger: after 45 seconds on pricing or demo page,
                     Zest sends "Need help deciding? I can answer any questions."

STATE 3 — OPEN (desktop — 360×520px drawer)
  ┌──────────────────────────────────────────┐
  │  [Avatar]  Zest                    [─][✕]│  ← header 60px
  │            ● Online                      │
  ├──────────────────────────────────────────┤
  │                                          │
  │  [message area — scrollable]             │  ← body, flex-grow
  │                                          │
  │                                          │
  │                                          │
  ├──────────────────────────────────────────┤
  │  [Type a message...]          [Send →]   │  ← footer 64px
  └──────────────────────────────────────────┘
  Width: 360px | Height: 520px | Max-height: 80vh
  Position: fixed bottom-24 right-6 (above the closed button)
  border-radius: rounded-3xl (24px)
  shadow: 0 25px 60px rgba(15,23,42,0.15)
  border: 1px solid #F1F5F9
  Open animation: scale 0.85→1 + opacity 0→1 + translateY 20px→0, 200ms ease-out
  Origin: bottom-right (transform-origin: bottom right)

STATE 4 — MINIMIZED
  Drawer collapses but button stays visible with unread count badge.
  Minimize button (─) in header → collapses drawer to just the button.
  Different from CLOSED: unread count visible, click expands not restores.

STATE 5 — MOBILE (full screen)
  On screens < 768px: widget opens full screen (not a small drawer)
  ┌─────────────────────────────────────────────┐
  │ [←] [Avatar] Zest · Online         [✕]     │ ← header 56px
  ├─────────────────────────────────────────────┤
  │                                             │
  │  [message area — scrollable]                │
  │                                             │
  ├─────────────────────────────────────────────┤
  │  [Type a message...]              [→]       │
  └─────────────────────────────────────────────┘
  Full viewport, z-index 9999
  Slide up from bottom: translateY(100%)→translateY(0), 250ms ease-out
```

## 1.4 Chat Header Design

```
┌──────────────────────────────────────────────────┐
│  ┌───┐                                  [─] [✕]  │
│  │ ⚡│  Zest                                      │
│  └───┘  ● Online · AI Assistant                   │
└──────────────────────────────────────────────────┘

Avatar: 36px circle, coral bg, white ⚡ icon (hgi-stroke hgi-flash), 20px
Name: "Zest" — 15px, font-700, slate-900
Status: "● Online" — 12px, font-500, #10B981 (green dot) + slate-500 text
Subtitle: "· AI Assistant" — 12px, font-500, slate-400
Header bg: white
Header border-bottom: 1px solid #F1F5F9
Minimize button (─): hgi-stroke hgi-minus-sign, 20px, slate-400, hover slate-700
Close button (✕): hgi-stroke hgi-cancel-01, 20px, slate-400, hover slate-700
```

## 1.5 Message Bubble Design

```
USER MESSAGE (right-aligned):
  ┌────────────────────────────────────┐
  │                  How much does it  │
  │                  cost per month?   │
  └────────────────────────────────────┘
  bg: coral (#FF5A5F), text: white
  border-radius: rounded-2xl rounded-br-md (tail bottom-right)
  padding: px-4 py-3
  max-width: 75% of chat width
  font: 14px, font-500
  align: flex-end (right side)
  margin-bottom: 4px

ZEST MESSAGE (left-aligned):
  ┌────────────────────────────────────┐
  │ Loglime starts at $79/month on     │
  │ the Starter plan. All plans come   │
  │ with a 14-day free trial and no    │
  │ credit card required.              │
  └────────────────────────────────────┘
  bg: #F8FAFC (surface-alt), text: slate-900
  border-radius: rounded-2xl rounded-bl-md (tail bottom-left)
  padding: px-4 py-3
  max-width: 80%
  font: 14px, font-500, leading-relaxed
  align: flex-start (left side)
  Avatar: 28px coral circle with ⚡, positioned bottom-left of message group
          (shows only on FIRST message in a consecutive Zest response block)

TIMESTAMP (under message group):
  12px, slate-400, font-500
  Format: "Just now" | "2 min ago" | "10:45 AM"
  Shows once per group (not under every message)

SYSTEM MESSAGE (centered):
  "Conversation started" | "Ticket #1234 created"
  font: 11px, slate-400, font-500, uppercase, tracking-wide
  No bubble — just centered text with horizontal lines either side
```

## 1.6 Typing Indicator

Shows while waiting for Gemini API response:

```
  ┌──────────┐
  │ ●  ●  ● │  ← 3 dots, 8px each, coral color
  └──────────┘

Animation: Each dot bounces up and down sequentially
Keyframes:
  0%, 60%, 100% → translateY(0)
  30%           → translateY(-6px)

Delays: dot-1: 0ms, dot-2: 150ms, dot-3: 300ms
Duration: 900ms per cycle, infinite loop
bg: #F8FAFC, same bubble style as Zest message
Appears: 300ms after user sends message (prevents flicker on fast responses)
```

## 1.7 Streaming Text Animation

Gemini 2.0 Flash supports streaming. Implement word-by-word reveal:

```typescript
// /api/ai/chat/route.ts — streaming response

import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: Request) {
  const { messages, mode, context } = await req.json()
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  
  const systemPrompt = getSystemPrompt(mode, context)
  const chat = model.startChat({
    history: messages.slice(0, -1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    })),
    systemInstruction: systemPrompt,
  })
  
  const result = await chat.sendMessageStream(messages.at(-1).content)
  
  // Stream response as Server-Sent Events
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text()
        if (text) {
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ text })}\n\n`))
        }
      }
      controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
      controller.close()
    }
  })
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  })
}

// Client-side: receive stream
async function sendMessage(content: string) {
  setIsStreaming(true)
  setMessages(prev => [...prev, { role: 'assistant', content: '' }])
  
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ messages, mode, context }),
  })
  
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    
    const chunk = decoder.decode(value)
    const lines = chunk.split('\n\n')
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        if (data === '[DONE]') { setIsStreaming(false); break }
        const { text } = JSON.parse(data)
        setMessages(prev => {
          const last = [...prev]
          last[last.length - 1].content += text
          return last
        })
      }
    }
  }
}
```

Cursor animation while streaming:
```css
/* Blinking cursor at end of streaming text */
.streaming-text::after {
  content: '▌';
  color: #FF5A5F;
  animation: blink 800ms step-end infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
/* Remove cursor when streaming ends */
.streaming-complete::after { display: none; }
```

## 1.8 Lead Capture Flow (Visitor Mode)

Triggered when: visitor sends first message on loglime.com without being logged in.

```
STEP 1 — Zest sends welcome:
  "Hi! I'm Zest, Loglime's AI assistant ⚡
  I can answer questions about our products, pricing, and setup.
  What's your name and email so I can follow up if needed?"

STEP 2 — Inline form appears in chat (not a popup):
  ┌──────────────────────────────────────────┐
  │  Your name                               │
  │  [Input field]                           │
  │                                          │
  │  Your email                              │
  │  [Input field]                           │
  │                                          │
  │  [Start chatting →]                      │
  └──────────────────────────────────────────┘
  Card bg: white, border: 1px solid #F1F5F9, rounded-2xl, p-4
  Appears as a Zest message bubble

STEP 3 — On submit:
  - POST /api/ai/chat/lead with { name, email }
  - Supabase: INSERT into leads (full_name, email, source: 'zest_widget')
  - CRM: triggers notification to Sales team
  - Zest responds: "Great to meet you, [Name]! What would you like to know?"
  - Form is replaced by the response message

STEP 4 — "Skip" option:
  Small text link below form: "Skip for now →"
  If skipped: chat continues anonymously, lead NOT created
  Zest behavior: same, but email not captured

ANONYMOUS RATE LIMIT:
  Max 10 messages per session without providing email
  After 10: "I'd love to keep helping — drop your email and I'll continue!"
  Re-shows lead capture form
```

## 1.9 Quick Reply Chips

After certain Zest responses, show suggested follow-up options:

```
Zest message: "What would you like to know more about?"
              ┌─────────────────┐ ┌──────────────┐ ┌──────────┐
              │ 💳 Pricing      │ │ ⏱ Setup time │ │ 📱 Apps  │
              └─────────────────┘ └──────────────┘ └──────────┘

Chip design:
  bg: white, border: 1px solid #E2E8F0, rounded-full
  padding: px-4 py-2, font: 13px, font-600, slate-700
  hover: bg-coral-light, border-coral, text-coral
  transition: 150ms

Chips appear: below Zest message, above input field
Max chips per message: 4
Clicking a chip: sends it as user message, chips disappear

PREDEFINED CHIP SETS PER CONTEXT:
  Visitor landing:     ["Pricing", "How it works", "Book a demo", "Commission fees"]
  Pricing page:        ["Which plan is right for me?", "Is there a free trial?", "Annual discount"]
  Products page:       ["Online Ordering", "Restaurant App", "Table Booking", "QR Menu"]
  Customer portal:     ["My project status", "Create a ticket", "View invoice", "Download assets"]
  After ticket create: ["Track my ticket", "Chat with support", "Back to dashboard"]
```

## 1.10 Ticket Creation Flow (Customer/Portal Mode)

When a customer describes a technical problem Zest cannot resolve:

```
USER: "My QR menu isn't loading on iPhones"

ZEST: "I'm sorry to hear that! This sounds like something our support
      team should look into directly. Shall I create a support ticket
      for you right now?"

      [Yes, create ticket] [No, keep chatting]

ON "YES":
  Zest: "Creating your ticket..."
  
  → POST /api/tickets with:
    {
      customer_id: currentUser.customerId,
      title: "QR menu not loading on iPhones",  // auto-generated from conversation
      category: "technical",
      content: [last 5 messages as context],
      ai_created: true
    }
  
  Zest: "✓ Ticket #1089 created. Our support team will reply within
        a few hours. You can track it in your portal under Support.
        
        [View ticket →]"

  → Card appears:
    ┌──────────────────────────────────────┐
    │  ✓ Ticket Created                    │
    │  #1089 · Technical                   │
    │  "QR menu not loading on iPhones"    │
    │  Status: Open · Just now             │
    │  [View ticket →]                     │
    └──────────────────────────────────────┘
```

## 1.11 Zest Commands (Team/CRM Mode)

Team members can use slash commands for power features:

```
/find [name or company]
  → Searches CRM, returns top 3 matches with links
  Example: "/find Ahmed Al Rashidi"
  Response: "Found 2 matches: Ahmed Al Rashidi (Mezze House, Lead) | 
             Ahmed Al Rashidi (Cloud Kitchen Co, Customer)"

/summarize [customer name]
  → Pulls last 30 days of activity, summarizes in 3 bullet points
  Example: "/summarize Ember Grill"

/draft email for [customer name] about [topic]
  → Generates a professional email draft
  Example: "/draft email for Rosewood Cafe about invoice overdue"

/faq [topic]
  → Generates 5 FAQ Q&As for blog or knowledge base
  Example: "/faq restaurant loyalty programs"

/outline [blog topic]
  → Generates H2/H3 structure for a blog post

/ticket [customer name]
  → Opens a quick ticket creation form pre-filled with customer info
```

## 1.12 Zest API Context Injection

What gets injected into Gemini's system prompt per mode:

```typescript
// lib/gemini.ts

export function buildSystemPrompt(mode: ZestMode, context: ZestContext): string {
  const base = `You are Zest, Loglime's AI assistant.
Loglime is a commission-free restaurant technology platform.
Products: Online Ordering, Digital Menu, Table Booking, Loyalty Program, QR Menu, Restaurant App.
Pricing: Starter $79/month, Growth $149/month, Scale $249/month. All plans: 14-day free trial.
Be concise. Answer in 2-4 sentences max unless a list is needed.
Never make up features or pricing not mentioned above.
Use plain English. No jargon. No em dashes.`

  if (mode === 'visitor') {
    return `${base}
You are speaking with a website visitor who may be a potential customer.
Be friendly, helpful, and gently sales-oriented.
Always offer to book a demo for complex questions: https://loglime.com/demo`
  }

  if (mode === 'customer') {
    return `${base}
You are speaking with ${context.customerName} from ${context.restaurantName}.
Their purchased products: ${context.products.join(', ')}.
Active projects: ${context.activeProjects} (${context.projectStatus}).
Open support tickets: ${context.openTickets}.
Unpaid invoices: ${context.unpaidInvoices}.
Help them navigate the portal, check status, and resolve issues.
If you cannot resolve an issue, offer to create a support ticket.`
  }

  if (mode === 'team') {
    return `${base}
You are an internal assistant for a Loglime team member named ${context.userName} (${context.userRole}).
Help with CRM tasks: finding records, drafting communications, summarizing data.
Do NOT take autonomous actions. Suggest actions, let the user confirm.
For slash commands (/find, /summarize, /draft), use the structured response format.`
  }
}
```

## 1.13 Conversation History Management

```typescript
// Stored in ai_conversations table
// Max 50 messages per conversation kept
// Older messages archived (not sent to Gemini — reduces tokens)

// Token budget management:
// Gemini 2.0 Flash: 1M token context
// In practice: keep last 20 messages in context
// Summarize older history in system prompt if conversation is long

const MAX_HISTORY_IN_CONTEXT = 20

function prepareMessagesForGemini(allMessages: Message[]) {
  if (allMessages.length <= MAX_HISTORY_IN_CONTEXT) {
    return allMessages
  }
  // Take last 20 messages
  return allMessages.slice(-MAX_HISTORY_IN_CONTEXT)
}
```

## 1.14 Rate Limiting & Abuse Prevention

```
PER SESSION LIMITS:
  Visitor (anonymous): 30 messages/session
  Visitor (email captured): 100 messages/session
  Customer (logged in): unlimited
  Team (logged in): unlimited

RATE LIMIT RESPONSE (when hit):
  "You've reached the message limit for this session.
  To continue, sign up for a free trial or contact us at hello@loglime.com."
  [Start free trial →] [Email us →]

INPUT VALIDATION:
  Max message length: 500 characters
  Min message length: 2 characters
  Sanitize: strip HTML tags before sending to Gemini
  Block: messages containing only URLs (spam detection)

ERROR RESPONSE (Gemini API failure):
  "I'm having trouble right now. Please try again in a moment,
  or email us at hello@loglime.com."
  Auto-retry: 1 time after 2 seconds before showing error
```

## 1.15 Zest Persistence & Storage

```typescript
// Chat state persistence
// Desktop: persists in localStorage + Supabase
// Mobile: same

// localStorage keys:
//   loglime_zest_open: boolean (was chat open when user left page?)
//   loglime_zest_minimized: boolean
//   loglime_zest_visitor_name: string (if captured)
//   loglime_zest_visitor_email: string (if captured)
//   loglime_zest_conversation_id: uuid

// On page load:
// 1. Check localStorage for existing conversation_id
// 2. If exists: load history from Supabase ai_conversations
// 3. If new: create new conversation row
// 4. Restore open/minimized state

// Supabase: ai_conversations table (from schema in PRD)
// Real-time: NOT needed for Zest (response is request-based, not push)
```

---

# PART 2 — NOTIFICATION SYSTEM

## 2.1 In-App Notification Bell

```
LOCATION: CRM topbar (right side) + Portal topbar (right side)
ICON: hgi-stroke hgi-notification-01, 22px, slate-600

UNREAD STATE:
  Red badge on bell: 8px circle, bg-red-500
  If count > 9: shows "9+"
  Pulse animation: scale 1→1.2→1, 2s delay between pulses (subtle)
  Badge text: 10px, white, font-700

CLICK → opens NOTIFICATION DROPDOWN:
  ┌───────────────────────────────────────────┐
  │  Notifications              [Mark all ✓]  │
  ├───────────────────────────────────────────┤
  │  ● NEW LEAD · Just now                    │
  │  Ahmed Ali submitted a demo request       │
  │  Restaurant: Cloud Kitchen Lahore         │
  ├───────────────────────────────────────────┤
  │  ✓ Payment Received · 2 hours ago         │
  │  $149 from Rosewood Cafe (Invoice #1089)  │
  ├───────────────────────────────────────────┤
  │  ✓ Ticket Replied · Yesterday             │
  │  The Ember Grill replied on Ticket #1067  │
  ├───────────────────────────────────────────┤
  │  See all notifications →                  │
  └───────────────────────────────────────────┘

  Width: 380px
  Max height: 480px (scrollable)
  position: absolute top-full right-0 mt-2
  border-radius: rounded-2xl
  shadow-modal

NOTIFICATION ITEM:
  Unread: coral left border 3px + slightly off-white bg (#FAFAFA) + bold title
  Read: no border, white bg, normal weight
  Each item: 70px height, p-4, hover: bg-surface-alt
  Icons per type (16px, colored):
    New Lead:     hgi-user-search-01 · coral
    New Customer: hgi-users-01 · #10B981
    Payment:      hgi-invoice-01 · #10B981
    Ticket:       hgi-customer-support · #3B82F6
    Task Due:     hgi-task-01 · #F59E0B
    Project:      hgi-briefcase-01 · #8B5CF6
    Message:      hgi-message-01 · coral
    Announcement: hgi-megaphone-01 · slate-600

MARK AS READ:
  Clicking any notification: marks it read + navigates to related record
  "Mark all ✓" button: marks all read (no navigation)

REALTIME:
  Subscribe to Supabase Realtime on notifications table filtered by user_id
  New notification → badge count increments + new item prepended to list
  No page refresh needed
```

## 2.2 Notification Full Page

Route: `/crm/notifications`

Accessed from "See all notifications →" link in dropdown.

```
LAYOUT:
  H1: Notifications
  Filter tabs: All | Unread | Leads | Payments | Tickets | Tasks
  List: full notification history (paginated, 20 per page)
  Each item: same as dropdown but full-width, with more detail
  Bulk actions: Select all | Mark read | Delete selected
```

## 2.3 Email Notification Templates

Sent via Loops.so. Design specs for Loops template builder:

```
SHARED EMAIL DESIGN:
  Font: System fonts (Arial → Helvetica → sans-serif for email compat)
  Logo: Loglime wordmark + coral accent, top-center
  Max-width: 600px
  Background: #F8FAFC
  Card bg: white, border-radius: 8px, padding: 32px
  Primary color: #FF5A5F
  Footer: "Loglime · Unsubscribe · Privacy Policy"

TEMPLATE 1 — New Lead Notification (to Sales team)
  Subject: "New lead: [Restaurant Name] ([Country])"
  Body: Name, restaurant, email, phone, interested products, lead source
  CTA: [View Lead in CRM →]

TEMPLATE 2 — Welcome (to new Restaurant Owner)
  Subject: "Welcome to Loglime, [Name] 👋"
  Body: Greeting, what happens next (3 steps), portal access button
  CTA: [Access Your Portal →]

TEMPLATE 3 — Ticket Reply (to Customer)
  Subject: "Update on your ticket: [Ticket Title]"
  Body: "[Agent Name] replied to your support ticket."
        Quoted reply content (max 300 chars, "Read more →")
  CTA: [View Full Reply →]

TEMPLATE 4 — Invoice (to Customer)
  Subject: "Invoice #[number] from Loglime — $[amount] due [date]"
  Body: Invoice summary table, total, due date
  CTA: [Pay Now →] (Stripe payment link)

TEMPLATE 5 — Task Due Reminder (to Team Member)
  Subject: "Task due today: [Task Title]"
  Body: Task title, related customer/project, assigned by
  CTA: [View Task →]

TEMPLATE 6 — Project Update (to Customer)
  Subject: "Update on your [Product] project"
  Body: Update content (markdown rendered), progress percentage
  CTA: [View Project →]

TEMPLATE 7 — Comment Approved (to Blog Commenter)
  Subject: "Your comment is live on Loglime"
  Body: Short confirmation, quoted comment, link to post
  CTA: [View Your Comment →]

TEMPLATE 8 — Comment Reply (to Blog Commenter)
  Subject: "[Name] replied to your comment"
  Body: Quoted reply, link to post
  CTA: [View Reply →]

TEMPLATE 9 — Invite (to New Team Member / Restaurant Owner)
  Subject: "You've been invited to Loglime"
  Body: Who invited, what Loglime is, instructions
  CTA: [Accept Invitation →] (expires in 72 hours)
```

---

# PART 3 — TOAST NOTIFICATION SYSTEM

## 3.1 Toast Types & Triggers

Toasts are ephemeral feedback messages. They appear, deliver their message, and leave.

```
4 TOAST TYPES:

SUCCESS  bg: #10B981  icon: hgi-checkmark-circle-01
  Triggers: Record saved, payment received, ticket resolved,
            comment approved, file uploaded, status changed to "done"

ERROR    bg: #EF4444  icon: hgi-cancel-circle-01
  Triggers: Save failed, API error, file too large, duplicate email,
            network error, permission denied

WARNING  bg: #F59E0B  icon: hgi-alert-02
  Triggers: Unsaved changes detected, password about to expire,
            plan limit approaching (80% of orders used)

INFO     bg: #3B82F6  icon: hgi-information-circle
  Triggers: Copied to clipboard, reminder set, email sent,
            scheduled post confirmed, session about to expire
```

## 3.2 Toast Design

```
DESKTOP TOAST:
  ┌─────────────────────────────────────────────┐
  │  [✓]  Lead converted to customer            │  [✕]
  └─────────────────────────────────────────────┘
  Position: fixed bottom-6 right-6
  Width: 360px max, min 260px
  bg: status color (dark — not light)
  text: white
  border-radius: rounded-2xl
  padding: px-5 py-4
  shadow: 0 10px 40px rgba(0,0,0,0.12)
  z-index: 99999 (above everything including Zest)
  
  Icon: 20px, white, left side
  Message: 15px, font-600, white
  Close (✕): 16px, white/70, right side, optional (dismiss button)
  
  Auto-dismiss: 4 seconds (success/info)
                6 seconds (warning/error — needs more read time)
  Manual dismiss: clicking anywhere on toast OR ✕ button
  
  With action button (optional):
  ┌─────────────────────────────────────────────┐
  │  [⚠]  Unsaved changes    [Save now] [✕]    │
  └─────────────────────────────────────────────┘
  Action button: white text, underline, 13px, font-700

MOBILE TOAST:
  Position: fixed bottom-safe-area-inset center (accounts for home bar)
  Width: calc(100% - 32px), centered
  Same height as desktop
  Stacks above mobile bottom nav if present

STACKING (multiple toasts):
  Max 3 toasts visible at once
  Stack upward from bottom-right
  gap-2 between them
  4th toast waits until one dismisses
  
ANIMATION:
  Appear: translateX(100%)→translateX(0) + opacity 0→1, 200ms ease-out
  Dismiss: translateX(0)→translateX(110%) + opacity 1→0, 150ms ease-in
  Mobile: translateY(100%)→translateY(0) appear, reverse dismiss
```

## 3.3 Toast Component Implementation

```typescript
// components/shared/ToastSystem.tsx
// Uses Zustand store for state management

// store/toastStore.ts
interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  action?: { label: string; onClick: () => void }
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

// Usage anywhere in the app:
const { addToast } = useToastStore()

addToast({ type: 'success', message: 'Lead saved successfully' })
addToast({ type: 'error', message: 'Failed to save. Try again.' })
addToast({
  type: 'warning',
  message: 'Unsaved changes',
  action: { label: 'Save now', onClick: handleSave },
  duration: 8000
})
```

## 3.4 When to Use Toast vs Modal vs Inline Error

```
USE TOAST:
  ✓ Action confirmation (saved, deleted, sent)
  ✓ Background operation complete (file uploaded, email sent)
  ✓ Clipboard operations (copied)
  ✓ Real-time events (new lead arrived, payment received)
  ✗ NOT for errors that require user action → use inline error or modal

USE INLINE ERROR (under form field or above form):
  ✓ Form validation errors
  ✓ API errors during form submission
  ✓ Field-level validation (email already exists, invalid format)

USE MODAL:
  ✓ Destructive actions needing confirmation (delete, archive)
  ✓ Complex errors with multiple options
  ✓ Required acknowledgments (terms update)
```

---

# PART 4 — LOADING STATES & SKELETON SYSTEM

## 4.1 Skeleton Component

```
BASE SKELETON:
  bg: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)
  background-size: 200% 100%
  animation: shimmer 1.5s infinite linear
  border-radius: matches the content it replaces

@keyframes shimmer {
  0%   { background-position: 200% 0 }
  100% { background-position: -200% 0 }
}

Tailwind class (custom): 'skeleton'

SKELETON VARIANTS:
  skeleton-text:    height 16px, width varies (60%, 80%, 40%)
  skeleton-title:   height 28px, width 70%
  skeleton-avatar:  width/height 40px, rounded-full
  skeleton-image:   aspect-[16/9], rounded-2xl
  skeleton-button:  height 40px, width 120px, rounded-full
  skeleton-badge:   height 22px, width 60px, rounded-full
```

## 4.2 Skeleton Patterns Per Component

```
POST CARD SKELETON:
  ┌─────────────────────────────┐
  │  [████████████████████████] │  ← image skeleton, aspect 16/9
  ├─────────────────────────────┤
  │  [████] [████]              │  ← badge + read time
  │  [████████████████]         │  ← title line 1
  │  [████████████]             │  ← title line 2
  │  [████████████████████]     │  ← excerpt line
  │  [████████]                 │  ← excerpt line 2
  │  [○] [████████] [████]      │  ← avatar + author + date
  └─────────────────────────────┘
  Show 6 of these in grid while posts load

CRM TABLE SKELETON:
  ┌────┬──────────────┬─────┬──────┬──────┐
  │ ☐  │ [████████]   │[██] │ [██] │ [██] │
  │ ☐  │ [███████████]│[██] │ [██] │ [██] │
  │ ☐  │ [█████████]  │[██] │ [██] │ [██] │
  └────┴──────────────┴─────┴──────┴──────┘
  Show 8 rows while data loads

DASHBOARD STAT CARD SKELETON:
  ┌─────────────────┐
  │  [████████████] │  ← label
  │  [████]         │  ← big number
  │  [███████]      │  ← trend indicator
  └─────────────────┘

SIDEBAR TOC SKELETON:
  [██████████████]
  [████████████████]
  [██████████]
  [████████████████████]
  [████████████]

ZEST CHAT SKELETON:
  Initial load while fetching conversation history:
  [●●●] typing indicator at start
  Replace with history messages once loaded
```

## 4.3 Loading Spinners vs Skeletons

```
USE SKELETON:          Page / list / card data loading (SSR/ISR data)
USE SPINNER:           Action in progress (saving, submitting, uploading)
USE PROGRESS BAR:      File upload, long operation with known progress
USE INLINE "Loading…": Button text replacement while action processes

SPINNER DESIGN:
  Size: 20px default, 16px small, 32px large (page-level)
  Color: coral (#FF5A5F)
  Border: 2px solid coral-light | 2px solid coral (top arc only)
  Animation: rotate 360deg, 700ms linear infinite

  Tailwind:
  className="w-5 h-5 rounded-full border-2 border-coral-light
             border-t-coral animate-spin"

BUTTON LOADING STATE:
  Replace button text with: [Spinner 16px] + "Saving..." (same font)
  Button: disabled, opacity-80, cursor-not-allowed
  Width: fixed (use min-w to prevent layout shift on text change)

  ✓ <button disabled>
      <Spinner size="sm" className="mr-2" />
      Saving...
    </button>
```

---

# PART 5 — GLOBAL SEARCH (CMD+K)

## 5.1 Overview

Available in CRM only (not public website). Keyboard shortcut: `Cmd+K` (Mac) / `Ctrl+K` (Windows).
Also triggered by clicking the search icon (hgi-search-01) in CRM topbar.

## 5.2 Search Modal Design

```
FULL-SCREEN OVERLAY:
  bg: rgba(15,23,42,0.4) backdrop-blur-sm
  Clicking overlay: closes search

SEARCH PANEL:
  Width: 640px, max-width: 90vw
  Position: top-1/4 left-1/2 -translate-x-1/2 (appears in upper third, not center)
  bg: white, rounded-2xl, shadow-modal
  No padding on outer container — sections have their own padding

HEADER (search bar):
  ┌──────────────────────────────────────────────┐
  │ 🔍  Search customers, leads, orders...  [Esc]│
  └──────────────────────────────────────────────┘
  Icon: hgi-search-01, 20px, slate-400, left inside input
  Input: 16px, font-500, no border, full width
  Keyboard shortcut hint: [Esc] badge, top-right
  Auto-focus on open

RESULTS (appear as user types, debounced 200ms):
  ┌──────────────────────────────────────────────┐
  │  CUSTOMERS (3)                               │
  │  [○] Rosewood Cafe       Active   →          │
  │  [○] The Ember Grill     Active   →          │
  │  [○] Cloud Kitchen Co    Churned  →          │
  ├──────────────────────────────────────────────┤
  │  LEADS (2)                                   │
  │  [○] Ahmed Ali           Qualified →         │
  │  [○] Sarah's Bakery      New       →         │
  ├──────────────────────────────────────────────┤
  │  ORDERS (1)                                  │
  │  [○] #ORD-1089  Rosewood Cafe  $149  Paid →  │
  ├──────────────────────────────────────────────┤
  │  TICKETS (1)                                 │
  │  [○] #1067  QR not working  Open  →          │
  └──────────────────────────────────────────────┘

CATEGORY HEADERS:
  11px, font-600, uppercase, tracking-wider, slate-400
  padding: px-4 pt-4 pb-2
  
RESULT ITEM:
  padding: px-4 py-3, hover: bg-surface-alt
  Keyboard: Arrow Up/Down navigates items, Enter opens
  Active item: bg-surface-alt + coral left border 2px
  Click/Enter: navigates to record, closes search

FOOTER (quick tips):
  ┌──────────────────────────────────────────────┐
  │  ↑↓ navigate  ↵ open  Esc close             │
  └──────────────────────────────────────────────┘
  12px, slate-400, border-top border-slate-100
  padding: px-4 py-3

EMPTY RESULTS:
  [hgi-search-01 icon, 40px, slate-300]
  No results for "[query]"
  Try searching by name, email, or ID

RECENT SEARCHES (when input is empty):
  Last 5 searches from localStorage
  "RECENT" header
  Each with hgi-clock-01 icon
  "Clear recent" link at bottom
```

---

# PART 6 — MODAL & DRAWER SYSTEM

## 6.1 Modal (Overlay Dialog)

```
TRIGGER: Destructive actions, confirmations, forms that don't need full page

OVERLAY: bg-slate-900/40 backdrop-blur-sm, z-50
PANEL: bg-white rounded-3xl shadow-modal
       width: 480px default, 560px form modals, 640px complex
       max-height: 80vh, overflow-y: auto
       position: centered (absolute top-1/2 left-1/2 -translate-both)
       padding: p-8

ANIMATION:
  Overlay: opacity 0→1, 150ms ease
  Panel:   opacity 0→1 + scale 0.95→1 + translateY(-8px)→0, 200ms ease-out
  Close:   reverse, 150ms

MODAL ANATOMY:
  ┌──────────────────────────────────────────┐
  │  Modal Title                         [✕] │  ← header, pb-4, border-b
  ├──────────────────────────────────────────┤
  │                                          │
  │  Modal body content here                 │  ← scrollable
  │  (form, confirmation text, etc.)         │
  │                                          │
  ├──────────────────────────────────────────┤
  │                     [Cancel] [Confirm]   │  ← footer, pt-4, border-t
  └──────────────────────────────────────────┘

CLOSE TRIGGERS:
  ✓ ✕ button
  ✓ Escape key
  ✓ Clicking overlay (for non-destructive modals only)
  ✗ Never close on overlay click for: unsaved form, delete confirmations

DELETE CONFIRMATION MODAL:
  Title: "Delete [Item Name]?"
  Body: "This action cannot be undone. [Item description] will be permanently removed."
  Danger icon: hgi-delete-02, 40px, #EF4444 bg soft circle
  Buttons: [Cancel] [Delete permanently] ← "Delete permanently" = red button
  Input confirmation (for critical deletes like deleting a customer):
    "Type DELETE to confirm:" [input field]
    Delete button disabled until "DELETE" typed exactly

Z-INDEX STACK:
  Page content:         0
  Sticky header:        40
  Dropdowns:            50
  Mobile menu:          60
  Zest widget:          9999
  Toast notifications:  99999
  Modals:               100 (above page, below Zest)
  Zest (above modals):  9999
```

## 6.2 Drawer (Slide-Over Panel)

```
USE FOR: Add/edit forms, detail panels, filters panel

DESKTOP DRAWER: Slides from right
  Width: 480px (form), 640px (detail view)
  Position: fixed right-0 top-0 h-full
  bg: white, shadow-[-20px_0_60px_rgba(15,23,42,0.1)]
  Overlay: same as modal overlay
  Animation: translateX(100%)→translateX(0), 250ms ease-out

MOBILE DRAWER: Slides from bottom (bottom sheet)
  Height: 90vh (leaves header visible)
  Drag handle: 40px × 4px rounded pill, bg-slate-200, centered top
  Position: fixed bottom-0 w-full
  border-radius: rounded-t-3xl
  Animation: translateY(100%)→translateY(0), 250ms ease-out
  Can be dragged: snap to 90vh, 50vh, or closed (0)

DRAWER ANATOMY:
  ┌─────────────────────────────────────────┐ ← 60px header
  │  Add New Lead                      [✕] │
  ├─────────────────────────────────────────┤
  │                                         │ ← scrollable body
  │  [Form content]                         │
  │                                         │
  │                                         │
  ├─────────────────────────────────────────┤ ← 72px footer
  │  [Cancel]              [Save Lead →]    │
  └─────────────────────────────────────────┘

FOOTER BUTTONS:
  Always visible (sticky), never scrolls with content
  Cancel: ghost button, slate-700
  Primary action: coral button, full label ("Save Lead", "Update Customer")
```

---

# PART 7 — ONBOARDING FLOW (First-Time User Experience)

## 7.1 Team Member Onboarding

New team member accepts invite → lands on `/accept-invite`:

```
STEP 1 — Set Password:
  ┌─────────────────────────────────────────┐
  │  [Logo]                                 │
  │                                         │
  │  Welcome to Loglime, [Name]!            │
  │  [Name] invited you to join the team.   │
  │                                         │
  │  Set your password                      │
  │  [Password input]                       │
  │  [Confirm password]                     │
  │                                         │
  │  [Create account and continue →]        │
  └─────────────────────────────────────────┘

STEP 2 → Auto-redirect to /crm/dashboard

STEP 3 — First-Visit Tooltips (not modal — inline hints):
  Shows only on FIRST visit (tracked via localStorage key 'loglime_onboarded_crm')
  Tooltip on sidebar: "Your workspace — navigate using this menu"
  Tooltip on first empty section: "Get started by adding your first lead"
  Tooltip dismisses on click anywhere
  "Skip tour" link at top of page
  After all tooltips dismissed: set localStorage key, never show again
```

## 7.2 Restaurant Owner Portal Onboarding

```
First login to portal → brief welcome screen (full page, not modal):

┌─────────────────────────────────────────────────────────┐
│  [Logo]                                                 │
│                                                         │
│  Welcome to your Loglime portal,                        │
│  [Restaurant Name] ✨                                    │
│                                                         │
│  Here's what you can do:                               │
│                                                         │
│  [🚀] Track your project         [View Projects →]     │
│  [📄] Download invoices          [View Invoices →]     │
│  [🎧] Get help from our team     [Open Support →]      │
│  [🤖] Ask Zest anything          [Chat with Zest →]    │
│                                                         │
│  [Go to my dashboard →]                                 │
└─────────────────────────────────────────────────────────┘

Tracked via: profiles.onboarded_at (set on first portal visit)
If profiles.onboarded_at IS NOT NULL → skip this screen
```

---

# PART 8 — ERROR PAGES

## 8.1 404 — Page Not Found

```
Route: app/(marketing)/not-found.tsx

┌─────────────────────────────────────────────────────────┐
│  [Header — full marketing header]                       │
│                                                         │
│                    404                                  │
│  [slate-900, 120px, font-700, tracking-tight]          │
│                                                         │
│  Page not found.                                        │
│  [slate-900, 32px, font-700]                           │
│                                                         │
│  The page you're looking for doesn't exist or           │
│  has been moved. Let's get you back on track.           │
│  [slate-500, 16px]                                     │
│                                                         │
│  [← Go home]  [Browse products]  [Contact us]          │
│                                                         │
│  ─────────────────────────────────────────────          │
│  Or try these:                                          │
│  /products  /pricing  /demo  /faq  /about              │
│                                                         │
└─────────────────────────────────────────────────────────┘

Design note: 404 is coral number, not an illustration.
The number IS the design. No animation. Confident.
```

## 8.2 500 — Server Error

```
Same layout as 404 but:
Number: 500
Title: "Something went wrong."
Body: "Our team has been notified. Please try again in a moment,
      or contact us if the problem persists."
Buttons: [← Go home] [Contact support]
```

## 8.3 CRM Error States

```
NETWORK ERROR (lost connection):
  Full-width coral bar below header:
  [⚠] "No internet connection — changes may not be saved. Retrying..."
  Auto-dismisses when connection restored

SESSION EXPIRED:
  Modal (non-dismissible):
  "Your session has expired for security."
  [Log in again →] button
  No overlay click to dismiss — must log in

PERMISSION DENIED (accessing wrong route for role):
  CRM page with:
  Icon: hgi-lock-01, 48px, slate-300
  "You don't have access to this section."
  "Contact your administrator if you need access."
  [Go to dashboard →]

EMPTY DATABASE STATE (first ever CRM load):
  Dashboard shows all empty state cards
  One prominent CTA card at top:
  "Start by adding your first lead →"
  Links to /crm/leads/new drawer
```

## 8.4 Offline Page (PWA)

```
// public/offline.html — served when service worker detects no connection

Clean page:
  Icon: hgi-wifi-error-01, 64px, slate-300
  "You're offline."
  "Check your internet connection and try again."
  [Try again] → window.location.reload()
```

---

# PART 9 — FORM SYSTEM

## 9.1 Input States

```
DEFAULT:
  border: 1px solid #E2E8F0 (border-strong)
  bg: white
  border-radius: rounded-xl
  padding: px-4 py-3
  font: 15px, font-500, slate-900
  placeholder: slate-400

FOCUSED:
  border: 1.5px solid #FF5A5F (coral)
  outline: none
  box-shadow: 0 0 0 3px rgba(255,90,95,0.1)

FILLED (has value, not focused):
  border: 1px solid #E2E8F0
  bg: white (no change)

ERROR:
  border: 1.5px solid #EF4444
  bg: #FEF2F2 (very subtle)
  box-shadow: 0 0 0 3px rgba(239,68,68,0.1)
  + error message below: 12px, #EF4444, font-500, mt-1

SUCCESS (validated):
  border: 1.5px solid #10B981
  + check icon inside right of input: hgi-checkmark-01, 16px, #10B981

DISABLED:
  bg: #F8FAFC
  border: 1px solid #F1F5F9
  cursor: not-allowed
  text: slate-400

LABEL STYLE:
  Position: ABOVE input (not floating — floating labels fail on autofill)
  font: 13px, font-600, slate-700
  margin-bottom: mb-1.5
  Required marker: coral asterisk (*) after label text, aria-hidden

HELPER TEXT (below input):
  font: 12px, font-500, slate-400
  Position: below input, mt-1
  Do not show helper AND error simultaneously — error replaces helper
```

## 9.2 Form Validation Rules

```
VALIDATE ON:
  ✓ On blur (when user leaves field) — not on every keystroke
  ✓ On submit (catch any unfilled required fields)
  ✗ NOT on every keystroke (annoying, especially for email)
  
  Exception: password strength → validate on keystroke (user needs feedback)

ERROR PLACEMENT:
  ✓ Below the specific field
  ✗ Not in a red box above the entire form
  
  Summary above form ONLY for: 5+ field forms where user might miss errors
  "3 fields need attention" banner → scroll to first error on click

FORM SUBMIT FLOW:
  1. User clicks submit
  2. Client-side validation runs (zod schema)
  3. If errors: show inline errors, focus first errored field, no API call
  4. If valid: button → loading state, API call
  5. If API success: toast success + navigate/close drawer
  6. If API error: toast error (general) + inline error on affected field if specific
```

---

# PART 10 — IMPLEMENTATION PRIORITY (Codex)

```
Build these shared systems FIRST, before any page content.
They are used everywhere — building pages before these = constant rework.

ORDER:
  ☐ 1. Toast system (Zustand store + component)
  ☐ 2. Modal system (overlay + panel + close behavior)
  ☐ 3. Drawer system (desktop right + mobile bottom sheet)
  ☐ 4. Skeleton components (base + variants)
  ☐ 5. Form input states (all 6 states + validation hook)
  ☐ 6. Notification bell (CRM + portal)
  ☐ 7. Global search / Cmd+K (CRM only)
  ☐ 8. Error pages (404, 500, CRM errors)
  ☐ 9. Onboarding screens (team + customer)
  ☐ 10. Zest widget (last — most complex, build on stable foundation)

FOR ZEST SPECIFICALLY:
  ☐ 10a. /api/ai/chat/route.ts (streaming Gemini handler)
  ☐ 10b. Widget bubble (all 5 states)
  ☐ 10c. Chat header + message bubbles
  ☐ 10d. Typing indicator + streaming text
  ☐ 10e. Quick reply chips
  ☐ 10f. Visitor lead capture form
  ☐ 10g. Customer ticket creation flow
  ☐ 10h. Team slash commands
  ☐ 10i. Conversation history (Supabase + localStorage)
  ☐ 10j. Rate limiting + abuse prevention
```