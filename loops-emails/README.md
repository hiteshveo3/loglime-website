# Loglime Transactional Email Templates for Loops

Complete MJML email templates for Loglime CRM, branded with coral (#FF5A5F) and professional design.

## 📧 Templates Included

### 1. **welcome-lead.mjml**
- **Purpose**: Welcome email for new leads who sign up for demo
- **Subject**: Dynamic (set in Loops)
- **Data Variables**: None required (static template)
- **Use Case**: Lead capture/demo signup confirmation

### 2. **zest-ai-message.mjml**
- **Purpose**: Notification for admin when visitor messages via Zest AI
- **Data Variables**:
  - `{DATA_VARIABLE:visitorName}` - Name of the visitor
  - `{DATA_VARIABLE:message}` - The visitor's message
- **Use Case**: AI chat notifications
- **Button Link**: https://app.loglime.com/dashboard

### 3. **contact-confirmation.mjml**
- **Purpose**: Customer confirmation for contact form submissions
- **Data Variables**:
  - `{DATA_VARIABLE:firstName}` - Customer's first name
  - `{DATA_VARIABLE:subject}` - Contact subject
- **Use Case**: Contact form follow-up
- **Note**: Reply-to address set automatically by Loops

### 4. **support-ticket.mjml**
- **Purpose**: Support ticket update notifications
- **Data Variables**:
  - `{DATA_VARIABLE:ticketId}` - Support ticket ID
  - `{DATA_VARIABLE:status}` - Ticket status (open/resolved/pending)
  - `{DATA_VARIABLE:supportLink}` - Link to ticket dashboard
- **Use Case**: Support ticket notifications
- **Button Link**: Dynamic via `supportLink` variable

---

## 🎨 Design Standards

- **Font Family**: Quicksand + System fallbacks
- **Primary Color**: Coral (#FF5A5F)
- **Background**: Light gray (#f9fafb)
- **Text Color**: Dark gray (#1f2937)
- **Footer**: Gray (#6b7280)
- **Border Radius**: 24px for buttons, 8px for boxes
- **Padding**: 40px for main sections, 30px for content

---

## 📤 How to Upload to Loops

### Step 1: Create ZIP File
1. Select all 4 `.mjml` files
2. Right-click → Send to → Compressed (zipped) folder
3. Name it: `loglime-emails.zip`

### Step 2: Upload to Loops
1. Go to https://app.loops.so/transactional
2. Click "New transactional email"
3. Click "Upload MJML file"
4. Select the ZIP file
5. Loops will extract and create templates

### Step 3: Configure in Loops
1. For each template, Loops will generate a `transactionalId`
2. Save these IDs (you'll need them in code)
3. Set up data variables in Loops dashboard for each template

---

## 🔧 Integration with Code

### Using Loops SMTP (Alternative to Zoho)

**In .env.local:**
```
LOOPS_API_KEY=your-loops-api-key
LOOPS_SMTP_HOST=smtp.loops.so
LOOPS_SMTP_PORT=587
LOOPS_SMTP_USER=loops
LOOPS_SMTP_PASSWORD=your-loops-api-key
```

### Using Loops REST API

**Send transactional email:**
```javascript
const response = await fetch('https://app.loops.so/api/v1/transactional/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    transactionalId: 'clXXXXXXX', // From Loops dashboard
    email: 'visitor@example.com',
    dataVariables: {
      firstName: 'John',
      subject: 'Your inquiry'
    }
  })
});
```

---

## 📋 Data Variables Reference

| Template | Variable | Example | Required |
|----------|----------|---------|----------|
| welcome-lead | None | - | No |
| zest-ai-message | visitorName | "John Smith" | Yes |
| zest-ai-message | message | "How much does..." | Yes |
| contact-confirmation | firstName | "John" | Yes |
| contact-confirmation | subject | "Pricing inquiry" | Yes |
| support-ticket | ticketId | "TKT-12345" | Yes |
| support-ticket | status | "open" | Yes |
| support-ticket | supportLink | "https://app.loglime.com/ticket/12345" | Yes |

---

## ✅ Responsive Design

All templates are fully responsive:
- ✓ Desktop (600px width)
- ✓ Tablet (400px+ width)
- ✓ Mobile (320px width)
- ✓ Dark mode compatible
- ✓ Retina display ready

---

## 🎯 Testing

### Preview in Loops
1. After uploading, Loops provides a preview
2. Test with sample data variables
3. Check rendering on different clients (Gmail, Outlook, Apple Mail)

### Test Emails
Loops allows sending test emails to verify formatting before going live.

---

## 📞 Support

For Loops documentation: https://loops.so/docs
For MJML reference: https://mjml.io/documentation

---

**Created**: 2026-06-24
**Version**: 1.0
**Brand**: Loglime LLC
**© 2026 Loglime LLC. All rights reserved.**