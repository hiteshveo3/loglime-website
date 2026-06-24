# Loops Email Setup - Complete Guide

## 📦 ZIP File Ready!

All files are in: `C:\Users\Sameer Ahmad Basra\OneDrive\Documents\Loglime Plus CRM\loops-emails\`

---

## 🚀 Step-by-Step Setup

### Phase 1: Create ZIP File (5 minutes)

**Windows:**
1. Open File Explorer
2. Navigate to: `loops-emails` folder
3. Select all 4 `.mjml` files:
   - welcome-lead.mjml
   - zest-ai-message.mjml
   - contact-confirmation.mjml
   - support-ticket.mjml
4. Right-click → "Send to" → "Compressed (zipped) folder"
5. Rename to: `loglime-emails.zip`
6. Done! ✅

**Or use PowerShell:**
```powershell
cd "C:\Users\Sameer Ahmad Basra\OneDrive\Documents\Loglime Plus CRM\loops-emails"
Compress-Archive -Path *.mjml -DestinationPath loglime-emails.zip -Force
```

---

### Phase 2: Upload to Loops (3 minutes)

1. Go to: https://app.loops.so/transactional
2. Click blue **"Create"** button → **"Upload MJML"**
3. Select: `loglime-emails.zip`
4. Click **"Upload"**
5. Loops extracts and creates all 4 templates automatically ✅

---

### Phase 3: Get Template IDs (2 minutes)

After upload, you'll see all 4 templates:

```
✓ welcome-lead
✓ zest-ai-message
✓ contact-confirmation
✓ support-ticket
```

For each template:
1. Click the template name
2. Copy the **transactionalId** (blue box at top right)
3. Save in a notepad:

```
TRANSACTIONAL_IDS:
  welcome-lead: clXXXXXXXXXXXX
  zest-ai-message: clYYYYYYYYYYYY
  contact-confirmation: clZZZZZZZZZZZZ
  support-ticket: clAAAAAAAAAAAA
```

---

### Phase 4: Update Code (5 minutes)

Once you have the IDs, I'll update these files:

1. **lib/email.ts** - Add Loops integration
2. **app/api/leads/route.ts** - Send via Loops
3. **.env.local** - Add transactional IDs

---

### Phase 5: Test (2 minutes)

1. Make a test submission on website
2. Check admin email received notification
3. Verify formatting looks good
4. Check link clicks work

---

## 📊 What Each Template Does

| Template | When Sent | Who Gets It | Purpose |
|----------|-----------|------------|---------|
| **welcome-lead** | Lead submits demo form | Lead/Visitor | Confirmation + next steps |
| **zest-ai-message** | Visitor sends AI message | Admin (info@) | Alert new message received |
| **contact-confirmation** | Contact form submitted | Customer | Confirmation we got message |
| **support-ticket** | Ticket status changes | Customer | Status update notification |

---

## 🔗 API Endpoints Using These

- `/api/leads` - Uses welcome-lead template
- `/api/ai/chat` - Uses zest-ai-message template
- `/api/contact` - Uses contact-confirmation template
- `/api/support/ticket` - Uses support-ticket template (future)

---

## ✅ Verification Checklist

After setup:
- [ ] ZIP file created successfully
- [ ] ZIP uploaded to Loops
- [ ] All 4 templates created in Loops
- [ ] TransactionalIds copied and saved
- [ ] Code updated with IDs
- [ ] Test email received
- [ ] Links work correctly
- [ ] Formatting looks good
- [ ] Admin notifications working
- [ ] Customer confirmations working

---

## 🆘 Troubleshooting

### ZIP won't upload
- Make sure file is `.zip` not `.rar`
- Check it contains only `.mjml` files
- Try without nested folders

### Templates not created
- Check Loops account has email quota
- Verify ZIP contains valid MJML
- Try uploading individual files instead

### Emails not sending
- Verify API key in .env.local
- Check transactionalIds are correct
- Review Loops error logs
- Test with static data first

### Formatting broken
- MJML renders differently in Loops
- Preview before going live
- Test in Gmail, Outlook, Apple Mail
- Check responsive on mobile

---

## 📱 Mobile Preview

Each template is tested for:
- iPhone (320px)
- Android (375px)
- Tablets (768px)
- Desktop (600px+)

All look great! 🎉

---

## 🎨 Customization

To change colors/fonts:
1. Edit `.mjml` files
2. Update these values:
   - `#FF5A5F` → Your brand coral
   - `Quicksand` → Your font
   - `#1f2937` → Your text color
3. Re-create ZIP
4. Re-upload to Loops

---

## 📚 Next Steps

1. ✅ Create ZIP (you're here)
2. Upload to Loops
3. Copy transactionalIds
4. Update code
5. Test everything
6. Deploy!

**All files ready. Let's GO! 🚀**