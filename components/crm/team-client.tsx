"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Badge, Button, Card, Drawer, Input, PageHeader, Select, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type TeamMember = {
  id: string; name: string; email: string | null; role: string | null;
  status: string | null; avatar_url: string | null;
};

export function TeamClient() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("team_members").select("*").order("name", { ascending: true });
      return (data ?? []) as TeamMember[];
    },
  });

  const inviteMutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { error } = await supabase.from("team_members").insert({ email, role, status: "invited" } as any);
      if (error) throw error;
    },
    onSuccess: async () => {
      setInviteOpen(false); setEmail(""); setRole("editor");
      await queryClient.invalidateQueries({ queryKey: ["team-members"] });
      showToast({ title: "Invitation sent", description: `Sent to ${email}`, tone: "success" });
    },
    onError: () => showToast({ title: "Could not send invitation", tone: "error" }),
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ memberId, newRole }: { memberId: string; newRole: string }) => {
      const supabase = createClient();
      // @ts-ignore
      const { error } = await supabase.from("team_members").update({ role: newRole }).eq("id", memberId);
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["team-members"] });
      showToast({ title: "Role updated", tone: "success" });
    },
  });

  const removeMemberMutation = useMutation({
    mutationFn: async (memberId: string) => {
      const supabase = createClient();
      const { error } = await supabase.from("team_members").delete().eq("id", memberId);
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["team-members"] });
      showToast({ title: "Member removed", tone: "success" });
    },
  });

  if (isLoading) return <div className="space-y-5"><PageHeader title="Team" subtitle="Manage team members and permissions." /><div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-100" />)}</div></div>;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Team"
        subtitle="Manage team members and permissions."
        actions={
          <Button onClick={() => setInviteOpen(true)}>
            <i className="hgi-stroke hgi-add-01" />Invite Member
          </Button>
        }
      />

      <Card>
        <div className="space-y-3">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral-light text-small font-bold text-coral">
                  {member.name?.[0] ?? "?"}
                </div>
                <div>
                  <p className="text-small font-semibold text-text-primary">{member.name || "Unknown"}</p>
                  <p className="text-caption text-text-muted">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={member.role ?? ""}
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "Editor", value: "editor" },
                    { label: "Viewer", value: "viewer" },
                  ]}
                  onChange={(e) => updateRoleMutation.mutate({ memberId: member.id, newRole: e.target.value })}
                />
                <Badge tone={member.status === "active" ? "success" : "neutral"}>{member.status ?? "pending"}</Badge>
                <Button variant="secondary" onClick={() => removeMemberMutation.mutate(member.id)} isLoading={removeMemberMutation.isPending}>
                  <i className="hgi-stroke hgi-trash-01" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Drawer open={inviteOpen} title="Invite Team Member" onClose={() => setInviteOpen(false)}>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); inviteMutation.mutate(); }}>
          <Input label="Email" type="email" placeholder="team@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Select
            label="Role"
            value={role}
            options={[
              { label: "Admin", value: "admin" },
              { label: "Editor", value: "editor" },
              { label: "Viewer", value: "viewer" },
            ]}
            onChange={(e) => setRole(e.target.value)}
          />
          <Button className="w-full" type="submit" isLoading={inviteMutation.isPending}>Send Invitation</Button>
        </form>
      </Drawer>
    </div>
  );
}
