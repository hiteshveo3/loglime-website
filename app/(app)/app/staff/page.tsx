import { Plus } from "lucide-react";
import { AppTopbar } from "@/components/app-shell/AppTopbar";
import { staffMembers } from "@/lib/restaurant/data";

export default function StaffPage() {
  return (
    <>
      <AppTopbar
        title="Staff and roles"
        subtitle="Owner, manager, server, kitchen and cashier access."
        actions={
          <button className="btn btn-primary btn-sm">
            <Plus size={15} />
            Invite staff
          </button>
        }
      />
      <div className="app-content">
        <div className="card card-pad">
          <div className="menu-list">
            {staffMembers.map((member) => (
              <div className="menu-row" key={member.id}>
                <div>
                  <strong>{member.name}</strong>
                  <p className="body">{member.email}</p>
                </div>
                <span className="pill">{member.role}</span>
                <span className={`badge ${member.status === "active" ? "badge-teal" : "badge-amber"}`}>
                  <span className="badge-dot" />
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
