import { useState, useMemo } from 'react';
import { constituencies, DISTRICTS } from './data/constituencies';
import { candidates2026 } from './data/election2026';
import DistrictChart from './components/DistrictChart';
import FrontChart from './components/FrontChart';
import ConstituencyList from './components/ConstituencyList';
import CandidatePanel from './components/CandidatePanel';
import ElectionSchedule from './components/ElectionSchedule';
import './App.css';

// Merge static constituency geo-data with 2026 election candidacy data
const allConstituencies = constituencies.map((c) => ({
  ...c,
  candidates: candidates2026[c.id] ?? [],
}));

export default function App() {
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
              <span className="stat-n">
                {allConstituencies.reduce((s, c) => s + c.candidates.length, 0)}
              </span>
              <span className="stat-l">Candidates</span>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <ElectionSchedule />

        {/* Charts row */}
        <section className="charts-row">
          <DistrictChart selected={selectedDistrict} onSelect={handleDistrictSelect} />
          <FrontChart constituencies={filtered} />
        </section>

        {/* Controls */}
        <section className="controls">
          <input
            className="search-input"
            type="text"
            placeholder="Search constituency, district or candidate…"
            value={search}
            onChange={handleSearch}
          />
          <div className="district-pills">
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
              {search && <> matching "<strong>{search}</strong>"</>}
              {' · '}
              <button className="link-btn" onClick={clearFilters}>
                Clear filters
              </button>
            </p>
          )}
        </section>

        {/* Main content: list + panel */}
        <section className="content-row">
          <ConstituencyList
            constituencies={filtered}
            selected={selectedConstituency}
            onSelect={setSelectedConstituency}
          />
          <CandidatePanel constituency={selectedConstituency} />
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Candidate data based on publicly available information. Some nominations may be
          pending confirmation. Not an official Election Commission resource.
        </p>
      </footer>
    </div>
  );
}
