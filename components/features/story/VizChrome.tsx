export function VizChrome({
  title,
  badge,
}: {
  title: string;
  badge: string;
}) {
  return (
    <div className="pfs-viz-chrome">
      <span className="pfs-viz-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="pfs-viz-title">{title}</span>
      <span className="pfs-viz-badge">{badge}</span>
    </div>
  );
}
