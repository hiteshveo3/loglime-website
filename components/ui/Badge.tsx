import { clsx } from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "default" | "coral" | "teal" | "blue" | "amber" | "purple";
};

const toneClass = {
  default: "",
  coral: "badge-coral",
  teal: "badge-teal",
  blue: "badge-blue",
  amber: "badge-amber",
  purple: "badge-purple"
};

export function Badge({ children, tone = "default" }: BadgeProps) {
  return (
    <span className={clsx("badge", toneClass[tone])}>
      <span className="badge-dot" />
      {children}
    </span>
  );
}
