import { useParams, Link, Navigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { constituencyBySlug } from '../data/slugs';
import { candidates2026, FRONTS, PARTY_META } from '../data/election2026';
import { toConstituencySlug } from '../data/slugs';
import { constituencies } from '../data/constituencies';
import NotFoundPage from './NotFoundPage';

function CandidateRow({ cand }) {
  const meta = PARTY_META[cand.party] ?? { color: '#999', front: 'IND' };
  const frontColor = FRONTS[meta.front]?.color ?? '#999';
  return (
    <div className="cand-row" style={{ borderLeftColor: frontColor }}>
      <div className="cand-row__left">
        <span className="cand-name">
          {cand.name}
          {cand.incumbent && <span className="incumbent-badge">Incumbent</span>}
        </span>
        <div className="cand-meta">
          <span
            className="party-tag"
            style={{
              background: meta.gradient ?? meta.color,
              color: meta.gradientText ?? '#fff',
              border: meta.gradient ? '1px solid #ccc' : 'none',
            }}
          >
            {cand.party}
          </span>
          <span className="front-tag" style={{ color: frontColor }}>
            {meta.front} — {FRONTS[meta.front]?.name ?? 'Others'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ConstituencyPage() {
  const { slug } = useParams();

  // Only handle slugs ending with -election-2026
  if (!slug.endsWith('-election-2026')) {
    return <NotFoundPage />;
  }

  const con = constituencyBySlug[slug];

  if (!con) {
    return <NotFoundPage />;
  }

  const conCandidates = candidates2026[con.id] ?? [];

  // Neighbour constituencies in the same district
  const neighbours = constituencies
    .filter((c) => c.district === con.district && c.id !== con.id)
    .slice(0, 6);

  const title = `${con.name} Constituency — Kerala Election 2026`;
  const description = `${con.name} is constituency #${con.id} in ${con.district} district. Explore candidates contesting the 2026 Kerala Legislative Assembly Election from ${con.name}.${con.reservation ? ` This is a reserved seat (${con.reservation}).` : ''}`;

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        path={`/${slug}`}
      />

      <div className="page-shell">
        <header className="page-hero">
          <div className="page-hero__inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link to="/kerala-140-constituencies">Constituencies</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{con.name}</span>
            </nav>
            <h1>
              {con.name} Constituency — 2026 Election
              {con.reservation && (
                <span className="reservation-badge" style={{ marginLeft: 12 }}>
                  {con.reservation} Reserved
                </span>
              )}
            </h1>
            <p className="page-hero__sub">
              Constituency #{con.id} · {con.district} District · Kerala Assembly Election 2026
            </p>
          </div>
        </header>

        <main className="page-main">
          <p className="page-intro">
            <strong>{con.name}</strong> is assembly constituency number{' '}
            <strong>{con.id}</strong> in <strong>{con.district} district</strong>, Kerala.
            {con.reservation
              ? ` This seat is reserved for ${con.reservation === 'SC' ? 'Scheduled Castes (SC)' : 'Scheduled Tribes (ST)'}.`
              : ' This is a general (unreserved) seat.'}
            {' '}The 2026 Kerala Legislative Assembly Election will be held on{' '}
            <strong>9 April 2026</strong> in a single phase across all 140 constituencies.
            Votes for {con.name} will be counted on <strong>4 May 2026</strong>. The major
            electoral alliances contesting this seat are the Left Democratic Front (LDF),
            United Democratic Front (UDF), and National Democratic Alliance (NDA). Candidate
            information below is based on publicly available data and may be updated as
            nominations are confirmed.
          </p>

          <section className="page-section">
            <h2>Constituency Details</h2>
            <dl className="fact-list">
              <dt>Constituency Number</dt>
              <dd>#{con.id}</dd>
              <dt>Constituency Name</dt>
              <dd>{con.name}</dd>
              <dt>District</dt>
              <dd>{con.district}</dd>
              <dt>Reservation</dt>
              <dd>{con.reservation ?? 'General (Unreserved)'}</dd>
              <dt>Election Date</dt>
              <dd>9 April 2026</dd>
              <dt>Counting Date</dt>
              <dd>4 May 2026</dd>
            </dl>
          </section>

          {conCandidates.length > 0 && (
            <section className="page-section">
              <h2>Candidates — {con.name} 2026 ({conCandidates.length})</h2>
              <div className="candidate-panel" style={{ position: 'static' }}>
                <div className="cand-list">
                  {conCandidates.map((cand, i) => (
                    <CandidateRow key={i} cand={cand} />
                  ))}
                </div>
                <div className="panel-legend">
                  {Object.entries(FRONTS).map(([key, f]) => (
                    <div key={key} className="legend-item">
                      <span className="legend-dot" style={{ background: f.color }} />
                      <span className="legend-label">{key} — {f.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="data-note">
                * Candidate data based on publicly available information. Some nominations may
                be pending confirmation by the Election Commission of India.
              </p>
            </section>
          )}

          {neighbours.length > 0 && (
            <section className="page-section">
              <h2>Other Constituencies in {con.district} District</h2>
              <ul className="con-index-list">
                {neighbours.map((n) => (
                  <li key={n.id} className="con-index-item">
                    <Link to={`/${toConstituencySlug(n.name)}`} className="con-index-link">
                      <span className="con-no">#{n.id}</span>
                      <span className="con-name">{n.name}</span>
                      {n.reservation && (
                        <span className="reservation-badge">{n.reservation}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

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
