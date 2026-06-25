import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  href?: string;
  inverse?: boolean;
};

export function Logo({ href = "/", inverse = false }: LogoProps) {
  const logo = (
    <span className={inverse ? "brand brand-inverse" : "brand"}>
      <Image
        alt="Loglime"
        className="brand-image"
        height={78}
        priority
        src="/logo.svg"
        width={300}
      />
    </span>
  );

  if (!href) {
    return logo;
  }

  return <Link href={href}>{logo}</Link>;
}
