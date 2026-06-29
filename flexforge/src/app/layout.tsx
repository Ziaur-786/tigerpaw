import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SEO, BRAND, SOCIAL_MEDIA } from "@/constants";
import { Providers } from "@/components/providers";

// Font configurations
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// Metadata
export const metadata: Metadata = {
  title: {
    default: SEO.title,
    template: `%s | ${BRAND.name}`,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: SEO.author }],
  creator: SEO.author,
  publisher: SEO.author,

  // Open Graph
  openGraph: {
    type: SEO.openGraph.type,
    locale: SEO.openGraph.locale,
    url: SEO.openGraph.url,
    siteName: SEO.openGraph.siteName,
    title: SEO.title,
    description: SEO.description,
    images: SEO.openGraph.images,
  },

  // Twitter
  twitter: {
    card: SEO.twitter.card,
    site: SEO.twitter.site,
    creator: SEO.twitter.creator,
    title: SEO.title,
    description: SEO.description,
    images: SEO.openGraph.images,
  },

  // Robots
  robots: SEO.robots,

  // Alternates
  alternates: {
    canonical: SEO.openGraph.url,
  },

  // App Links
  appLinks: {
    web: {
      url: SEO.openGraph.url,
      should_fallback: true,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },

  // Manifest
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload fonts */}
        <link
          rel="preload"
          href="/fonts/SpaceGrotesk.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Meta tags for social sharing */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={BRAND.name} />
        <meta name="application-name" content={BRAND.name} />
        <meta name="msapplication-TileColor" content="#050505" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />

        {/* Theme color */}
        <meta name="theme-color" content="#050505" />

        {/* Twitter */}
        <meta name="twitter:site" content={SOCIAL_MEDIA.twitter} />
        <meta name="twitter:creator" content={SOCIAL_MEDIA.twitter} />

        {/* Facebook */}
        <meta property="og:site_name" content={BRAND.name} />
        <meta property="og:locale" content="en_US" />

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": BRAND.name,
            "url": SEO.openGraph.url,
            "description": SEO.description,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${SEO.openGraph.url}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": BRAND.name,
            "url": SEO.openGraph.url,
            "description": SEO.description,
            "logo": `${SEO.openGraph.url}/logo.png`,
            "sameAs": [
              SOCIAL_MEDIA.instagram,
              SOCIAL_MEDIA.facebook,
              SOCIAL_MEDIA.twitter,
              SOCIAL_MEDIA.youtube,
            ],
          }),
        }} />
      </head>

      <body className={`${spaceGrotesk.variable} ${inter.className} antialiased`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="skip-link font-semibold text-sm"
        >
          Skip to main content
        </a>

        {/* Loading screen will be added here */}
        <div id="loading-screen" aria-hidden="true">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-accent rounded-full animate-spin" style={{ borderRightColor: "transparent" }} />
              <div className="absolute inset-2 border-4 border-accent rounded-full animate-spin" style={{ animationDelay: "0.15s", borderLeftColor: "transparent" }} />
            </div>
            <span className="text-accent font-bold text-lg tracking-widest">FLEXFORGE</span>
          </div>
        </div>

        {/* Providers */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
