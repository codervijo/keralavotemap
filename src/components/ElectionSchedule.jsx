import schedule from '../data/schedule2026.json';

const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

const fmtCrore = (n) => `${(n / 1e7).toFixed(2)} cr`;

function isTodayOrPast(iso) {
  return new Date(iso) <= new Date();
}

function isUpcoming(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = d - now;
  return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000; // within 7 days
}

export default function ElectionSchedule() {
  return (
    <section className="schedule-section">
      <div className="schedule-header">
        <div>
          <h2 className="schedule-title">{schedule.overview.title}</h2>
          <p className="schedule-sub">
            Single Phase &nbsp;·&nbsp; {schedule.overview.constituencies} Constituencies
            &nbsp;·&nbsp; Majority: {schedule.overview.seatsForMajority} seats
          </p>
        </div>
        <div className="voter-stats">
          <div className="vstat">
            <span className="vstat-n">{fmtCrore(schedule.voters.total)}</span>
            <span className="vstat-l">Total Voters</span>
          </div>
          <div className="vstat">
            <span className="vstat-n">{fmtCrore(schedule.voters.male)}</span>
            <span className="vstat-l">Male</span>
          </div>
          <div className="vstat">
            <span className="vstat-n">{fmtCrore(schedule.voters.female)}</span>
            <span className="vstat-l">Female</span>
          </div>
          <div className="vstat">
            <span className="vstat-n">{schedule.voters.transgender}</span>
            <span className="vstat-l">Transgender</span>
          </div>
        </div>
      </div>

      <ol className="timeline">
        {schedule.dates.map((item) => {
          const past     = isTodayOrPast(item.date);
          const upcoming = isUpcoming(item.date);
          return (
            <li
              key={item.event}
              className={[
                'tl-item',
                item.highlight ? 'tl-item--highlight' : '',
                past           ? 'tl-item--past'      : '',
                upcoming       ? 'tl-item--upcoming'  : '',
              ].filter(Boolean).join(' ')}
            >
              <span className="tl-dot" />
              <div className="tl-body">
                <span className="tl-event">{item.event}</span>
                <span className="tl-date">{fmt(item.date)}</span>
                {upcoming && <span className="tl-badge">Soon</span>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
