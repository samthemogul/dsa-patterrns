import Providers from '../components/Providers';
import Shell from '../components/Shell';
import '../styles/tokens.css';
import '../styles/app.css';
import '../styles/illustration.css';
import '../styles/code-theme.css';

export const metadata = {
  title: {
    default: 'DSA Pattern Explorer',
    template: '%s · DSA Pattern Explorer',
  },
  description:
    'A staged path through data structures and algorithms, from first principles to competitive, with worked explanations and implementations in Python, C++ and TypeScript.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/*
          Loaded at runtime rather than through next/font, deliberately.
          next/font downloads the faces during `next build`, which makes every
          deploy depend on Google being reachable from the build machine — a
          network blip there fails the whole build. A stylesheet link degrades
          to the fallback stack instead. To self-host, drop .woff2 files into
          /public/fonts and swap this for next/font/local.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+Condensed:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
