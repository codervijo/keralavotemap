import { PARTY_META } from '../data/election2026';

function FrontPip({ party }) {
  const meta = PARTY_META[party];
  if (!meta) return null;
  return (
    <span
      className="party-pip"
      style={{
        background: meta.gradient ?? meta.color,
        color: meta.gradientText ?? '#fff',
        border: meta.gradient ? '1px solid #ccc' : 'none',
      }}
      title={`${party} (${meta.front})`}
    >
      {party}
    </span>
  );
}

export default function ConstituencyList({ constituencies, selected, onSelect }) {
  return (
    <div className="constituency-list">
      {constituencies.length === 0 && (
        <p className="empty-msg">No constituencies match your search.</p>
      )}
      {constituencies.map((con) => (
        <div
          key={con.id}
          className={`con-card ${selected?.id === con.id ? 'con-card--active' : ''}`}
          onClick={() => onSelect(selected?.id === con.id ? null : con)}
        >
          <div className="con-card__header">
            <span className="con-no">#{con.id}</span>
            <span className="con-name">{con.name}</span>
            <span className="con-district">{con.district}</span>
          </div>
          <div className="con-card__pips">
            {con.candidates.map((cand, i) => (
              <FrontPip key={i} party={cand.party} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
