import Link from "next/link";

type LogoProps = {
  href?: string;
  inverse?: boolean;
};

export function Logo({ href = "/", inverse = false }: LogoProps) {
  const logo = (
    <span className={inverse ? "brand brand-inverse" : "brand"}>
      <span className="brand-dot-mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="brand-word">Loglime</span>
    </span>
  );

  if (!href) {
    return logo;
  }

  return <Link href={href}>{logo}</Link>;
}
