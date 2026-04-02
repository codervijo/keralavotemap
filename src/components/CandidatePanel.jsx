import { FRONTS, PARTY_META } from '../data/election2026';

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
            {meta.front} – {FRONTS[meta.front]?.name ?? 'Others'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CandidatePanel({ constituency }) {
  if (!constituency) {
    return (
      <div className="candidate-panel candidate-panel--empty">
        <div className="empty-icon">🗳️</div>
        <p>Select a constituency to view candidates</p>
      </div>
    );
  }

  return (
    <div className="candidate-panel">
      <div className="panel-header">
        <div className="panel-badge">#{constituency.id}</div>
        <div>
          <h2 className="panel-title">
            {constituency.name}
            {constituency.reservation && (
              <span className="reservation-badge">{constituency.reservation}</span>
            )}
          </h2>
          <p className="panel-district">{constituency.district} District</p>
        </div>
      </div>

      <div className="panel-section-title">
        Candidates ({constituency.candidates.length})
      </div>

      <div className="cand-list">
        {constituency.candidates.map((cand, i) => (
          <CandidateRow key={i} cand={cand} />
        ))}
      </div>

      <div className="panel-legend">
        {Object.entries(FRONTS).map(([key, f]) => (
          <div key={key} className="legend-item">
            <span className="legend-dot" style={{ background: f.color }} />
            <span className="legend-label">{key} – {f.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
