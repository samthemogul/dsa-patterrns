import Link from 'next/link';

export const metadata = { title: 'Not found' };

export default function NotFound() {
  return (
    <div className="wrap">
      <span className="eyebrow">404</span>
      <h2 className="road__title" style={{ marginTop: '0.5rem' }}>
        That topic isn&rsquo;t here.
      </h2>
      <p className="road__lede">
        The link may be from an older version of this site, where topics lived at
        hash URLs. Pick up the path from the start instead.
      </p>
      <p style={{ marginTop: '1.5rem' }}>
        <Link className="btn btn--primary" href="/">
          Back to the roadmap
        </Link>
      </p>
    </div>
  );
}
