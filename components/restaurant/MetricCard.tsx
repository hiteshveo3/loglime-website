type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
};

export function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <div className="metric-card card">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
      <span className="body">{detail}</span>
    </div>
  );
}
