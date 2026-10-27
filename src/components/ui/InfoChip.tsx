type InfoChipProps = { label: string; value: string };

export function InfoChip({ label, value }: InfoChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-chip bg-surface-2 px-2.5 py-1.5 text-label-sm">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-text">{value}</span>
    </span>
  );
}
