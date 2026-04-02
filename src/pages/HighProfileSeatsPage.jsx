import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { allConstituencies } from '../data/allData';
import { FRONTS, PARTY_META } from '../data/election2026';
import { toConstituencySlug } from '../data/slugs';

export default function HighProfileSeatsPage() {
  // Constituencies where at least one candidate is marked incumbent
  const incumbentSeats = useMemo(
    () => allConstituencies.filter((c) => c.candidates.some((cand) => cand.incumbent)),
    []
  );

  return (
    <>
      <SEOHead
        title="Kerala High-Profile Assembly Seats 2026 — Key Constituencies"
        description="Key constituencies to watch in the 2026 Kerala Legislative Assembly Election, including seats with incumbent MLAs contesting for re-election."
        path="/kerala-high-profile-seats"
      />

      <div className="page-shell">
        <header className="page-hero">
          <div className="page-hero__inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">High-Profile Seats</span>
            </nav>
            <h1>Kerala High-Profile Assembly Seats 2026</h1>
            <p className="page-hero__sub">
              Constituencies with incumbent MLAs contesting re-election
            </p>
          </div>
        </header>

        <main className="page-main">
          <p className="page-intro">
            Every election cycle, certain constituencies draw outsized attention — due to
            sitting MLAs seeking re-election, tight historical margins, or the prominence of
            the candidates contesting. In the 2026 Kerala Legislative Assembly Election, seats
            where <strong>incumbent MLAs are standing again</strong> are natural focal points.
            Incumbent performance, local development, and alliance seat-sharing arrangements
            all influence outcomes in these constituencies. This page lists all Kerala assembly
            seats where a sitting MLA is fielded by their respective front for the 2026
            election, based on publicly available nomination data. All 140 seats are contested
            in a single phase on <strong>9 April 2026</strong>.
          </p>

          <section className="page-section">
            <h2>Constituencies with Incumbent Candidates ({incumbentSeats.length} seats)</h2>

            {incumbentSeats.length === 0 ? (
              <p className="empty-msg">Incumbent data not yet confirmed. Check back closer to the election.</p>
            ) : (
              <div className="hps-grid">
                {incumbentSeats.map((con) => {
                  const incumbents = con.candidates.filter((c) => c.incumbent);
                  return (
                    <article key={con.id} className="hps-card">
                      <div className="hps-card__head">
                        <span className="con-no">#{con.id}</span>
                        <Link
                          to={`/${toConstituencySlug(con.name)}`}
                          className="hps-card__title"
                        >
                          {con.name}
                        </Link>
                        <span className="con-district">{con.district}</span>
                        {con.reservation && (
                          <span className="reservation-badge">{con.reservation}</span>
                        )}
                      </div>
                      <ul className="hps-incumbents">
                        {incumbents.map((cand, i) => {
                          const meta = PARTY_META[cand.party] ?? { front: 'IND', color: '#999' };
                          const frontColor = FRONTS[meta.front]?.color ?? '#999';
                          return (
                            <li key={i} className="hps-incumbent">
                              <span
                                className="front-stripe"
                                style={{ background: frontColor }}
                                aria-hidden="true"
                              />
                              <span className="hps-cand-name">{cand.name}</span>
                              <span
                                className="party-tag"
                                style={{
                                  background: meta.gradient ?? meta.color,
                                  color: meta.gradientText ?? '#fff',
                                  border: meta.gradient ? '1px solid #ccc' : 'none',
                                  fontSize: '0.68rem',
                                  padding: '2px 7px',
                                }}
                              >
                                {cand.party}
                              </span>
                              <span className="incumbent-badge">Incumbent</span>
                            </li>
                          );
                        })}
                      </ul>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <nav className="page-links" aria-label="Related pages">
            <h2>Explore More</h2>
            <ul>
              <li><Link to="/kerala-140-constituencies">All 140 Constituencies</Link></li>
              <li><Link to="/kerala-election-candidates">Full Candidate List</Link></li>
              <li><Link to="/kerala-election-map">District Map</Link></li>
              <li><Link to="/kerala-polling-date-2026">Polling Date &amp; Schedule</Link></li>
            </ul>
          </nav>
        </main>
      </div>
    </>
  );
}
