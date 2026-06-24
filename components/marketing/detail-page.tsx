import Image from "next/image";

import { Badge, Button, Card } from "@/components/ui";
import type { DetailPage } from "@/lib/seo-pages";

const pageImages: Record<string, { src: string; alt: string }> = {
  "online-ordering": { src: "/images/loglime/online-ordering-system-loglime.webp", alt: "Loglime online ordering system" },
  "digital-menu": { src: "/images/loglime/digital-menu-loglime.webp", alt: "Loglime digital menu interface" },
  "table-booking": { src: "/images/loglime/table-booking-apps-loglime.webp", alt: "Loglime table booking app" },
  loyalty: { src: "/images/loglime/loyalty-and-offers-loglime.webp", alt: "Loglime loyalty and offers" },
  "qr-menu": { src: "/images/loglime/qr-launch-channels-loglime.webp", alt: "Loglime QR launch channels" },
  "restaurant-app": { src: "/images/loglime/online-ordering-system-loglime.webp", alt: "Loglime branded restaurant app" },
};

export function DetailPageView({ page, kind }: { page: DetailPage; kind: "Product" | "Solution" }) {
  const image = pageImages[page.slug] ?? pageImages["online-ordering"];

  return (
    <main className="bg-surface-alt">
      <section className="mx-auto max-w-page px-4 py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <Badge tone="info">{kind}</Badge>
            <h1 className="mt-4 text-h1 text-text-primary">{page.h1}</h1>
            <p className="mt-4 text-body text-text-secondary">{page.description}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChildHack="a" href="/demo">
                Book a demo
              </Button>
              <Button asChildHack="a" href="/pricing" variant="secondary">
                See pricing
              </Button>
            </div>
            {kind === "Product" ? (
              <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-card">
                <div className="relative aspect-[4/3]">
                  <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(min-width: 1024px) 420px, 100vw" priority />
                </div>
              </div>
            ) : null}
          </div>
          <div className="space-y-5">
            {page.sections.map((section) => (
              <Card key={section.h2}>
                <h2 className="text-h2 text-text-primary">{section.h2}</h2>
                <p className="mt-3 text-body text-text-secondary">{section.body}</p>
                {section.h3?.length ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.h3.map((item) => (
                      <h3 key={item} className="rounded-2xl bg-surface-alt p-4 text-h4 text-text-primary">
                        {item}
                      </h3>
                    ))}
                  </div>
                ) : null}
              </Card>
            ))}
            <Card>
              <h2 className="text-h2 text-text-primary">Related links</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {page.related.map((link) => (
                  <a key={link.href} className="rounded-full bg-coral-light px-4 py-2 text-small font-semibold text-coral" href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
