export function SkeletonCard() {
  return (
    <div className="stat-card">
      <div className="skeleton" style={{ width: '60%', height: 14, marginBottom: 8 }} />
      <div className="skeleton" style={{ width: '80%', height: 32 }} />
    </div>
  );
}
