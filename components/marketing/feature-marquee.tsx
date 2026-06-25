"use client";

const items = [
  { icon: "hgi-percent-circle", label: "Commission-Free Ordering" },
  { icon: "hgi-paint-brush-01", label: "Fully Branded App" },
  { icon: "hgi-rocket-01", label: "Live in 7–14 Days" },
  { icon: "hgi-chart-bar-line", label: "Own Your Customer Data" },
  { icon: "hgi-notification-01", label: "Push Notifications" },
  { icon: "hgi-shopping-cart-01", label: "Online Direct Ordering" },
  { icon: "hgi-gift", label: "Loyalty & Rewards" },
  { icon: "hgi-qr-code", label: "QR Scan-to-Order" },
];

export function FeatureMarquee() {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-white py-4">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; width: max-content; animation: marquee 24s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap px-8 text-small font-semibold text-text-secondary">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coral-soft text-coral">
              <i className={`hgi-stroke ${item.icon} text-sm`} />
            </span>
            {item.label}
            <span className="ml-4 h-1 w-1 rounded-full bg-coral/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
