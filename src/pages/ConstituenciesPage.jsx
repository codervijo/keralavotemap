import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { constituencies, DISTRICTS } from '../data/constituencies';
import { toConstituencySlug } from '../data/slugs';

export default function ConstituenciesPage() {
  const [filterDistrict, setFilterDistrict] = useState('');
  const [search, setSearch] = useState('');

  const visible = constituencies.filter((c) => {
    const matchDistrict = !filterDistrict || c.district === filterDistrict;
    const matchSearch = !search.trim() || c.name.toLowerCase().includes(search.toLowerCase());
    return matchDistrict && matchSearch;
  });

  return (
    <>
      <SEOHead
        title="Kerala's 140 Assembly Constituencies — Complete List 2026"
        description="Complete list of all 140 Kerala Legislative Assembly constituencies for the 2026 election. Browse by district, find your constituency, and see reservation status."
        path="/kerala-140-constituencies"
      />

      <div className="page-shell">
        <header className="page-hero">
          <div className="page-hero__inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">140 Constituencies</span>
            </nav>
            <h1>Kerala's 140 Assembly Constituencies</h1>
            <p className="page-hero__sub">Complete list for the 2026 Legislative Assembly Election</p>
          </div>
        </header>

        <main className="page-main">
          <p className="page-intro">
            The Kerala Legislative Assembly has <strong>140 elected members</strong>, one from
            each single-member constituency. The 140 constituencies are spread across 14
            districts and were delimited by the Delimitation Commission. Of the 140 seats,{' '}
            <strong>{constituencies.filter((c) => c.reservation === 'SC').length} are reserved
            for Scheduled Castes</strong> and{' '}
            <strong>{constituencies.filter((c) => c.reservation === 'ST').length} for Scheduled
            Tribes</strong>. All other seats are general (unreserved). Each constituency elects
            one MLA (Member of the Legislative Assembly) through the first-past-the-post
            system. Browse all constituencies below, filter by district, or search by name to
            find detailed candidate information for the 2026 election.
          </p>

          <section className="page-section">
            <div className="con-page-controls">
              <input
                className="search-input"
                type="search"
                placeholder="Search constituency name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search constituencies"
              />
              <select
                className="district-select"
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
                aria-label="Filter by district"
              >
                <option value="">All Districts</option>
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <p className="filter-summary">
              Showing <strong>{visible.length}</strong> of 140 constituencies
            </p>

            <ul className="con-index-list" aria-label="Constituency list">
              {visible.map((c) => (
                <li key={c.id} className="con-index-item">
                  <Link to={`/${toConstituencySlug(c.name)}`} className="con-index-link">
                    <span className="con-no">#{c.id}</span>
                    <span className="con-name">{c.name}</span>
                    <span className="con-district">{c.district}</span>
                    {c.reservation && (
                      <span className="reservation-badge">{c.reservation}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <nav className="page-links" aria-label="Related pages">
            <h2>Explore More</h2>
            <ul>
              <li><Link to="/kerala-election-map">District Map View</Link></li>
              <li><Link to="/kerala-election-candidates">Candidates 2026</Link></li>
              <li><Link to="/kerala-polling-date-2026">Polling Date &amp; Schedule</Link></li>
              <li><Link to="/kerala-high-profile-seats">High-Profile Seats</Link></li>
            </ul>
          </nav>
        </main>
      </div>
    </>
  );
}
