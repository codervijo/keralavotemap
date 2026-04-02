import { Helmet } from 'react-helmet-async';

const SITE = 'https://keralavotemap.site';
const SITE_NAME = 'Kerala Vote Map';
const DEFAULT_TITLE = 'Kerala Vote Map · 2026 Legislative Assembly Elections';
const DEFAULT_DESC =
  "Explore Kerala's 2026 Legislative Assembly Elections — 140 constituencies, 14 districts, candidates, political fronts and the full election schedule in one interactive dashboard.";

export default function SEOHead({
  title,
  description,
  path = '',
  type = 'website',
}) {
  const fullTitle = title ? `${title} | Kerala Vote Map` : DEFAULT_TITLE;
  const desc = description ?? DEFAULT_DESC;
  const url = `${SITE}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph — WhatsApp, Facebook, LinkedIn */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
