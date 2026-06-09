import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { createMetadata, routeMeta } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/contact"));

const contacts = [
  { title: "Sales", copy: "hello@loglime.com", Icon: Mail },
  { title: "Support", copy: "support@loglime.com", Icon: MessageSquare },
  { title: "Locations", copy: "Remote-first, global rollout", Icon: MapPin }
];

export default function ContactPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="section-head center">
          <Badge>Contact</Badge>
          <h1 className="display">Talk to the Loglime team.</h1>
          <p className="sub">Sales, rollout, support and partnerships for restaurant operators.</p>
        </div>
        <div className="grid-3">
          {contacts.map(({ title, copy, Icon }) => (
            <article className="card card-pad" key={title}>
              <Icon size={22} color="var(--primary)" />
              <h2 className="h3">{title}</h2>
              <p className="body">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
