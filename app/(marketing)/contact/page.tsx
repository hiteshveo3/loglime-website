import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Mail, MapPin, MessageSquare, Send } from "lucide-react";
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
    <main>
      <section className="hero">
        <div className="container section-head center">
          <Badge>Contact</Badge>
          <h1 className="display">Talk to the Loglime team.</h1>
          <p className="sub">Sales, rollout, support and partnerships for restaurant app launches.</p>
        </div>
      </section>
      <section className="nex-section nex-section-white">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="grid-1" style={{ display: "grid", gap: 18 }}>
            {contacts.map(({ title, copy, Icon }, index) => (
              <article
                className="nex-soft-card"
                key={title}
                style={{ "--card-glow": index === 0 ? "rgba(131, 231, 238, 0.34)" : "rgba(198, 245, 111, 0.24)" } as CSSProperties}
              >
                <span className="feature-icon">
                  <Icon size={22} />
                </span>
                <h2>{title}</h2>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <form className="nex-form-card">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <Badge>Project inquiry</Badge>
              <h2 className="h2">Tell us about the restaurant app you want to sell.</h2>
              <p className="body">Share the restaurant type, first app package and launch timeline. We will help map the cleanest rollout.</p>
            </div>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input className="input" id="name" placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input className="input" id="email" placeholder="you@company.com" type="email" />
            </div>
            <div className="field">
              <label htmlFor="message">What do you want to launch?</label>
              <textarea className="textarea" id="message" placeholder="Digital menu, ordering app, bookings, loyalty..." />
            </div>
            <button className="btn btn-primary" type="button">
              Send message <Send size={16} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
