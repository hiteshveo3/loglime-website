import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  inverse?: boolean;
};

export function Logo({ href = "/", inverse = false }: LogoProps) {
  const logo = (
    <span className="brand brand-full">
      <Image
        alt="Loglime"
        className="brand-logo-img"
        height={48}
        priority
        src={inverse ? "/brand/logo-white-cropped.png" : "/brand/logo-jade-cropped.png"}
        width={164}
      />
    </span>
  );

  if (!href) {
    return logo;
  }

  return <Link href={href}>{logo}</Link>;
}
