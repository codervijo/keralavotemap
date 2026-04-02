import { Link, NavLink } from 'react-router-dom';

export default function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="site-nav__inner">
        <Link to="/" className="site-nav__brand">
          Kerala Vote Map
        </Link>
        <ul className="site-nav__links" role="list">
          <li>
            <NavLink to="/kerala-election-map" className={({ isActive }) => isActive ? 'active' : ''}>
              Map
            </NavLink>
          </li>
          <li>
            <NavLink to="/kerala-140-constituencies" className={({ isActive }) => isActive ? 'active' : ''}>
              Constituencies
            </NavLink>
          </li>
          <li>
            <NavLink to="/kerala-election-candidates" className={({ isActive }) => isActive ? 'active' : ''}>
              Candidates
            </NavLink>
          </li>
          <li>
            <NavLink to="/kerala-polling-date-2026" className={({ isActive }) => isActive ? 'active' : ''}>
              Schedule
            </NavLink>
          </li>
          <li>
            <NavLink to="/kerala-high-profile-seats" className={({ isActive }) => isActive ? 'active' : ''}>
              Key Seats
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
