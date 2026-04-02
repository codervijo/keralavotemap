import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Page Not Found"
        description="The page you are looking for does not exist."
        path="/404"
      />
      <div className="page-shell">
        <main className="page-main page-main--center">
          <h1>404 — Page Not Found</h1>
          <p>The page you&rsquo;re looking for doesn&rsquo;t exist.</p>
          <nav>
            <ul className="not-found-links">
              <li><Link to="/">Home — Interactive Dashboard</Link></li>
              <li><Link to="/kerala-140-constituencies">All 140 Constituencies</Link></li>
              <li><Link to="/kerala-election-candidates">Candidates 2026</Link></li>
              <li><Link to="/kerala-polling-date-2026">Polling Date &amp; Schedule</Link></li>
            </ul>
          </nav>
        </main>
      </div>
    </>
  );
}
