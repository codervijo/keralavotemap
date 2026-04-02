import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { constituencies, DISTRICTS } from '../data/constituencies';
import { toConstituencySlug } from '../data/slugs';

const districtData = DISTRICTS.map((d) => ({
  district: d,
  seats: constituencies.filter((c) => c.district === d),
}));

export default function ElectionMapPage() {
  return (
    <>
      <SEOHead
        title="Kerala Election Map 2026 — 14 Districts, 140 Assembly Seats"
        description="District-by-district map of Kerala's 2026 Legislative Assembly Election. Explore how 140 seats are distributed across 14 districts — from Kasaragod in the north to Thiruvananthapuram in the south."
        path="/kerala-election-map"
      />

      <div className="page-shell">
        <header className="page-hero">
          <div className="page-hero__inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">Election Map</span>
            </nav>
            <h1>Kerala Election Map 2026</h1>
            <p className="page-hero__sub">District-wise seat distribution · Single-phase poll on 9 April 2026</p>
          </div>
        </header>

        <main className="page-main">
          <p className="page-intro">
            The 2026 Kerala Legislative Assembly Elections are conducted across{' '}
            <strong>140 single-member constituencies</strong> spanning 14 revenue districts.
            Kerala votes in a single phase, meaning all 140 seats go to the polls on the same
            day — <strong>9 April 2026</strong>. The state stretches from Kasaragod in the
            north to Thiruvananthapuram in the south, covering the Western Ghats, coastal
            plains, and backwater regions. Constituency boundaries were last delimited by the
            Delimitation Commission, with seat reservations for Scheduled Castes (SC) and
            Scheduled Tribes (ST) as per constitutional provisions. A party or alliance needs
            71 seats to command a majority in the 140-member House.
          </p>

          <section className="page-section">
            <h2>District-wise Seat Count</h2>
            <table className="seo-table">
              <thead>
                <tr>
                  <th>District</th>
                  <th>Assembly Seats</th>
                  <th>SC Reserved</th>
                  <th>ST Reserved</th>
                </tr>
              </thead>
              <tbody>
                {districtData.map(({ district, seats }) => (
                  <tr key={district}>
                    <td>
                      <strong>{district}</strong>
                    </td>
                    <td>{seats.length}</td>
                    <td>{seats.filter((s) => s.reservation === 'SC').length || '—'}</td>
                    <td>{seats.filter((s) => s.reservation === 'ST').length || '—'}</td>
                  </tr>
                ))}
                <tr className="seo-table__total">
                  <td><strong>Kerala Total</strong></td>
                  <td><strong>140</strong></td>
                  <td><strong>{constituencies.filter((c) => c.reservation === 'SC').length}</strong></td>
                  <td><strong>{constituencies.filter((c) => c.reservation === 'ST').length}</strong></td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="page-section">
            <h2>Constituencies by District</h2>
            <div className="district-grid">
              {districtData.map(({ district, seats }) => (
                <div key={district} className="district-block">
                  <h3 className="district-block__name">{district} <span>({seats.length} seats)</span></h3>
                  <ul className="district-block__list">
                    {seats.map((s) => (
                      <li key={s.id}>
                        <Link to={`/${toConstituencySlug(s.name)}`}>
                          {s.name}
                          {s.reservation ? <span className="res-tag">{s.reservation}</span> : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <nav className="page-links" aria-label="Related pages">
            <h2>Explore More</h2>
            <ul>
              <li><Link to="/kerala-140-constituencies">Full List of 140 Constituencies</Link></li>
              <li><Link to="/kerala-election-candidates">Candidate List 2026</Link></li>
              <li><Link to="/kerala-polling-date-2026">Polling Date &amp; Schedule</Link></li>
              <li><Link to="/kerala-high-profile-seats">High-Profile Seats</Link></li>
              <li><Link to="/">Interactive Dashboard</Link></li>
            </ul>
          </nav>
        </main>
      </div>
    </>
  );
}
