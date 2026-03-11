import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Hiren Patel | AVEVA PI Data Historian Specialist | Surat, India",
  description: "3+ years AVEVA PI Suite expertise. Certified PI Application Developer. Real-time industrial data monitoring for energy & manufacturing.",
  metadataBase: new URL("https://hirenportfolio.vercel.app"),
  openGraph: {
    title: "Hiren Patel | AVEVA PI Data Historian Specialist",
    description: "3+ years AVEVA PI Suite expertise. Certified PI Application Developer. Real-time industrial data monitoring for energy & manufacturing.",
    type: "website",
    locale: "en_US",
    siteName: "Hiren Patel Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hiren Patel",
    "jobTitle": "Application Manager",
    "url": "https://hirenportfolio.vercel.app",
    "email": "hiren.patel2728@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Surat",
      "addressCountry": "India"
    },
    "sameAs": [
      "https://linkedin.com/in/hiren-patel-pi"
    ],
    "knowsAbout": [
      "AVEVA PI System",
      "PI Data Archive",
      "PI Asset Framework",
      "PI Vision",
      "Manufacturing Execution Systems"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${syne.variable} ${plexMono.variable} font-sans bg-navy text-slate-100 antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
