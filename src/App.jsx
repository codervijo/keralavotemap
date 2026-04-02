import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SiteNav from './components/SiteNav';
import HomePage from './pages/HomePage';
import ElectionMapPage from './pages/ElectionMapPage';
import ConstituenciesPage from './pages/ConstituenciesPage';
import CandidatesPage from './pages/CandidatesPage';
import PollingDatePage from './pages/PollingDatePage';
import HighProfileSeatsPage from './pages/HighProfileSeatsPage';
import ConstituencyPage from './pages/ConstituencyPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function Layout() {
  return (
    <>
      <SiteNav />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,                          element: <HomePage /> },
      { path: 'kerala-election-map',          element: <ElectionMapPage /> },
      { path: 'kerala-140-constituencies',    element: <ConstituenciesPage /> },
      { path: 'kerala-election-candidates',   element: <CandidatesPage /> },
      { path: 'kerala-polling-date-2026',     element: <PollingDatePage /> },
      { path: 'kerala-high-profile-seats',    element: <HighProfileSeatsPage /> },
      { path: ':slug',                        element: <ConstituencyPage /> },
      { path: '*',                            element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
