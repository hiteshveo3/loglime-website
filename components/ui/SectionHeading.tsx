import { clsx } from "clsx";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  center?: boolean;
};

export function SectionHeading({ eyebrow, title, children, center = false }: SectionHeadingProps) {
  return (
    <div className={clsx("section-head", center && "center")}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="h2">{title}</h2>
      {children ? <p className="sub">{children}</p> : null}
    </div>
  );
}
