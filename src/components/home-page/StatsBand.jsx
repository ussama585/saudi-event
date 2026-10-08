const stats = [
  ["2,000+", "Attendees"],
  ["50+", "Visionary speakers"],
  ["30+", "Insightful sessions"],
  ["3", "Days of possibility"],
];

export default function StatsBand() {
  return (
    <section className="stats-band" aria-label="Summit at a glance">
      <div className="container stats-grid">
        {stats.map(([number, label], index) => (
          <div className="stat" key={number}>
            <span className="stat-number">
              {number}
              <span className="stat-dot">
                {index === 3 ? " days" : ""}
              </span>
            </span>

            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
