"use client";

import { useState } from "react";

import { Button, Card, Input, PageHeader, Select, Textarea, useToast } from "@/components/ui";

export function SettingsClient() {
  const { showToast } = useToast();
  const [companyName, setCompanyName] = useState("Loglime");
  const [email, setEmail] = useState("team@loglime.com");
  const [timezone, setTimezone] = useState("UTC");
  const [language, setLanguage] = useState("en");
  const [notifyLeadCreated, setNotifyLeadCreated] = useState(true);
  const [notifyTicketCreated, setNotifyTicketCreated] = useState(true);
  const [notifyProjectUpdates, setNotifyProjectUpdates] = useState(true);
  const [notifyDailyDigest, setNotifyDailyDigest] = useState(false);
  const [apiKey, setApiKey] = useState("••••••••••••••••");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSave = (section: string) => {
    showToast({ title: `${section} saved successfully`, tone: "success" });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage company, team, and workspace preferences." />

      {/* Company Info */}
      <Card>
        <h2 className="text-h4 text-text-primary">Company Information</h2>
        <p className="mt-1 text-small text-text-muted">Update your company details and branding.</p>
        <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); handleSave("Company info"); }}>
          <Input label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Select
            label="Timezone"
            value={timezone}
            options={[
              { label: "UTC", value: "UTC" },
              { label: "EST (UTC-5)", value: "EST" },
              { label: "CST (UTC-6)", value: "CST" },
              { label: "MST (UTC-7)", value: "MST" },
              { label: "PST (UTC-8)", value: "PST" },
              { label: "IST (UTC+5:30)", value: "IST" },
              { label: "GST (UTC+4)", value: "GST" },
            ]}
            onChange={(e) => setTimezone(e.target.value)}
          />
          <Select
            label="Language"
            value={language}
            options={[
              { label: "English", value: "en" },
              { label: "Hindi", value: "hi" },
              { label: "Spanish", value: "es" },
              { label: "French", value: "fr" },
              { label: "German", value: "de" },
            ]}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <div className="sm:col-span-2">
            <Button type="submit" onClick={() => handleSave("Company info")}>Save Changes</Button>
          </div>
        </form>
      </Card>

      {/* Notifications */}
      <Card>
        <h2 className="text-h4 text-text-primary">Email Notifications</h2>
        <p className="mt-1 text-small text-text-muted">Choose what your team gets notified about.</p>
        <div className="mt-5 space-y-4">
          {[
            { label: "New Lead Created", description: "Team gets notified when a new lead is added to the system.", value: notifyLeadCreated, onChange: setNotifyLeadCreated },
            { label: "Support Ticket Created", description: "Alert team when new customer support tickets are created.", value: notifyTicketCreated, onChange: setNotifyTicketCreated },
            { label: "Project Updates", description: "Notify team members when there are project status updates.", value: notifyProjectUpdates, onChange: setNotifyProjectUpdates },
            { label: "Daily Digest", description: "Receive a summary of activities and metrics every morning.", value: notifyDailyDigest, onChange: setNotifyDailyDigest },
          ].map(({ label, description, value, onChange }) => (
            <label key={label} className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border p-4 transition hover:border-coral hover:bg-coral-light">
              <div>
                <p className="text-small font-semibold text-text-primary">{label}</p>
                <p className="mt-0.5 text-caption text-text-muted">{description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={value}
                onClick={() => onChange(!value)}
                className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${value ? "bg-coral" : "bg-surface-elevated"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </label>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={() => handleSave("Notification preferences")}>Save Preferences</Button>
        </div>
      </Card>

      {/* API Keys */}
      <Card>
        <h2 className="text-h4 text-text-primary">API Keys</h2>
        <p className="mt-1 text-small text-text-muted">Manage API keys for integrations and automations.</p>
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-border p-4">
            <div>
              <p className="text-small font-semibold text-text-primary">Default API Key</p>
              <p className="mt-1 font-mono text-small text-text-muted">{showApiKey ? "loglime_sk_live_1234567890abcdef" : apiKey}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setShowApiKey(!showApiKey)}>
                <i className={`hgi-stroke ${showApiKey ? "hgi-hide-01" : "hgi-show-01"}`} />
                {showApiKey ? "Hide" : "Show"}
              </Button>
              <Button variant="secondary" onClick={() => showToast({ title: "API Key copied to clipboard", tone: "success" })}>
                <i className="hgi-stroke hgi-copy-01" />Copy
              </Button>
            </div>
          </div>
          <Button variant="secondary" className="w-full border-status-warningSoft text-status-warning hover:bg-status-warningSoft">
            <i className="hgi-stroke hgi-refresh-cw-01" />Regenerate Key
          </Button>
        </div>
      </Card>

      {/* Team Members */}
      <Card>
        <h2 className="text-h4 text-text-primary">Team Members</h2>
        <p className="mt-1 text-small text-text-muted">Invite and manage team member access and roles.</p>
        <div className="mt-5">
          <div className="mb-4 flex gap-2">
            <Input className="flex-1" placeholder="Enter email address" type="email" />
            <Button onClick={() => showToast({ title: "Invite sent to team member", tone: "success" })}>
              <i className="hgi-stroke hgi-add-01" />Invite
            </Button>
          </div>
          <div className="space-y-2">
            {[
              { name: "Hitesh", email: "hitesh@loglime.com", role: "Admin" },
              { name: "Sameer", email: "sameer@loglime.com", role: "Editor" },
              { name: "Team Member", email: "member@loglime.com", role: "Viewer" },
            ].map((member) => (
              <div key={member.email} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-light text-small font-bold text-coral">
                    {member.name[0]}
                  </div>
                  <div>
                    <p className="text-small font-semibold text-text-primary">{member.name}</p>
                    <p className="text-caption text-text-muted">{member.email}</p>
                  </div>
                </div>
                <Select
                  value={member.role}
                  options={[
                    { label: "Admin", value: "Admin" },
                    { label: "Editor", value: "Editor" },
                    { label: "Viewer", value: "Viewer" },
                  ]}
                  onChange={() => handleSave("Team member role")}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Integrations */}
      <Card>
        <h2 className="text-h4 text-text-primary">Integrations</h2>
        <p className="mt-1 text-small text-text-muted">Connect third-party tools and services.</p>
        <div className="mt-5 space-y-3">
          {[
            { name: "Slack", description: "Send notifications to Slack channels", icon: "hgi-message-circle-01", connected: true },
            { name: "Stripe", description: "Sync payments and billing", icon: "hgi-wallet-01", connected: true },
            { name: "Google Calendar", description: "Sync meetings and events", icon: "hgi-calendar-01", connected: false },
            { name: "Gmail", description: "Sync emails and conversations", icon: "hgi-mail-01", connected: false },
          ].map((integration) => (
            <div key={integration.name} className="flex items-center justify-between rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-alt text-xl text-text-secondary">
                  <i className={`hgi-stroke ${integration.icon}`} />
                </div>
                <div>
                  <p className="text-small font-semibold text-text-primary">{integration.name}</p>
                  <p className="text-caption text-text-muted">{integration.description}</p>
                </div>
              </div>
              <Button variant={integration.connected ? "secondary" : "primary"} onClick={() => showToast({ title: `${integration.name} connection ${integration.connected ? "disconnected" : "connected"}`, tone: "success" })}>
                {integration.connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Danger Zone */}
      <Card>
        <h2 className="text-h4 text-text-primary">Danger Zone</h2>
        <p className="mt-1 text-small text-text-muted">Irreversible and destructive actions.</p>
        <div className="mt-5">
          <button
            onClick={() => showToast({ title: "Contact support to export your data", tone: "warning" })}
            className="flex w-full items-center justify-between rounded-xl border border-status-warningSoft bg-status-warningSoft/20 p-4"
          >
            <div className="text-left">
              <p className="text-small font-semibold text-text-primary">Export Data</p>
              <p className="text-caption text-text-muted">Download all your data as a CSV file.</p>
            </div>
            <i className="hgi-stroke hgi-download-01 text-status-warning" />
          </button>
          <button
            onClick={() => showToast({ title: "Contact support to delete your workspace", tone: "error" })}
            className="mt-3 flex w-full items-center justify-between rounded-xl border border-status-errorSoft bg-status-errorSoft/20 p-4"
          >
            <div className="text-left">
              <p className="text-small font-semibold text-status-error">Delete Workspace</p>
              <p className="text-caption text-text-muted">Permanently delete this workspace and all data.</p>
            </div>
            <i className="hgi-stroke hgi-trash-01 text-status-error" />
          </button>
        </div>
      </Card>
    </div>
  );
}
