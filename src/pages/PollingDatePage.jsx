import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import schedule from '../data/schedule2026.json';

const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

const fmtCrore = (n) => `${(n / 1e7).toFixed(2)} crore`;

export default function PollingDatePage() {
  const pollingItem = schedule.dates.find((d) => d.event === 'Polling Day');
  const countingItem = schedule.dates.find((d) => d.event === 'Counting of Votes');

  return (
    <>
      <SEOHead
        title="Kerala Election Polling Date 2026 — 9 April 2026"
        description="Kerala Assembly Election 2026 polling date is 9 April 2026. Counting of votes is on 4 May 2026. See the complete election schedule, key dates, and voter statistics."
        path="/kerala-polling-date-2026"
      />

      <div className="page-shell">
        <header className="page-hero">
          <div className="page-hero__inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">Polling Date 2026</span>
            </nav>
            <h1>Kerala Election Polling Date 2026</h1>
            <p className="page-hero__sub">
              Polling: 9 April 2026 · Counting: 4 May 2026
            </p>
          </div>
        </header>

        <main className="page-main">
          <p className="page-intro">
            The <strong>2026 Kerala Legislative Assembly Election</strong> will be held on{' '}
            <strong>9 April 2026 (Thursday)</strong> in a single phase across all 140
            constituencies. The election schedule was announced by the Election Commission of
            India (ECI) on 15 March 2026. The Model Code of Conduct came into effect on the
            same day. Counting of votes will take place on <strong>4 May 2026</strong>, and
            the election process must be completed by 6 May 2026 — ahead of the current
            Assembly&rsquo;s tenure expiry on 23 May 2026. Kerala has over{' '}
            <strong>{fmtCrore(schedule.voters.total)}</strong> registered voters, including{' '}
            {fmtCrore(schedule.voters.male)} male,{' '}
            {fmtCrore(schedule.voters.female)} female, and{' '}
            {schedule.voters.transgender} transgender voters.
          </p>

          {pollingItem && countingItem && (
            <section className="page-section">
              <h2>Key Dates at a Glance</h2>
              <div className="key-dates">
                <div className="key-date key-date--poll">
                  <div className="key-date__label">Polling Day</div>
                  <div className="key-date__value">{fmt(pollingItem.date)}</div>
                </div>
                <div className="key-date key-date--count">
                  <div className="key-date__label">Counting of Votes</div>
                  <div className="key-date__value">{fmt(countingItem.date)}</div>
                </div>
              </div>
            </section>
          )}

          <section className="page-section">
            <h2>Complete Election Schedule</h2>
            <table className="seo-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {schedule.dates.map((item) => (
                  <tr key={item.event} className={item.highlight ? 'row--highlight' : ''}>
                    <td>
                      {item.highlight ? <strong>{item.event}</strong> : item.event}
                    </td>
                    <td>{fmt(item.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="page-section">
            <h2>Voter Statistics — Kerala 2026</h2>
            <table className="seo-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Registered Voters</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Male</td><td>{schedule.voters.male.toLocaleString('en-IN')}</td></tr>
                <tr><td>Female</td><td>{schedule.voters.female.toLocaleString('en-IN')}</td></tr>
                <tr><td>Transgender</td><td>{schedule.voters.transgender.toLocaleString('en-IN')}</td></tr>
                <tr className="row--highlight">
                  <td><strong>Total</strong></td>
                  <td><strong>{schedule.voters.total.toLocaleString('en-IN')}</strong></td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="page-section">
            <h2>About the Election</h2>
            <dl className="fact-list">
              <dt>Election</dt>
              <dd>{schedule.overview.title}</dd>
              <dt>Phases</dt>
              <dd>Single phase (all 140 constituencies vote on one day)</dd>
              <dt>Total Seats</dt>
              <dd>{schedule.overview.constituencies}</dd>
              <dt>Majority Mark</dt>
              <dd>{schedule.overview.seatsForMajority} seats</dd>
              <dt>Current Assembly Tenure Ends</dt>
              <dd>{fmt(schedule.overview.assemblyTenureEnds)}</dd>
              <dt>Conducted By</dt>
              <dd>Election Commission of India (ECI)</dd>
            </dl>
          </section>

          <nav className="page-links" aria-label="Related pages">
            <h2>Explore More</h2>
            <ul>
              <li><Link to="/kerala-election-map">District Map</Link></li>
              <li><Link to="/kerala-140-constituencies">All 140 Constituencies</Link></li>
              <li><Link to="/kerala-election-candidates">Candidates 2026</Link></li>
              <li><Link to="/kerala-high-profile-seats">High-Profile Seats</Link></li>
              <li><Link to="/">Interactive Dashboard</Link></li>
            </ul>
          </nav>
        </main>
      </div>
    </>
  );
}
