import { useState, useMemo } from 'react';
import { constituencies, DISTRICTS } from '../data/constituencies';
import { candidates2026 } from '../data/election2026';
import { toConstituencySlug } from '../data/slugs';
import DistrictChart from '../components/DistrictChart';
import FrontChart from '../components/FrontChart';
import ConstituencyList from '../components/ConstituencyList';
import CandidatePanel from '../components/CandidatePanel';
import ElectionSchedule from '../components/ElectionSchedule';
import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';

const allConstituencies = constituencies.map((c) => ({
  ...c,
  candidates: candidates2026[c.id] ?? [],
}));

const totalCandidates = allConstituencies.reduce((s, c) => s + c.candidates.length, 0);

export default function HomePage() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = selectedDistrict
      ? allConstituencies.filter((c) => c.district === selectedDistrict)
      : allConstituencies;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q) ||
          c.candidates.some((cand) => cand.name.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [selectedDistrict, search]);

  function handleDistrictSelect(district) {
    setSelectedDistrict(district);
    setSelectedConstituency(null);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    setSelectedConstituency(null);
  }

  function clearFilters() {
    setSelectedDistrict(null);
    setSearch('');
    setSelectedConstituency(null);
  }

  return (
    <>
      <SEOHead
        title={null}
        description="Kerala Vote Map — your complete guide to the 2026 Kerala Legislative Assembly Elections. Explore 140 constituencies, 14 districts, candidates from LDF, UDF and NDA, and the full polling schedule."
        path="/"
      />

      <div className="app">
        <header className="app-header">
          <div className="header-inner">
            <div>
              <h1 className="app-title">Kerala Vote Map</h1>
              <p className="app-subtitle">
                2026 Legislative Assembly Elections · 140 Constituencies · 14 Districts · Kerala, India
              </p>
            </div>
            <div className="header-stats">
              <div className="stat">
                <span className="stat-n">{constituencies.length}</span>
                <span className="stat-l">Total Seats</span>
              </div>
              <div className="stat">
                <span className="stat-n">{DISTRICTS.length}</span>
                <span className="stat-l">Districts</span>
              </div>
              <div className="stat">
                <span className="stat-n">{totalCandidates}</span>
                <span className="stat-l">Candidates</span>
              </div>
            </div>
          </div>
        </header>

        <main className="app-main">
          {/* ── Static SEO intro (crawlable, always visible) ── */}
          <article className="home-intro">
            <p className="home-intro__text">
              Kerala Vote Map is your interactive guide to the{' '}
              <strong>2026 Kerala Legislative Assembly Elections</strong>. The 16th Kerala
              Legislative Assembly General Election will be held across{' '}
              <strong>140 constituencies</strong> in <strong>14 districts</strong> in a
              single-phase poll on <strong>9 April 2026</strong>. Votes will be counted on{' '}
              <strong>4 May 2026</strong>. The three main electoral alliances — the Left
              Democratic Front (LDF), the United Democratic Front (UDF), and the National
              Democratic Alliance (NDA) — are contesting all seats. A majority of{' '}
              <strong>71 seats</strong> is required to form the government. Over 2.7 crore
              registered voters across Kerala will exercise their franchise.
            </p>
            <nav className="home-intro__links" aria-label="Explore sections">
              <Link to="/kerala-election-map">District Map</Link>
              <Link to="/kerala-140-constituencies">All Constituencies</Link>
              <Link to="/kerala-election-candidates">Candidates</Link>
              <Link to="/kerala-polling-date-2026">Polling Schedule</Link>
              <Link to="/kerala-high-profile-seats">Key Seats</Link>
            </nav>
          </article>

          <ElectionSchedule />

          <section className="charts-row" aria-label="Election charts">
            <DistrictChart selected={selectedDistrict} onSelect={handleDistrictSelect} />
            <FrontChart constituencies={filtered} />
          </section>

          <section className="controls" aria-label="Filter constituencies">
            <input
              className="search-input"
              type="text"
              placeholder="Search constituency, district or candidate…"
              value={search}
              onChange={handleSearch}
              aria-label="Search"
            />
            <div className="district-pills" role="group" aria-label="Filter by district">
              <button
                className={`pill ${!selectedDistrict ? 'pill--active' : ''}`}
                onClick={clearFilters}
              >
                All Districts
              </button>
              {DISTRICTS.map((d) => (
                <button
                  key={d}
                  className={`pill ${selectedDistrict === d ? 'pill--active' : ''}`}
                  onClick={() => handleDistrictSelect(selectedDistrict === d ? null : d)}
                >
                  {d}
                </button>
              ))}
            </div>
            {(selectedDistrict || search) && (
              <p className="filter-summary">
                Showing <strong>{filtered.length}</strong> of {constituencies.length} constituencies
                {selectedDistrict && <> in <strong>{selectedDistrict}</strong></>}
                {search && <> matching &ldquo;<strong>{search}</strong>&rdquo;</>}
                {' · '}
                <button className="link-btn" onClick={clearFilters}>Clear filters</button>
              </p>
            )}
          </section>

          <section className="content-row" aria-label="Constituencies and candidates">
            <ConstituencyList
              constituencies={filtered}
              selected={selectedConstituency}
              onSelect={setSelectedConstituency}
            />
            <CandidatePanel constituency={selectedConstituency} />
          </section>

          {/* Crawlable constituency links (hidden visually on home, valuable for crawlers) */}
          <section className="home-con-index" aria-label="Constituency index">
            <h2>All 140 Kerala Assembly Constituencies</h2>
            <ul className="home-con-list">
              {allConstituencies.map((c) => (
                <li key={c.id}>
                  <Link to={`/${toConstituencySlug(c.name)}`}>
                    {c.name} — {c.district} District
                    {c.reservation ? ` (${c.reservation})` : ''}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <footer className="app-footer">
          <p>
            Candidate data based on publicly available information. Some nominations may be
            pending confirmation. Not an official Election Commission resource.
          </p>
        </footer>
      </div>
    </>
  );
}
