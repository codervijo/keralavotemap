import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { allConstituencies } from '../data/allData';
import { FRONTS, PARTY_META } from '../data/election2026';
import { toConstituencySlug } from '../data/slugs';

export default function CandidatesPage() {
  const stats = useMemo(() => {
    const frontCounts = {};
    const partyCounts = {};

    allConstituencies.forEach((con) => {
      con.candidates.forEach((cand) => {
        const meta = PARTY_META[cand.party] ?? { front: 'IND' };
        frontCounts[meta.front] = (frontCounts[meta.front] ?? 0) + 1;
        partyCounts[cand.party] = (partyCounts[cand.party] ?? 0) + 1;
      });
    });

    const total = Object.values(frontCounts).reduce((s, n) => s + n, 0);

    const byFront = Object.entries(FRONTS).map(([key, f]) => ({
      key,
      name: f.name,
      color: f.color,
      count: frontCounts[key] ?? 0,
    }));

    const byParty = Object.entries(partyCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([party, count]) => ({
        party,
        count,
        front: PARTY_META[party]?.front ?? 'IND',
        color: PARTY_META[party]?.color ?? '#999',
      }));

    return { total, byFront, byParty };
  }, []);

  return (
    <>
      <SEOHead
        title="Kerala Election Candidates 2026 — LDF, UDF, NDA"
        description="Overview of candidates contesting the 2026 Kerala Legislative Assembly Elections across all 140 constituencies. See candidate counts by political front and party."
        path="/kerala-election-candidates"
      />

      <div className="page-shell">
        <header className="page-hero">
          <div className="page-hero__inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">Candidates</span>
            </nav>
            <h1>Kerala Election Candidates 2026</h1>
            <p className="page-hero__sub">
              {stats.total} candidates across 140 constituencies · LDF · UDF · NDA
            </p>
          </div>
        </header>

        <main className="page-main">
          <p className="page-intro">
            The 2026 Kerala Legislative Assembly Election sees candidates from three major
            political alliances contesting all 140 seats. The{' '}
            <strong>Left Democratic Front (LDF)</strong>, led by the Communist Party of India
            (Marxist), is the incumbent ruling alliance. The{' '}
            <strong>United Democratic Front (UDF)</strong>, led by the Indian National
            Congress, is the principal opposition. The{' '}
            <strong>National Democratic Alliance (NDA)</strong>, led by the Bharatiya Janata
            Party, is the third major force. Each constituency has at least one candidate from
            each major front, along with independent and smaller party candidates. The data
            below reflects candidates based on publicly available information; some nominations
            may be pending final confirmation by the Election Commission.
          </p>

          <section className="page-section">
            <h2>Candidates by Political Front</h2>
            <div className="front-cards">
              {stats.byFront.map((f) => (
                <div key={f.key} className="front-card" style={{ borderTopColor: f.color }}>
                  <div className="front-card__abbr" style={{ color: f.color }}>{f.key}</div>
                  <div className="front-card__name">{f.name}</div>
                  <div className="front-card__count">{f.count}</div>
                  <div className="front-card__label">candidates</div>
                </div>
              ))}
            </div>
          </section>

          <section className="page-section">
            <h2>Candidates by Party</h2>
            <table className="seo-table">
              <thead>
                <tr>
                  <th>Party</th>
                  <th>Front</th>
                  <th>Candidates</th>
                </tr>
              </thead>
              <tbody>
                {stats.byParty.map(({ party, count, front, color }) => (
                  <tr key={party}>
                    <td>
                      <span
                        className="party-dot"
                        style={{ background: color }}
                        aria-hidden="true"
                      />
                      {party}
                    </td>
                    <td>{front}</td>
                    <td>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="page-section">
            <h2>Browse Candidates by Constituency</h2>
            <p>Select a constituency to see its candidates:</p>
            <ul className="con-index-list">
              {allConstituencies.map((c) => (
                <li key={c.id} className="con-index-item">
                  <Link to={`/${toConstituencySlug(c.name)}`} className="con-index-link">
                    <span className="con-no">#{c.id}</span>
                    <span className="con-name">{c.name}</span>
                    <span className="con-district">{c.district}</span>
                    <span className="cand-count-tag">{c.candidates.length} candidates</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <nav className="page-links" aria-label="Related pages">
            <h2>Explore More</h2>
            <ul>
              <li><Link to="/kerala-election-map">District Map</Link></li>
              <li><Link to="/kerala-140-constituencies">All Constituencies</Link></li>
              <li><Link to="/kerala-polling-date-2026">Polling Schedule</Link></li>
              <li><Link to="/kerala-high-profile-seats">Key Seats</Link></li>
            </ul>
          </nav>
        </main>
      </div>
    </>
  );
}
